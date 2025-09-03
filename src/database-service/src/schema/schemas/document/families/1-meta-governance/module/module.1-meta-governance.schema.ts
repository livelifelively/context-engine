import { z } from 'zod';
import { BaseHistorySchema } from '../shared.1-meta-governance.schema.js';
import { BaseFamilySchema } from '../../../shared.schema.js';
import {
  getModuleSectionMetadata,
  getModuleFamilyMetadata,
} from './module.1-meta-governance.meta.js';



// =============================================================================
// MODULE-SPECIFIC SECTION SCHEMAS
// =============================================================================

// Section 1.3: History - Module (extends base)
// get base history schema with field metadata
// apply module section metadata
export const Section_1_3_History_Module = BaseHistorySchema.meta(getModuleSectionMetadata('1.3'));

// =============================================================================
// MODULE FAMILY SCHEMA
// =============================================================================

// Family 1: Meta & Governance - Module (extends base + sections)
// get base family schema with field metadata
// apply module family metadata
export const Family_1_MetaGovernance_Module = BaseFamilySchema.extend({
  history: Section_1_3_History_Module,
}).meta(getModuleFamilyMetadata());

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
