// =============================================================================
// PLAN-SPECIFIC OPENAPI METADATA
// =============================================================================

import { getSectionContentFormatAndExamples, getSharedFieldMetadata } from '../shared.1-meta-governance.openapi.js';

// =============================================================================
// PLAN-SPECIFIC OPENAPI METADATA
// =============================================================================

// Plan-specific section metadata (inherits common patterns)
export const Section_1_2_PriorityDrivers_Plan_Metadata = {
  description: 'Priority drivers section for Plans. Contains business drivers that justify strategic resource allocation decisions.',
  summary: 'Strategic priority drivers for Plans',
  
  // Inherit common patterns from shared
  ...getSectionContentFormatAndExamples('1.2'),
};

// Plan-specific field metadata (inherits common patterns)
export const Family_1_MetaGovernance_Plan_Metadata = {
  priorityDrivers: Section_1_2_PriorityDrivers_Plan_Metadata,
  document: getSharedFieldMetadata('document'),
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets OpenAPI metadata for a plan section
 */
export const getPlanSectionMetadata = (sectionId: string) => {
  switch (sectionId) {
    case '1.2':
      return Section_1_2_PriorityDrivers_Plan_Metadata;
    default:
      return {};
  }
};

/**
 * Gets OpenAPI metadata for the plan family
 */
export const getPlanFamilyMetadata = () => {
  return Family_1_MetaGovernance_Plan_Metadata;
};

/**
 * Gets OpenAPI metadata for a plan field
 */
export const getPlanFieldMetadata = (fieldName: string) => {
  switch (fieldName) {
    case 'priorityDrivers':
      return Section_1_2_PriorityDrivers_Plan_Metadata;
    case 'document':
      return getSharedFieldMetadata('document');
    case 'parent':
      return getSharedFieldMetadata('parent');
    default:
      return {};
  }
};
