// =============================================================================
// PROJECT-SPECIFIC METADATA
// =============================================================================

import { SectionSchemaId } from '../../../shared.schema.js';
import { getFamilyDocumentMetadata, getBaseSectionMetadata } from '../shared.1-meta-governance.meta.js';

// Project-specific section metadata
// can extend these with specific metadata for the project document type
export const Section_1_3_History_Project_Metadata = {
  ...getBaseSectionMetadata('1.3'),
}

// Project-specific field metadata. 
// Composed from project document specific sections for meta governance family
// can extend these with specific metadata for the project document type
export const Family_1_MetaGovernance_Project_Metadata = {
  ...getFamilyDocumentMetadata('project'),
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets metadata for a project section
 */
export const getProjectSectionMetadata = (sectionSchemaId: SectionSchemaId) => {
  switch (sectionSchemaId) {
    case '1.3':
      return Section_1_3_History_Project_Metadata;
    default:
      throw new Error(`Project section metadata not found for section: ${sectionSchemaId}`);
  }
};

/**
 * Gets metadata for the project family
 */
export const getProjectFamilyMetadata = () => {
  return Family_1_MetaGovernance_Project_Metadata;
};

