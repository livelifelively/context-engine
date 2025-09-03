// =============================================================================
// FEATURE-SPECIFIC OPENAPI METADATA
// =============================================================================

import { getSectionContentFormatAndExamples, getSharedFieldMetadata } from '../shared.1-meta-governance.openapi.js';

// =============================================================================
// FEATURE-SPECIFIC OPENAPI METADATA
// =============================================================================

// Feature-specific section metadata (inherits common patterns)
export const Section_1_3_History_Feature_Metadata = {
  description: 'History section for Features. Maintains execution continuity by tracking completed tasks and their outcomes.',
  summary: 'Feature-level execution continuity and knowledge preservation',
  
  // Inherit common patterns from shared
  ...getSectionContentFormatAndExamples('1.3'),
}

// Feature-specific field metadata (inherits common patterns)
export const Family_1_MetaGovernance_Feature_Metadata = {
  history: Section_1_3_History_Feature_Metadata,
  document: getSharedFieldMetadata('document'),
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets OpenAPI metadata for a feature section
 */
export const getFeatureSectionMetadata = (sectionId: string) => {
  switch (sectionId) {
    case '1.3':
      return Section_1_3_History_Feature_Metadata;
    default:
      return {};
  }
};

/**
 * Gets OpenAPI metadata for the feature family
 */
export const getFeatureFamilyMetadata = () => {
  return Family_1_MetaGovernance_Feature_Metadata;
};

