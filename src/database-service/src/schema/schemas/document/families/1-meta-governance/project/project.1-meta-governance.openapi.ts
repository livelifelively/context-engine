// =============================================================================
// PROJECT-SPECIFIC OPENAPI METADATA
// =============================================================================

import { getSectionContentFormatAndExamples, getSharedFieldMetadata } from '../shared.1-meta-governance.openapi.js';

// =============================================================================
// PROJECT-SPECIFIC OPENAPI METADATA
// =============================================================================

// Project-specific section metadata (inherits common patterns)
export const Section_1_3_History_Project_Metadata = {
  description: 'History section for Projects. Maintains execution continuity by tracking completed tasks and their outcomes.',
  summary: 'Project-level execution continuity and knowledge preservation',
  
  // Inherit common patterns from shared
  ...getSectionContentFormatAndExamples('1.3'),
}

// Project-specific field metadata (inherits common patterns)
export const Family_1_MetaGovernance_Project_Metadata = {
  history: Section_1_3_History_Project_Metadata,
  document: getSharedFieldMetadata('document'),
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets OpenAPI metadata for a project section
 */
export const getProjectSectionMetadata = (sectionId: string) => {
  switch (sectionId) {
    case '1.3':
      return Section_1_3_History_Project_Metadata;
    default:
      return {};
  }
};

/**
 * Gets OpenAPI metadata for the project family
 */
export const getProjectFamilyMetadata = () => {
  return Family_1_MetaGovernance_Project_Metadata;
};

