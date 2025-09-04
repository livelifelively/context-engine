import { z } from 'zod';

// =============================================================================
// CORE METADATA TYPES (Used by ALL families)
// =============================================================================

export interface BaseSectionMetadata {
  id: string;
  name: string;
  description: string[];
  businessPurpose: string;
  contentFormat?: string;
  examples?: unknown[];
  validationRules?: string[];
  relatedSections?: string[];
}

export interface BaseFieldMetadata {
  description: string[];
  businessPurpose: string;
  examples?: unknown[];
  contentFormat?: string;
  validationRules?: string[];
  fieldType?: 'enum' | 'number' | 'string' | 'timestamp' | 'reference' | 'array' | 'object';
}

export interface FamilyDocumentMetadata {
  description: string[];
  businessPurpose: string;
}

// =============================================================================
// GLOBAL FIELD METADATA (Common fields used across all families)
// =============================================================================

export const GLOBAL_FIELD_METADATA: Record<string, BaseFieldMetadata> = {
  sectionDatabaseId: {
    description: ['Database ID for a specific section record in the graph database.'],
    businessPurpose: 'Unique identifier for a specific section record in the graph database.',
    examples: ['section-001', 'section-002', 'section-003'],
    contentFormat: 'String following database ID naming convention',
    validationRules: ['Must be unique across system', 'Should follow database ID format'],
  },
  documentDatabaseId: {
    description: ['Database ID for a specific document record in the graph database.'],
    businessPurpose: 'Unique identifier for a specific document record in the graph database.',
    examples: ['task-2024-001', 'plan-2024-Q1', 'project-api-gateway'],
    contentFormat: 'String following database ID naming convention',
    validationRules: ['Must be unique across system', 'Should follow database ID format'],
  },
  familyDatabaseId: {
    description: ['Database ID for a specific family record in the graph database.'],
    businessPurpose: 'Unique identifier for a specific family record in the graph database.',
    examples: ['family-001', 'family-002', 'family-003'],
    contentFormat: 'String following database ID naming convention',
    validationRules: ['Must be unique across system', 'Should follow database ID format'],
  },
  sectionCreatedOn: {
    description: ['Timestamp when the section was first created.'],
    businessPurpose: 'Timestamp when the section was first created.',
    examples: ['2024-01-15 09:00', '2024-01-20 14:30'],
    contentFormat: 'ISO 8601 timestamp format',
    validationRules: ['Must be valid ISO timestamp', 'Should be set automatically on creation'],
  },
  sectionLastUpdatedOn: {
    description: ['Timestamp when the section was last modified.'],
    businessPurpose: 'Timestamp when the section was last modified.',
    examples: ['2024-01-25 16:00', '2024-01-30 11:45'],
    contentFormat: 'ISO 8601 timestamp format',
    validationRules: ['Must be valid ISO timestamp', 'Should be updated on every change'],
  },
  documentCreatedOn: {
    description: ['Timestamp when the document was first created.'],
    businessPurpose: 'Timestamp when the document was first created.',
    examples: ['2024-01-15 09:00', '2024-01-20 14:30'],
    contentFormat: 'ISO 8601 timestamp format',
    validationRules: ['Must be valid ISO timestamp', 'Should be set automatically on creation'],
  },
  documentLastUpdatedOn: {
    description: ['Timestamp when the document was last modified.'],
    businessPurpose: 'Timestamp when the document was last modified.',
    examples: ['2024-01-25 16:00', '2024-01-30 11:45'],
    contentFormat: 'ISO 8601 timestamp format',
    validationRules: ['Must be valid ISO timestamp', 'Should be updated on every change'],
  },
  familyCreatedOn: {
    description: ['Timestamp when the family was first created.'],
    businessPurpose: 'Timestamp when the family was first created.',
    examples: ['2024-01-15 09:00', '2024-01-20 14:30'],
    contentFormat: 'ISO 8601 timestamp format',
    validationRules: ['Must be valid ISO timestamp', 'Should be set automatically on creation'],
  },
  familyLastUpdatedOn: {
    description: ['Timestamp when the family was last modified.'],
    businessPurpose: 'Timestamp when the family was last modified.',
    examples: ['2024-01-25 16:00', '2024-01-30 11:45'],
    contentFormat: 'ISO 8601 timestamp format',
    validationRules: ['Must be valid ISO timestamp', 'Should be updated on every change'],
  }
};

// =============================================================================
// GLOBAL REGISTRIES
// =============================================================================

// Base registry for all sections
export const globalSectionRegistry = z.registry<BaseSectionMetadata>();

// Base registry for all fields
export const globalFieldRegistry = z.registry<BaseFieldMetadata>();

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Generates comprehensive AI context for any schema using its metadata
 */
export function generateAIContext(metadata: BaseSectionMetadata): string {
  return `
Section: ${metadata.name}
Purpose: ${metadata.businessPurpose}
Format: ${metadata.contentFormat}
Examples: ${metadata.examples?.join(', ')}
Validation: ${metadata.validationRules?.join(', ')}
  `.trim();
}

export function getGlobalFieldMetadata(fieldName: keyof typeof GLOBAL_FIELD_METADATA) {
  const metadata = GLOBAL_FIELD_METADATA[fieldName];
  if (!metadata) {
    throw new Error(`Global field metadata not found for field: ${fieldName}`);
  }
  return {
    ...metadata,
    description: metadata.description.join('. ')
  }
}