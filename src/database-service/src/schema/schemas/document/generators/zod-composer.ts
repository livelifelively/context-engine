/**
 * Zod Schema Composer
 * 
 * Simple functions to compose Zod schemas from configuration-driven data objects.
 * Iterates on whatever is in the configuration and attaches metadata to everything.
 */

import { DOCUMENT_COMPOSITION } from '../composition.js';
import { DOCUMENT_TYPES } from '../constants.js';
import { DocumentType, SectionId, FamilyId } from '../types.js';
import { z } from 'zod';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Import section data by ID
 */
async function importSection(sectionId: SectionId): Promise<any> {
  // Extract family ID from section ID (e.g., "1.1" -> "1-meta-governance")
  const familyId = getFamilyIdFromSectionId(sectionId);
  
  // Convert section ID to filename (e.g., "1.1" -> "1.1-status")
  const sectionFileName = getSectionFileName(sectionId);
  
  try {
    const module = await import(`../families/${familyId}/sections/${sectionFileName}.js`);
    const exportName = `section_${sectionId.replace(/\./g, '_')}_${sectionFileName.split('-').slice(1).join('_')}`;
    return module[exportName];
  } catch (error) {
    throw new Error(`Section ${sectionId} not found: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Import family data by ID
 */
async function importFamily(familyId: FamilyId): Promise<any> {
  try {
    const module = await import(`../families/${familyId}/family-${familyId}.js`);
    const exportName = `family_${familyId.replace(/-/g, '_')}`;
    return module[exportName];
  } catch (error) {
    throw new Error(`Family ${familyId} not found: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Import document data by type
 */
async function importDocument(documentType: DocumentType): Promise<any> {
  const documentFileName = documentType.toLowerCase();
  
  try {
    const module = await import(`../documents/${documentFileName}.js`);
    const exportName = `document_${documentFileName}`;
    return module[exportName];
  } catch (error) {
    throw new Error(`Document ${documentType} not found: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Attach metadata to a Zod schema, iterating over all metadata properties
 */
function attachMetadata(schema: z.ZodTypeAny, metadata: any): z.ZodTypeAny {
  if (!metadata || typeof metadata !== 'object') {
    return schema;
  }
  
  // Iterate over all metadata properties and attach them
  const metaObject: Record<string, any> = {};
  for (const [key, value] of Object.entries(metadata)) {
    metaObject[key] = value;
  }
  
  return schema.meta(metaObject);
}

// =============================================================================
// MAIN COMPOSITION FUNCTIONS
// =============================================================================

/**
 * Get a section schema with all its fields and metadata
 */
export async function getSectionSchema(sectionId: SectionId): Promise<z.ZodObject<any>> {
  const section = await importSection(sectionId);
  
  // Create field schemas with metadata - iterate over all fields in configuration
  const fieldSchemas: Record<string, z.ZodTypeAny> = {};
  
  for (const [fieldName, field] of Object.entries(section.fields)) {
    // Use the existing Zod schema from configuration
    const fieldSchema = (field as any).zod;
    
    // Attach all metadata from the field configuration
    const fieldWithMetadata = attachMetadata(fieldSchema, (field as any).metadata);
    
    fieldSchemas[fieldName] = fieldWithMetadata;
  }
  
  // Create section schema with all section metadata
  const sectionSchema = z.object(fieldSchemas);
  
  // Attach all section-level metadata
  const sectionMetadata: Record<string, any> = {};
  for (const [key, value] of Object.entries(section)) {
    // Skip fields and other non-metadata properties
    if (key !== 'fields' && key !== 'id' && key !== 'name' && key !== 'interfaceName') {
      sectionMetadata[key] = value;
    }
  }
  
  return attachMetadata(sectionSchema, sectionMetadata) as z.ZodObject<any>;
}

/**
 * Get a family schema with all its fields and metadata
 */
export async function getFamilySchema(familyId: FamilyId): Promise<z.ZodObject<any>> {
  const family = await importFamily(familyId);
  
  // Create field schemas with metadata - iterate over all fields in configuration
  const fieldSchemas: Record<string, z.ZodTypeAny> = {};
  
  for (const [fieldName, field] of Object.entries(family.fields)) {
    // Use the existing Zod schema from configuration
    const fieldSchema = (field as any).zod;
    
    // Attach all metadata from the field configuration
    const fieldWithMetadata = attachMetadata(fieldSchema, (field as any).metadata);
    
    fieldSchemas[fieldName] = fieldWithMetadata;
  }
  
  // Create family schema with all family metadata
  const familySchema = z.object(fieldSchemas);
  
  // Attach all family-level metadata
  const familyMetadata: Record<string, any> = {};
  for (const [key, value] of Object.entries(family)) {
    // Skip fields and other non-metadata properties
    if (key !== 'fields' && key !== 'id' && key !== 'name' && key !== 'interfaceName' && key !== 'documentTypes') {
      familyMetadata[key] = value;
    }
  }
  
  return attachMetadata(familySchema, familyMetadata) as z.ZodObject<any>;
}

/**
 * Get a document schema with all its families and metadata
 */
export async function getDocumentSchema(documentType: DocumentType): Promise<z.ZodObject<any>> {
  // Import the document data object
  const document = await importDocument(documentType);
  
  // Create field schemas with metadata - iterate over all fields in configuration
  const fieldSchemas: Record<string, z.ZodTypeAny> = {};
  
  for (const [fieldName, field] of Object.entries(document.fields)) {
    // Use the existing Zod schema from configuration
    const fieldSchema = (field as any).zod;
    
    // Attach all metadata from the field configuration
    const fieldWithMetadata = attachMetadata(fieldSchema, (field as any).metadata);
    
    fieldSchemas[fieldName] = fieldWithMetadata;
  }
  
  // Create document schema with all document metadata
  const documentSchema = z.object(fieldSchemas);
  
  // Attach all document-level metadata
  const documentMetadata: Record<string, any> = {};
  for (const [key, value] of Object.entries(document)) {
    // Skip fields and other non-metadata properties
    if (key !== 'fields' && key !== 'id' && key !== 'name' && key !== 'description') {
      documentMetadata[key] = value;
    }
  }
  
  // Add document type and families info
  const composition = DOCUMENT_COMPOSITION[documentType];
  documentMetadata.documentType = documentType;
  documentMetadata.families = composition.map(c => c.family.id);
  
  return attachMetadata(documentSchema, documentMetadata) as z.ZodObject<any>;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get all available family IDs
 */
export function getAvailableFamilies(): string[] {
  const families = new Set<string>();
  for (const documentType of DOCUMENT_TYPES) {
    const composition = DOCUMENT_COMPOSITION[documentType];
    for (const familyComposition of composition) {
      families.add(familyComposition.family.id);
    }
  }
  return Array.from(families);
}

/**
 * Get all available section IDs for a family
 */
export function getAvailableSections(familyId: FamilyId): string[] {
  const sections = new Set<string>();
  for (const documentType of DOCUMENT_TYPES) {
    const composition = DOCUMENT_COMPOSITION[documentType];
    for (const familyComposition of composition) {
      if (familyComposition.family.id === familyId) {
        for (const section of familyComposition.sections) {
          sections.add(section.id);
        }
      }
    }
  }
  return Array.from(sections);
}

/**
 * Get family ID from section ID (e.g., "1.1" -> "1-meta-governance")
 */
function getFamilyIdFromSectionId(sectionId: SectionId): string {
  // For now, we know all sections belong to "1-meta-governance"
  // In the future, this could be more dynamic
  return '1-meta-governance';
}

/**
 * Get section filename from section ID (e.g., "1.1" -> "1.1-status")
 */
function getSectionFileName(sectionId: SectionId): string {
  // Map section IDs to their filenames
  const sectionFileMap: Record<string, string> = {
    '1.1': '1.1-status',
    '1.2': '1.2-priority-drivers',
    '1.3': '1.3-history'
  };
  
  return sectionFileMap[sectionId] || sectionId;
}
