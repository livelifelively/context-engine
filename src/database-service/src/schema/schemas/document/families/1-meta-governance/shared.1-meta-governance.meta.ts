import { SectionSchemaId, DocumentType } from '../../shared.schema.js';
import { BaseFieldMetadata, BaseSectionMetadata, FamilyDocumentMetadata } from '../../shared.metadata.js';

// =============================================================================
// SHARED METADATA DEFINITIONS
// =============================================================================

// metadata for every section in the meta governance family
// centralize the metadata for all sections in the meta governance family
// know what all sections are and what they do
export const SECTION_CONTENT_FORMAT_AND_EXAMPLES: Record<SectionSchemaId, BaseSectionMetadata> = {
  '1.1': {
    id: '1.1',
    name: 'Status',
    description: [
      'Real-time execution visibility and status tracking for tasks',
    ],
    businessPurpose: 'Enables humans and AI systems to know the current status of task, identify blockers and track development velocity',
    validationRules: ['Must follow markdown format', 'Must include required timestamp fields']
  },
  '1.2': {
    id: '1.2',
    name: 'Priority Drivers',
    description: [
      'Business justification and strategic context for work prioritization',
    ],
    businessPurpose: 'Provides priority drivers to identify the business context and justification for resource allocation decisions',
    validationRules: ['Must be bulleted list', 'Must contain valid priority driver codes']
  },
  '1.3': {
    id: '1.3',
    name: 'History',
    description: [
      'Completed work tracking and knowledge preservation',
    ],
    businessPurpose: 'Maintains execution continuity and preserves link between the plan/task and the implemented work',
    validationRules: ['Must be bulleted list', 'Must contain task references with context']
  },
};

// metadata for every document type in the meta governance family
// for every document type, we have different objectives for the meta governance family
// what the family does in respective document types
export const FAMILY_DOCUMENT_METADATA: Record<DocumentType, FamilyDocumentMetadata> = {
  plan: {
    description: [
      'Governs strategic priority decisions by capturing business drivers that justify resource allocation.'
    ],
    businessPurpose: 'Provides strategic governance and priority decision-making framework',
  },
  task: {
    description: [
      'Provides real-time execution visibility through detailed status tracking, progress metrics, and priority justification.',
      'Enables humans and AI systems to identify blockers, track velocity, and understand urgency without manual status updates.',
      'Inherits strategic drivers from parent plans while adding technical execution context.',
    ],
    businessPurpose: 'Enables humans and AI systems to identify blockers, track velocity, and understand urgency',
  },
  project: {
    description: [
      'Works as a bridge between planning, implementation and codebases.',
      'Maintains execution continuity by tracking completed tasks and their outcomes.',
      'Enables understanding of delivery patterns, identification of recurring blockers, and identify the relationship between institutional knowledge across project lifecycles.',
      'Connects tactical execution to strategic objectives through task history.',
    ],
    businessPurpose: 'Link existing codebases to the planning and implementation context',
  },
  module: {
    description: [
      'Works as a bridge between planning, implementation and codebases.',
      'Maintains execution continuity by tracking completed tasks and their outcomes.',
      'Enables understanding of delivery patterns, identification of recurring blockers, and identify the relationship between institutional knowledge across project lifecycles.',
      'Connects tactical execution to strategic objectives through task history.',
    ],
    businessPurpose: 'Link existing codebases to the planning and implementation context',
  },
  feature: {
    description: [
      'Works as a bridge between planning, implementation and codebases.',
      'Maintains execution continuity by tracking completed tasks and their outcomes.',
      'Enables understanding of delivery patterns, identification of recurring blockers, and identify the relationship between institutional knowledge across project lifecycles.',
      'Connects tactical execution to strategic objectives through task history.',
    ],
    businessPurpose: 'Link existing codebases to the planning and implementation context',
  },
};

// =============================================================================
// FIELD METADATA FOR META GOVERNANCE FAMILY
// =============================================================================

// status section fields metadata
// in status section, we have multiple fields, to track project management metrics
export const STATUS_FIELD_METADATA: Record<string, BaseFieldMetadata> = {
  currentState: {
    description: [
      'The operational status of the task (e.g., Done, In Progress)',
    ],
    examples: ['Done', 'In Progress', 'Not Started', 'Under Review', 'Blocked'],
    businessPurpose: 'Tracks real-time execution state for human and CI system visibility',
    validationRules: ['Must be valid StatusKey enum value', 'Should be updated when status changes']
  },
  priority: {
    description: [
      "The task's priority level (e.g., High)",
    ],
    examples: ['High', 'Medium', 'Low'],
    businessPurpose: 'Indicates urgency and resource allocation priority',
    validationRules: ['Must be valid PriorityLevel enum value', 'Should align with business priority drivers']
  },
  progress: {
    description: [
      'A percentage representing the completion of the task',
    ],
    examples: [0, 25, 50, 75, 100],
    businessPurpose: 'Provides quantitative progress tracking for velocity analysis',
    validationRules: ['Must be between 0 and 100 inclusive', 'Should be updated regularly']
  },
  planningEstimate: {
    description: [
      'The initial story point estimate in Fibonacci sequence assigned during planning.',
    ],
    examples: [1, 2, 3, 5, 8, 13, 21],
    businessPurpose: 'Provides initial effort estimation for planning and resource allocation',
    validationRules: ['Must be positive number', 'Should not change after implementation starts']
  },
  implementationStartedOn: {
    description: [
      'The timestamp when a developer began working on the task',
    ],
    examples: ['2024-01-15 09:00', '2024-01-20 14:30'],
    businessPurpose: 'Tracks when actual development work began',
    validationRules: ['Must be valid ISO timestamp', 'Should be set when development begins']
  },
  completedOn: {
    description: [
      'The timestamp when the task was marked as Done',
    ],
    examples: ['2024-01-25 16:00', '2024-01-30 11:45'],
    businessPurpose: 'Records when work was completed for velocity and delivery tracking',
    validationRules: ['Must be valid ISO timestamp', 'Should be set when task is marked complete']
  },
};


// these fields are related to sections that are common to multiple document types
export const SHARED_FIELD_METADATA: Record<string, BaseFieldMetadata> = {
  taskDocuments: {
    description: [
      'Array of task document IDs in graph database that are linked to this documentation',
    ],
    businessPurpose: 'Connects high-level documents to their constituent tasks',
    validationRules: ['Must contain valid task references', 'Should be updated when tasks change']
  },
  priorityDrivers: {
    description: [
      'Array of priority driver codes that justify the importance of this work.',
    ],
    businessPurpose: 'Provides business context and justification for resource allocation decisions',
    validationRules: ['Must contain valid priority driver codes', 'Should be updated when business context changes']
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets OpenAPI metadata for a family
 */
export const getFamilyDocumentMetadata = (documentType: keyof typeof FAMILY_DOCUMENT_METADATA) => {
  const metadata = FAMILY_DOCUMENT_METADATA[documentType];
  if (!metadata) {
    throw new Error(`Family document metadata not found for document type: ${documentType}`);
  }
  return {
    ...metadata,
    description: metadata.description.join('. ')
  };
};

/**
 * Gets OpenAPI metadata for a field
 */
export const getStatusFieldMetadata = (fieldName: keyof typeof STATUS_FIELD_METADATA) => {
  const metadata = STATUS_FIELD_METADATA[fieldName];
  if (!metadata) {
    throw new Error(`Status field metadata not found for field: ${fieldName}`);
  }
  return {
    ...metadata,
    description: metadata.description.join('. ')
  };
};

/**
 * Gets section content format and examples
 */
export const getSectionContentFormatAndExamples = (sectionSchemaId: SectionSchemaId) => {
  const metadata = SECTION_CONTENT_FORMAT_AND_EXAMPLES[sectionSchemaId];
  if (!metadata) {
    throw new Error(`Section content format and examples not found for section: ${sectionSchemaId}`);
  }
  return {
    ...metadata,
    description: metadata.description.join('. ')
  };
};

/**
 * Gets OpenAPI metadata for a shared field
 */
export const getSharedFieldMetadata = (fieldName: keyof typeof SHARED_FIELD_METADATA) => {
  const metadata = SHARED_FIELD_METADATA[fieldName];
  if (!metadata) {
    throw new Error(`Shared field metadata not found for field: ${fieldName}`);
  }
  return {
    ...metadata,
    description: metadata.description.join('. ')
  };
};