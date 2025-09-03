// =============================================================================
// TASK METADATA DEFINITIONS
// =============================================================================

import { SectionSchemaId } from '../../../shared.schema.js';
import { getFamilyDocumentMetadata, getSectionContentFormatAndExamples } from '../shared.1-meta-governance.meta.js';


// Task-specific section metadata
// can extend these with specific metadata for the task document type
export const Section_1_1_Status_Task_Metadata = {
  ...getSectionContentFormatAndExamples('1.1'),
}

// can extend these with specific metadata for the task document type
export const Section_1_2_PriorityDrivers_Task_Metadata = {
  ...getSectionContentFormatAndExamples('1.2'),
}

// can extend these with specific metadata for the task document type
export const Section_1_3_History_Task_Metadata = {
  ...getSectionContentFormatAndExamples('1.3'),
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

