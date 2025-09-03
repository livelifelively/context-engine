import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { DocumentReference, SectionReference } from '../../../shared.schema.js';
import { BaseHistorySchema, BaseFamilySchema } from '../shared.1-meta-governance.schema.js';
import {
  getModuleSectionMetadata,
  getModuleFamilyMetadata,
} from './module.1-meta-governance.openapi.js';
import { getSharedFieldMetadata } from '../shared.1-meta-governance.openapi.js';

// Extend Zod with OpenAPI functionality
extendZodWithOpenApi(z);

// =============================================================================
// MODULE-SPECIFIC SECTION SCHEMAS
// =============================================================================

// Section 1.3: History - Module (extends base)
export const Section_1_3_History_Module = BaseHistorySchema.extend({
  parent: SectionReference.openapi(getSharedFieldMetadata('parent')),
}).openapi(getModuleSectionMetadata('1.3'));

// =============================================================================
// MODULE FAMILY SCHEMA
// =============================================================================

// Family 1: Meta & Governance - Module (extends base + sections)
export const Family_1_MetaGovernance_Module = BaseFamilySchema.extend({
  history: Section_1_3_History_Module,
  document: DocumentReference.openapi(getSharedFieldMetadata('document')),
}).openapi(getModuleFamilyMetadata());

// =============================================================================
// TYPE EXPORTS
// =============================================================================

// Export types for use in other modules
export type Section_1_3_History_Module_Type = z.infer<typeof Section_1_3_History_Module>;
export type Family_1_MetaGovernance_Module_Type = z.infer<typeof Family_1_MetaGovernance_Module>;

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Gets the Meta & Governance family schema for Module documents
 * @returns The Module family schema
 */
export const getMetaGovernanceModuleSchema = () => Family_1_MetaGovernance_Module;

/**
 * Gets the History section schema for Module documents
 * @returns The History section schema for Modules
 */
export const getMetaGovernanceModuleHistorySchema = () => Section_1_3_History_Module;
