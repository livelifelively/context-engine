/**
 * Zod Schema Generator
 * 
 * This generator creates Zod validation schemas from our configuration-driven
 * data objects. It generates:
 * - Base section schemas (shared fields)
 * - Document-specific section schemas (with additional fields)
 * - Base family schemas (shared fields)
 * - Document-specific family schemas (composed from sections)
 * - Type exports and convenience functions
 */

import { z } from 'zod';
import { DOCUMENT_COMPOSITION } from '../composition.js';
import { DOCUMENT_TYPES } from '../constants.js';
import { SectionData, FamilyData, SectionMap, FamilyMap, DocumentType } from '../types.js';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// =============================================================================
// ZOD GENERATOR CLASS
// =============================================================================

export class ZodGenerator {
  private sections: SectionMap = new Map();
  private families: FamilyMap = new Map();
  private initialized: boolean = false;
  private outputPath: string;

  constructor(outputPath: string = 'dist/zod') {
    this.outputPath = outputPath;
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.loadSections();
      await this.loadFamilies();
      this.initialized = true;
    }
  }

  // =============================================================================
  // BASE SCHEMA GENERATION
  // =============================================================================

  /**
   * Generate base section schema (shared fields)
   */
  async generateBaseSectionSchema(sectionId: SectionId): Promise<string> {
    await this.ensureInitialized();
    
    const section = this.sections.get(sectionId);
    if (!section) {
      throw new Error(`Section ${sectionId} not found`);
    }

    const lines: string[] = [];
    
    // Schema header
    lines.push(`// Base ${section.name} schema (shared fields)`);
    lines.push(`export const Base${this.toPascalCase(section.name)}Schema = BaseSectionSchema.extend({`);
    
    // Generate shared fields (exclude family field)
    const sharedFields = Object.entries(section.fields).filter(([fieldName]) => fieldName !== 'family');
    
    if (sharedFields.length === 0) {
      lines.push(`  // Additional ${section.name.toLowerCase()}-specific fields can be added here`);
    } else {
      for (const [fieldName, field] of sharedFields) {
        const zodCode = this.generateZodFieldCode(field);
        lines.push(`  ${fieldName}: ${zodCode},`);
      }
    }
    
    lines.push(`});`);
    lines.push('');
    
    return lines.join('\n');
  }

  /**
   * Generate document-specific section schema
   */
  async generateDocumentSectionSchema(sectionId: SectionId, documentType: DocumentType): Promise<string> {
    await this.ensureInitialized();
    
    const section = this.sections.get(sectionId);
    if (!section) {
      throw new Error(`Section ${sectionId} not found`);
    }

    const lines: string[] = [];
    const schemaName = `Section_${sectionId.replace('.', '_')}_${this.toPascalCase(section.name)}_${documentType}`;
    const baseSchemaName = `Base${this.toPascalCase(section.name)}Schema`;
    
    // Section header
    lines.push(`// Section ${sectionId}: ${section.name} - ${documentType} (extends base + additional fields)`);
    
    // Check if this section has document-specific fields
    const hasDocumentSpecificFields = this.hasDocumentSpecificFields(sectionId, documentType);
    
    if (hasDocumentSpecificFields) {
      lines.push(`export const ${schemaName} = ${baseSchemaName}.extend({`);
      lines.push(`  // ${documentType.toLowerCase()}-specific fields would go here`);
      lines.push(`}).meta(get${documentType}SectionMetadata('${sectionId}'));`);
    } else {
      lines.push(`// get base ${section.name.toLowerCase()} schema with field metadata`);
      lines.push(`// apply ${documentType.toLowerCase()} section metadata`);
      lines.push(`export const ${schemaName} = ${baseSchemaName}.meta(get${documentType}SectionMetadata('${sectionId}'));`);
    }
    
    lines.push('');
    
    return lines.join('\n');
  }

  /**
   * Generate base family schema
   */
  async generateBaseFamilySchema(familyId: FamilyId): Promise<string> {
    await this.ensureInitialized();
    
    const family = this.families.get(familyId);
    if (!family) {
      throw new Error(`Family ${familyId} not found`);
    }

    const lines: string[] = [];
    
    // Schema header
    lines.push(`// Base ${family.name} family schema (shared fields)`);
    lines.push(`export const Base${this.toPascalCase(family.name)}Schema = BaseFamilySchema.extend({`);
    
    // Generate shared fields (exclude document field)
    const sharedFields = Object.entries(family.fields).filter(([fieldName]) => fieldName !== 'document');
    
    if (sharedFields.length === 0) {
      lines.push(`  // Additional ${family.name.toLowerCase()}-specific fields can be added here`);
    } else {
      for (const [fieldName, field] of sharedFields) {
        const zodCode = this.generateZodFieldCode(field);
        lines.push(`  ${fieldName}: ${zodCode},`);
      }
    }
    
    lines.push(`});`);
    lines.push('');
    
    return lines.join('\n');
  }

  /**
   * Generate document-specific family schema
   */
  async generateDocumentFamilySchema(familyId: FamilyId, documentType: DocumentType): Promise<string> {
    await this.ensureInitialized();
    
    const family = this.families.get(familyId);
    if (!family) {
      throw new Error(`Family ${familyId} not found`);
    }

    const lines: string[] = [];
    const schemaName = `Family_${familyId.replace('-', '_')}_${this.toPascalCase(family.name)}_${documentType}`;
    const baseSchemaName = `Base${this.toPascalCase(family.name)}Schema`;
    
    // Family header
    lines.push(`// Family ${familyId}: ${family.name} - ${documentType} (extends base + sections)`);
    lines.push(`// get base family schema with field metadata`);
    lines.push(`// apply ${documentType.toLowerCase()} family metadata`);
    lines.push(`export const ${schemaName} = ${baseSchemaName}.extend({`);
    
    // Generate section relationships
    const composition = DOCUMENT_COMPOSITION[documentType];
    for (const familyComposition of composition) {
      if (familyComposition.familyId === familyId) {
        for (const sectionId of familyComposition.sections) {
          const section = this.sections.get(sectionId);
          if (section) {
            const sectionSchemaName = `Section_${sectionId.replace('.', '_')}_${this.toPascalCase(section.name)}_${documentType}`;
            const fieldName = this.getFamilyFieldName(sectionId);
            lines.push(`  ${fieldName}: ${sectionSchemaName},`);
          }
        }
      }
    }
    
    lines.push(`}).meta(get${documentType}FamilyMetadata());`);
    lines.push('');
    
    return lines.join('\n');
  }

  // =============================================================================
  // TYPE EXPORTS GENERATION
  // =============================================================================

  /**
   * Generate type exports for a document type
   */
  async generateTypeExports(documentType: DocumentType): Promise<string> {
    await this.ensureInitialized();
    
    const lines: string[] = [];
    
    // Header
    lines.push(`// =============================================================================`);
    lines.push(`// TYPE EXPORTS`);
    lines.push(`// =============================================================================`);
    lines.push('');
    lines.push(`// Export types for use in other modules`);
    
    // Generate section type exports
    const composition = DOCUMENT_COMPOSITION[documentType];
    for (const familyComposition of composition) {
      for (const sectionId of familyComposition.sections) {
        const section = this.sections.get(sectionId);
        if (section) {
          const schemaName = `Section_${sectionId.replace('.', '_')}_${this.toPascalCase(section.name)}_${documentType}`;
          const typeName = `${schemaName}_Type`;
          lines.push(`export type ${typeName} = z.infer<typeof ${schemaName}>;`);
        }
      }
    }
    
    // Generate family type exports
    for (const familyComposition of composition) {
      const family = this.families.get(familyComposition.familyId);
      if (family) {
        const schemaName = `Family_${familyComposition.familyId.replace('-', '_')}_${this.toPascalCase(family.name)}_${documentType}`;
        const typeName = `${schemaName}_Type`;
        lines.push('');
        lines.push(`export type ${typeName} = z.infer<typeof ${schemaName}>;`);
      }
    }
    
    lines.push('');
    
    return lines.join('\n');
  }

  // =============================================================================
  // CONVENIENCE FUNCTIONS GENERATION
  // =============================================================================

  /**
   * Generate convenience functions for a document type
   */
  async generateConvenienceFunctions(documentType: DocumentType): Promise<string> {
    await this.ensureInitialized();
    
    const lines: string[] = [];
    
    // Header
    lines.push(`// =============================================================================`);
    lines.push(`// CONVENIENCE FUNCTIONS`);
    lines.push(`// =============================================================================`);
    lines.push('');
    
    // Generate family convenience function
    const composition = DOCUMENT_COMPOSITION[documentType];
    for (const familyComposition of composition) {
      const family = this.families.get(familyComposition.familyId);
      if (family) {
        const schemaName = `Family_${familyComposition.familyId.replace('-', '_')}_${this.toPascalCase(family.name)}_${documentType}`;
        lines.push(`/**`);
        lines.push(` * Gets the ${family.name} family schema for ${documentType} documents`);
        lines.push(` * @returns The ${documentType} family schema`);
        lines.push(` */`);
        lines.push(`export const get${this.toPascalCase(family.name)}${documentType}Schema = () => ${schemaName};`);
        lines.push('');
        
        // Generate section convenience functions
        for (const sectionId of familyComposition.sections) {
          const section = this.sections.get(sectionId);
          if (section) {
            const sectionSchemaName = `Section_${sectionId.replace('.', '_')}_${this.toPascalCase(section.name)}_${documentType}`;
            lines.push(`/**`);
            lines.push(` * Gets the ${section.name} section schema for ${documentType} documents`);
            lines.push(` * @returns The ${section.name} section schema for ${documentType}s`);
            lines.push(` */`);
            lines.push(`export const get${this.toPascalCase(family.name)}${documentType}${this.toPascalCase(section.name)}Schema = () => ${sectionSchemaName};`);
            lines.push('');
          }
        }
      }
    }
    
    return lines.join('\n');
  }

  // =============================================================================
  // COMPLETE SCHEMA GENERATION
  // =============================================================================

  /**
   * Generate complete Zod schema file for a document type
   */
  async generateDocumentSchemaFile(documentType: DocumentType): Promise<string> {
    await this.ensureInitialized();
    
    const lines: string[] = [];
    
    // Imports
    lines.push(`import { z } from 'zod';`);
    lines.push(`import { BaseSectionSchema, BaseFamilySchema } from '../../../shared.schema.js';`);
    lines.push(`import {`);
    lines.push(`  get${documentType}SectionMetadata,`);
    lines.push(`  get${documentType}FamilyMetadata,`);
    lines.push(`} from './${documentType.toLowerCase()}.meta.js';`);
    lines.push('');
    
    // Generate base schemas
    lines.push(`// =============================================================================`);
    lines.push(`// ${documentType.toUpperCase()}-SPECIFIC SECTION SCHEMAS`);
    lines.push(`// =============================================================================`);
    lines.push('');
    
    const composition = DOCUMENT_COMPOSITION[documentType];
    for (const familyComposition of composition) {
      for (const section of familyComposition.sections) {
        lines.push(await this.generateDocumentSectionSchema(section.id, documentType));
      }
    }
    
    // Generate family schema
    lines.push(`// =============================================================================`);
    lines.push(`// ${documentType.toUpperCase()} FAMILY SCHEMA`);
    lines.push(`// =============================================================================`);
    lines.push('');
    
    for (const familyComposition of composition) {
      lines.push(await this.generateDocumentFamilySchema(familyComposition.family.id, documentType));
    }
    
    // Generate type exports
    lines.push(await this.generateTypeExports(documentType));
    
    // Generate convenience functions
    lines.push(await this.generateConvenienceFunctions(documentType));
    
    return lines.join('\n');
  }

  /**
   * Generate shared base schemas file
   */
  async generateSharedSchemasFile(): Promise<string> {
    await this.ensureInitialized();
    
    const lines: string[] = [];
    
    // Imports
    lines.push(`import { z } from 'zod';`);
    lines.push(`import { BaseSectionSchema } from '../../shared.schema.js';`);
    lines.push(`import { getSharedFieldMetadata } from './shared.meta.js';`);
    lines.push('');
    
    // Generate base section schemas
    lines.push(`// =============================================================================`);
    lines.push(`// BASE SCHEMAS (Interface-like)`);
    lines.push(`// =============================================================================`);
    lines.push('');
    
    for (const [sectionId] of this.sections) {
      lines.push(await this.generateBaseSectionSchema(sectionId));
    }
    
    return lines.join('\n');
  }

  // =============================================================================
  // HELPER METHODS
  // =============================================================================

  private generateZodFieldCode(field: any): string {
    // This would need to be more sophisticated to handle different Zod types
    // For now, we'll return a placeholder
    return `z.any() // TODO: Generate proper Zod schema from field definition`;
  }

  private hasDocumentSpecificFields(sectionId: SectionId, documentType: DocumentType): boolean {
    // This would check if the section has document-specific fields
    // For now, we'll return false as our current sections don't have document-specific fields
    return false;
  }

  private getFamilyFieldName(sectionId: string): string {
    const section = this.sections.get(sectionId);
    if (!section) return 'unknown';
    
    // Convert section name to camelCase for field name
    return section.name.toLowerCase().replace(/\s+/g, '').replace(/drivers$/, 'Drivers');
  }

  private toPascalCase(str: string): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toUpperCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  private async loadSections(): Promise<void> {
    // Import section data
    const { section_1_1_status } = await import('../families/1-meta-governance/sections/1.1-status.js');
    const { section_1_2_priority_drivers } = await import('../families/1-meta-governance/sections/1.2-priority-drivers.js');
    const { section_1_3_history } = await import('../families/1-meta-governance/sections/1.3-history.js');
    
    this.sections.set('1.1', section_1_1_status);
    this.sections.set('1.2', section_1_2_priority_drivers);
    this.sections.set('1.3', section_1_3_history);
  }

  private async loadFamilies(): Promise<void> {
    // Import family data
    const { family_1_meta_governance } = await import('../families/1-meta-governance/family-1-meta-governance.js');
    
    this.families.set(family_1_meta_governance.id, family_1_meta_governance);
  }

  /**
   * Write generated Zod schema to file
   */
  async writeToFile(content: string, filename: string): Promise<void> {
    const fullOutputPath = join(process.cwd(), this.outputPath);
    mkdirSync(fullOutputPath, { recursive: true });
    
    const filePath = join(fullOutputPath, filename);
    writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Generated Zod file: ${filePath}`);
  }

  /**
   * Generate and write all Zod schemas
   */
  async generateAllSchemas(): Promise<void> {
    console.log('🚀 Generating all Zod schemas...\n');
    
    // Generate shared schemas
    console.log('📋 Generating shared schemas...');
    const sharedSchemas = await this.generateSharedSchemasFile();
    await this.writeToFile(sharedSchemas, 'shared.schema.ts');
    
    // Generate document-specific schemas
    for (const documentType of DOCUMENT_TYPES) {
      console.log(`📋 Generating ${documentType} document schema...`);
      const documentSchema = await this.generateDocumentSchemaFile(documentType);
      await this.writeToFile(documentSchema, `${documentType.toLowerCase()}.schema.ts`);
    }
    
    console.log('\n🎉 All Zod schemas generated successfully!');
  }
}

// =============================================================================
// EXPORT
// =============================================================================

export const zodGenerator = new ZodGenerator();
