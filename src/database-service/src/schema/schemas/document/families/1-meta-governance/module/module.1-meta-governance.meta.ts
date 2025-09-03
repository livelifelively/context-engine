// =============================================================================
// MODULE-SPECIFIC METADATA
// =============================================================================

import { SectionSchemaId } from '../../../shared.schema.js';
import { getFamilyDocumentMetadata, getSectionContentFormatAndExamples } from '../shared.1-meta-governance.meta.js';


// Module-specific section metadata
// can extend these with specific metadata for the module document type
export const Section_1_3_History_Module_Metadata = {
  ...getSectionContentFormatAndExamples('1.3'),
}

// Module-specific field metadata. 
// Composed from module document specific sections for meta governance family
// can extend these with specific metadata for the module document type
export const Family_1_MetaGovernance_Module_Metadata = {
  ...getFamilyDocumentMetadata('module'),
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets metadata for a module section
 */
export const getModuleSectionMetadata = (sectionSchemaId: SectionSchemaId) => {
  switch (sectionSchemaId) {
    case '1.3':
      return Section_1_3_History_Module_Metadata;
    default:
      throw new Error(`Module section metadata not found for section: ${sectionSchemaId}`);
  }
};

/**
 * Gets metadata for the module family
 */
export const getModuleFamilyMetadata = () => {
  return Family_1_MetaGovernance_Module_Metadata;
};

