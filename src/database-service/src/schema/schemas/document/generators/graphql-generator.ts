/**
 * GraphQL Schema Generator
 *
 * This generator creates GraphQL schema definitions from our configuration-driven
 * data objects. It generates:
 * - Section interfaces (base interfaces)
 * - Section implementations (document-specific types)
 * - Family interfaces (base interfaces)
 * - Family implementations (document-specific types)
 * - Document types (composed from families)
 */

import { DOCUMENT_COMPOSITION } from '../composition.js';
import { DOCUMENT_TYPES } from '../constants.js';
import { DocumentType, SectionId, FamilyId } from '../types.js';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { camelCase, kebabCase } from 'lodash';

// =============================================================================
// GRAPHQL GENERATOR CLASS
// =============================================================================

export class GraphQLGenerator {
  private outputPath: string;

  constructor(outputPath: string = 'src/database-service/src/schema/schemas/document/dist/graphql') {
    this.outputPath = outputPath;
  }

  // =============================================================================
  // HELPER METHODS
  // =============================================================================

  /**
   * Get a family from DOCUMENT_COMPOSITION by family ID
   */
  private getFamilyFromComposition(familyId: FamilyId) {
    for (const documentType of DOCUMENT_TYPES) {
      const composition = DOCUMENT_COMPOSITION[documentType];
      for (const familyComposition of composition) {
        if (familyComposition.family.id === familyId) {
          return familyComposition.family;
        }
      }
    }
    return null;
  }

  /**
   * Get a section from DOCUMENT_COMPOSITION by section ID
   */
  private getSectionFromComposition(sectionId: SectionId) {
    for (const documentType of DOCUMENT_TYPES) {
      const composition = DOCUMENT_COMPOSITION[documentType];
      for (const familyComposition of composition) {
        for (const section of familyComposition.sections) {
          if (section.id === sectionId) {
            return section;
          }
        }
      }
    }
    return null;
  }

  /**
   * Get unique family IDs from DOCUMENT_COMPOSITION
   */
  private getUniqueFamilyIds(): FamilyId[] {
    const familyIds = new Set<FamilyId>();
    this.iterateComposition((familyComposition) => {
      familyIds.add(familyComposition.family.id);
    });
    return Array.from(familyIds);
  }

  /**
   * Get unique section IDs from DOCUMENT_COMPOSITION
   */
  private getUniqueSectionIds(): SectionId[] {
    const sectionIds = new Set<SectionId>();
    this.iterateComposition((familyComposition) => {
      for (const section of familyComposition.sections) {
        sectionIds.add(section.id);
      }
    });
    return Array.from(sectionIds);
  }

  /**
   * Get all sections for a specific family ID
   */
  private getSectionsForFamily(familyId: FamilyId): SectionId[] {
    const sectionIds = new Set<SectionId>();
    this.iterateComposition((familyComposition) => {
      if (familyComposition.family.id === familyId) {
        for (const section of familyComposition.sections) {
          sectionIds.add(section.id);
        }
      }
    });
    return Array.from(sectionIds);
  }

  /**
   * Generic iterator for DOCUMENT_COMPOSITION to reduce code duplication
   */
  private iterateComposition(callback: (familyComposition: any) => void): void {
    for (const documentType of DOCUMENT_TYPES) {
      const composition = DOCUMENT_COMPOSITION[documentType];
      for (const familyComposition of composition) {
        callback(familyComposition);
      }
    }
  }

  // =============================================================================
  // SECTION INTERFACE GENERATION
  // =============================================================================

  /**
   * Generate base section interface
   */
  async generateSectionInterface(sectionId: SectionId): Promise<string> {
    const section = this.getSectionFromComposition(sectionId);
    if (!section) {
      throw new Error(`Section ${sectionId} not found`);
    }

    const lines: string[] = [];

    // Interface header
    lines.push(`# Base interface for ${section.name} sections`);
    lines.push(`interface ${section.interfaceName} {`);

    // Generate fields
    for (const [fieldName, field] of Object.entries(section.fields)) {
      if (fieldName === 'family') continue; // Skip family field in base interface

      const type = field.graphql.required ? field.graphql.type : field.graphql.type.replace('!', '');
      const comment = this.generateFieldComment(field);

      lines.push(`  ${comment}`);
      lines.push(`  ${fieldName}: ${type}`);
    }

    lines.push('}');
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Generate document-specific section implementation
   */
  async generateSectionImplementation(sectionId: SectionId, documentType: DocumentType): Promise<string> {
    const section = this.getSectionFromComposition(sectionId);
    if (!section) {
      throw new Error(`Section ${sectionId} not found`);
    }

    const lines: string[] = [];
    const typeName = `${section.interfaceName}${documentType}_`;

    // Section header
    lines.push(`# =============================================================================`);
    lines.push(`# SECTION ${sectionId}: ${section.name.toUpperCase()} (${documentType} Implementation)`);
    lines.push(`# =============================================================================`);
    lines.push('');

    // Type definition
    lines.push(`type ${typeName} implements ${section.interfaceName} {`);

    // Generate document-specific fields (if any)
    // For now, we'll add the family relationship
    const familyTypeName = `_Family_1_MetaGovernance_${documentType}_`;
    lines.push(`  # ${documentType.toLowerCase()} specific meta governance family`);
    lines.push(`  family: ${familyTypeName}! @hasInverse(field: ${this.getFamilyFieldName(sectionId)})`);

    lines.push('}');
    lines.push('');

    return lines.join('\n');
  }

  // =============================================================================
  // FAMILY INTERFACE GENERATION
  // =============================================================================

  /**
   * Generate base family interface
   */
  async generateFamilyInterface(familyId: FamilyId): Promise<string> {
    const family = this.getFamilyFromComposition(familyId);
    if (!family) {
      throw new Error(`Family ${familyId} not found`);
    }

    const lines: string[] = [];

    // Interface header
    lines.push(`# Base interface for ${family.name} family`);
    lines.push(`interface ${family.interfaceName} {`);

    // Generate fields
    for (const [fieldName, field] of Object.entries(family.fields)) {
      if (fieldName === 'document') continue; // Skip document field in base interface

      const type = field.graphql.required ? field.graphql.type : field.graphql.type.replace('!', '');
      const comment = this.generateFieldComment(field);

      lines.push(`  ${comment}`);
      lines.push(`  ${fieldName}: ${type}`);
    }

    lines.push('}');
    lines.push('');

    return lines.join('\n');
  }

  /**
   * Generate document-specific family implementation
   */
  async generateFamilyImplementation(familyId: FamilyId, documentType: DocumentType): Promise<string> {
    const family = this.getFamilyFromComposition(familyId);
    if (!family) {
      throw new Error(`Family ${familyId} not found`);
    }

    const lines: string[] = [];
    const typeName = `${family.interfaceName}${documentType}_`;

    // Family header
    lines.push(`# =============================================================================`);
    lines.push(`# FAMILY: ${family.name} - ${documentType} (Composed)`);
    lines.push(`# =============================================================================`);
    lines.push('');

    // Type definition
    lines.push(`type ${typeName} implements ${family.interfaceName} {`);

    // Generate section relationships
    const composition = DOCUMENT_COMPOSITION[documentType];
    for (const familyComposition of composition) {
      if (familyComposition.family.id === familyId) {
        for (const section of familyComposition.sections) {
          const sectionTypeName = `${section.interfaceName}${documentType}_`;
          const fieldName = this.getFamilyFieldName(section.id);
          lines.push(`  # ${documentType.toLowerCase()} specific meta governance sections`);
          lines.push(`  ${fieldName}: ${sectionTypeName}! @hasInverse(field: family)`);
        }
      }
    }

    // Add document relationship
    lines.push('');
    lines.push(`  document: _Document_${documentType}_! @hasInverse(field: metaGovernance)`);

    lines.push('}');
    lines.push('');

    return lines.join('\n');
  }

  // =============================================================================
  // COMPLETE SCHEMA GENERATION
  // =============================================================================

  /**
   * Generate complete GraphQL schema for a document type
   */
  async generateDocumentSchema(documentType: DocumentType): Promise<string> {
    const lines: string[] = [];

    // Header
    const composition = DOCUMENT_COMPOSITION[documentType];
    const familyName = composition.length > 0 ? composition[0].family.name : 'Unknown';
    lines.push(`# ${familyName} - ${documentType} Document Type`);
    lines.push('');

    // Generate section implementations
    for (const familyComposition of composition) {
      for (const section of familyComposition.sections) {
        lines.push(await this.generateSectionImplementation(section.id, documentType));
      }
    }

    // Generate family implementation
    for (const familyComposition of composition) {
      lines.push(await this.generateFamilyImplementation(familyComposition.family.id, documentType));
    }

    return lines.join('\n');
  }

  /**
   * Generate shared interfaces (base interfaces)
   */
  async generateSharedInterfaces(): Promise<string> {
    const lines: string[] = [];

    // Header
    lines.push(`# Shared Types`);
    lines.push('');
    lines.push(`# =============================================================================`);
    lines.push(`# SECTIONS INTERFACES`);
    lines.push(`# =============================================================================`);
    lines.push('');
    lines.push(`# all the generic fields, that are applicable to all sections of the meta governance family`);
    lines.push('');

    // Generate section interfaces
    const sectionIds = this.getUniqueSectionIds();
    for (const sectionId of sectionIds) {
      lines.push(await this.generateSectionInterface(sectionId));
    }

    // Generate family interfaces
    lines.push(`# =============================================================================`);
    lines.push(`# FAMILY INTERFACES`);
    lines.push(`# =============================================================================`);
    lines.push('');

    const familyIds = this.getUniqueFamilyIds();
    for (const familyId of familyIds) {
      lines.push(await this.generateFamilyInterface(familyId));
    }

    return lines.join('\n');
  }

  /**
   * Write generated GraphQL schema to file
   */
  async writeToFile(content: string, filename: string): Promise<void> {
    const fullOutputPath = join(process.cwd(), this.outputPath);
    mkdirSync(fullOutputPath, { recursive: true });

    const filePath = join(fullOutputPath, filename);
    writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Generated GraphQL file: ${filePath}`);
  }

  /**
   * Generate a comprehensive GraphQL schema for a family
   */
  async generateFamilySchema(familyId: FamilyId): Promise<string> {
    const family = this.getFamilyFromComposition(familyId);
    if (!family) {
      throw new Error(`Family ${familyId} not found`);
    }

    const lines: string[] = [];

    // Header
    lines.push(`# ${family.name} - Complete GraphQL Schema`);
    lines.push(`# Generated from configuration-driven data objects`);
    lines.push(`# Generated on: ${new Date().toISOString()}`);
    lines.push('');

    // =============================================================================
    // SECTION INTERFACES (Base interfaces)
    // =============================================================================
    lines.push('# =============================================================================');
    lines.push('# SECTION INTERFACES (Base interfaces)');
    lines.push('# =============================================================================');
    lines.push('');

    // Get all sections used by this family
    const sectionIds = this.getSectionsForFamily(familyId);

    // Generate section interfaces
    for (const sectionId of sectionIds) {
      lines.push(await this.generateSectionInterface(sectionId));
    }

    // =============================================================================
    // FAMILY INTERFACE (Base interface)
    // =============================================================================
    lines.push('');
    lines.push('# =============================================================================');
    lines.push('# FAMILY INTERFACE (Base interface)');
    lines.push('# =============================================================================');
    lines.push('');

    lines.push(await this.generateFamilyInterface(familyId));

    // =============================================================================
    // SECTION TYPES (Implementations)
    // =============================================================================
    lines.push('');
    lines.push('# =============================================================================');
    lines.push('# SECTION TYPES (Implementations)');
    lines.push('# =============================================================================');
    lines.push('');

    // Generate section type implementations for each document type
    for (const documentType of DOCUMENT_TYPES) {
      const composition = DOCUMENT_COMPOSITION[documentType];
      for (const familyComposition of composition) {
        if (familyComposition.family.id === familyId) {
          for (const section of familyComposition.sections) {
            lines.push(await this.generateSectionImplementation(section.id, documentType));
          }
        }
      }
    }

    // =============================================================================
    // FAMILY TYPES (Implementations)
    // =============================================================================
    lines.push('');
    lines.push('# =============================================================================');
    lines.push('# FAMILY TYPES (Implementations)');
    lines.push('# =============================================================================');
    lines.push('');

    // Generate family type implementations for each document type
    for (const documentType of DOCUMENT_TYPES) {
      const composition = DOCUMENT_COMPOSITION[documentType];
      for (const familyComposition of composition) {
        if (familyComposition.family.id === familyId) {
          lines.push(await this.generateFamilyImplementation(familyId, documentType));
        }
      }
    }

    return lines.join('\n');
  }

  /**
   * Generate and write all GraphQL schemas
   */
  async generateAllSchemas(): Promise<void> {
    console.log('🚀 Generating all GraphQL schemas...\n');

    // Generate one comprehensive file per family
    const familyIds = this.getUniqueFamilyIds();

    for (const familyId of familyIds) {
      console.log(`📋 Generating ${familyId} family schema...`);
      const familySchema = await this.generateFamilySchema(familyId);
      const familyName = this.getFamilyName(familyId);
      await this.writeToFile(familySchema, `${familyName}.graphql`);
    }

    console.log('\n🎉 All GraphQL schemas generated successfully!');
  }

  // =============================================================================
  // HELPER METHODS
  // =============================================================================

  private generateFieldComment(field: any): string {
    return `# ${field.metadata.description}`;
  }

  private getFamilyFieldName(sectionId: string): string {
    const section = this.getSectionFromComposition(sectionId);
    if (!section) return 'unknown';

    // Convert section name to camelCase for field name using lodash
    return camelCase(section.name);
  }

  private getFamilyName(familyId: string): string {
    const family = this.getFamilyFromComposition(familyId);
    if (!family) return familyId;

    // Family ID already contains the number, so just use it directly
    return familyId;
  }
}

// =============================================================================
// EXPORT
// =============================================================================

export const graphqlGenerator = new GraphQLGenerator();
