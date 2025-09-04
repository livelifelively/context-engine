// =============================================================================
// PLAN-SPECIFIC METADATA
// =============================================================================

import { SectionSchemaId } from '../../../shared.schema.js';
import { getFamilyDocumentMetadata, getBaseSectionMetadata } from '../shared.1-meta-governance.meta.js';

// Plan-specific section metadata
// can extend these with specific metadata for the plan document type
export const Section_1_2_PriorityDrivers_Plan_Metadata = {
  ...getBaseSectionMetadata('1.2'),
}

// Plan-specific field metadata. 
// Composed from plan document specific sections for meta governance family
// can extend these with specific metadata for the plan document type
export const Family_1_MetaGovernance_Plan_Metadata = {
  ...getFamilyDocumentMetadata('plan'),
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets metadata for a plan section
 */
export const getPlanSectionMetadata = (sectionSchemaId: SectionSchemaId) => {
  switch (sectionSchemaId) {
    case '1.2':
      return Section_1_2_PriorityDrivers_Plan_Metadata;
    default:
      throw new Error(`Plan section metadata not found for section: ${sectionSchemaId}`);
  }
};

/**
 * Gets metadata for the plan family
 */
export const getPlanFamilyMetadata = () => {
  return Family_1_MetaGovernance_Plan_Metadata;
};


