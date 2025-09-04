// =============================================================================
// TASK METADATA DEFINITIONS
// =============================================================================

import { SectionSchemaId } from '../../../shared.schema.js';
import { BaseFieldMetadata } from '../../../shared.metadata.js';
import { getFamilyDocumentMetadata, getBaseSectionMetadata } from '../shared.1-meta-governance.meta.js';


// =============================================================================
// FIELD METADATA FOR META GOVERNANCE FAMILY
// =============================================================================

// status section fields metadata
// these are fields that are specific to the status section
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


/**
 * Gets metadata for status section fields
 * these are fields that are specific to the status section
 * can extend these with specific metadata for the document type at the document schema level
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

// Task-specific section metadata
// can extend these with specific metadata for the task document type
export const Section_1_1_Status_Task_Metadata = {
  ...getBaseSectionMetadata('1.1'),
}

// can extend these with specific metadata for the task document type
export const Section_1_2_PriorityDrivers_Task_Metadata = {
  ...getBaseSectionMetadata('1.2'),
}

// can extend these with specific metadata for the task document type
export const Section_1_3_History_Task_Metadata = {
  ...getBaseSectionMetadata('1.3'),
}

// Task-specific field metadata. 
// Composed from task document specific sections for meta governance family
// can extend these with specific metadata for the task document type
export const Family_1_MetaGovernance_Task_Metadata = {
  ...getFamilyDocumentMetadata('task'),
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets metadata for a task section
 */
export const getTaskSectionMetadata = (sectionSchemaId: SectionSchemaId) => {
  switch (sectionSchemaId) {
    case '1.1':
      return Section_1_1_Status_Task_Metadata;
    case '1.2':
      return Section_1_2_PriorityDrivers_Task_Metadata;
    case '1.3':
      return Section_1_3_History_Task_Metadata;
    default:
      throw new Error(`Task section metadata not found for section: ${sectionSchemaId}`);
  }
};

/**
 * Gets metadata for the task family
 */
export const getTaskFamilyMetadata = () => {
  return Family_1_MetaGovernance_Task_Metadata;
};

