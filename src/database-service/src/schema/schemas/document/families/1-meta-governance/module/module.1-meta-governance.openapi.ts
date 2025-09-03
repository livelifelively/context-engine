// =============================================================================
// MODULE-SPECIFIC OPENAPI METADATA
// =============================================================================

import { getSectionContentFormatAndExamples, getSharedFieldMetadata } from '../shared.1-meta-governance.openapi.js';

// =============================================================================
// MODULE-SPECIFIC OPENAPI METADATA
// =============================================================================

// Module-specific section metadata (inherits common patterns)
export const Section_1_3_History_Module_Metadata = {
  description: 'History section for Modules. Maintains execution continuity by tracking completed tasks and their outcomes.',
  summary: 'Module-level execution continuity and knowledge preservation',
  
  // Inherit common patterns from shared
  ...getSectionContentFormatAndExamples('1.3'),
}

// Module-specific field metadata (inherits common patterns)
export const Family_1_MetaGovernance_Module_Metadata = {
  history: Section_1_3_History_Module_Metadata,
  document: getSharedFieldMetadata('document'),
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets OpenAPI metadata for a module section
 */
export const getModuleSectionMetadata = (sectionId: string) => {
  switch (sectionId) {
    case '1.3':
      return Section_1_3_History_Module_Metadata;
    default:
      return {};
  }
};

/**
 * Gets OpenAPI metadata for the module family
 */
export const getModuleFamilyMetadata = () => {
  return Family_1_MetaGovernance_Module_Metadata;
};

