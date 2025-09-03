// =============================================================================
// TASK-SPECIFIC OPENAPI METADATA
// =============================================================================

import { getSectionContentFormatAndExamples, getSharedFieldMetadata, getStatusFieldMetadata } from '../shared.1-meta-governance.openapi.js';

// =============================================================================
// TASK-SPECIFIC OPENAPI METADATA
// =============================================================================

// Task-specific section metadata (inherits common patterns)
export const Section_1_1_Status_Task_Metadata = {
  description: 'Status section for Tasks. Provides real-time execution visibility through detailed status tracking and progress metrics.',
  summary: 'Task status tracking and progress metrics',
  
  // Inherit common patterns from shared
  ...getSectionContentFormatAndExamples('1.1'),
};

export const Section_1_2_PriorityDrivers_Task_Metadata = {
  description: 'Priority drivers section for Tasks. Contains business drivers that justify the task priority, often inherited from parent plans.',
  summary: 'Task priority drivers and execution context',
  
  // Inherit common patterns from shared
  ...getSectionContentFormatAndExamples('1.2'),
};

// Task-specific field metadata (inherits common patterns)
export const Family_1_MetaGovernance_Task_Metadata = {
  status: Section_1_1_Status_Task_Metadata,
  priorityDrivers: Section_1_2_PriorityDrivers_Task_Metadata,
  document: getSharedFieldMetadata('document'),
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets OpenAPI metadata for a task section
 */
export const getTaskSectionMetadata = (sectionId: string) => {
  switch (sectionId) {
    case '1.1':
      return Section_1_1_Status_Task_Metadata;
    case '1.2':
      return Section_1_2_PriorityDrivers_Task_Metadata;
    default:
      return {};
  }
};

/**
 * Gets OpenAPI metadata for the task family
 */
export const getTaskFamilyMetadata = () => {
  return Family_1_MetaGovernance_Task_Metadata;
};

/**
 * Gets OpenAPI metadata for a task field
 */
export const getTaskFieldMetadata = (fieldName: string) => {
  switch (fieldName) {
    case 'currentState':
      return getStatusFieldMetadata('currentState');
    case 'priority':
      return getStatusFieldMetadata('priority');
    case 'progress':
      return getStatusFieldMetadata('progress');
    case 'planningEstimate':
      return getStatusFieldMetadata('planningEstimate');
    case 'implementationStartedOn':
      return getStatusFieldMetadata('implementationStartedOn');
    case 'completedOn':
      return getStatusFieldMetadata('completedOn');
    case 'status':
      return Section_1_1_Status_Task_Metadata;
    case 'priorityDrivers':
      return Section_1_2_PriorityDrivers_Task_Metadata;
    case 'document':
      return getSharedFieldMetadata('document');
    case 'parent':
      return getSharedFieldMetadata('parent');
    default:
      return {};
  }
};
