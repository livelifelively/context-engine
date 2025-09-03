// =============================================================================
// FEATURE-SPECIFIC METADATA
// =============================================================================

import { getFamilyDocumentMetadata, getSectionContentFormatAndExamples } from '../shared.1-meta-governance.meta.js';
import { SectionSchemaId } from '../../../shared.schema.js';

// Feature-specific section metadata
// can extend these with specific metadata for the feature document type
export const Section_1_3_History_Feature_Metadata = {
  ...getSectionContentFormatAndExamples('1.3'),
}

// Feature-specific field metadata. 
// Composed from feature document specific sections for meta governance family
// can extend these with specific metadata for the feature document type
export const Family_1_MetaGovernance_Feature_Metadata = {
  ...getFamilyDocumentMetadata('feature'),
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets metadata for a feature section
 */
export const getFeatureSectionMetadata = (sectionSchemaId: SectionSchemaId) => {
  switch (sectionSchemaId) {
    case '1.3':
      return Section_1_3_History_Feature_Metadata;
    default:
      throw new Error(`Feature section metadata not found for section: ${sectionSchemaId}`);
  }
};

/**
 * Gets metadata for the feature family
 */
export const getFeatureFamilyMetadata = () => {
  return Family_1_MetaGovernance_Feature_Metadata;
};

