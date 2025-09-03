import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { DocumentReference, SectionReference } from '../../../shared.schema.js';
import { BasePriorityDriversSchema, BaseFamilySchema } from '../shared.1-meta-governance.schema.js';
import {
  getPlanSectionMetadata,
  getPlanFamilyMetadata,
  getPlanFieldMetadata,
} from './plan.1-meta-governance.openapi.js';

// Extend Zod with OpenAPI functionality
extendZodWithOpenApi(z);

// =============================================================================
// PLAN-SPECIFIC SECTION SCHEMAS
// =============================================================================

// Section 1.2: Priority Drivers - Plan (extends base)
export const Section_1_2_PriorityDrivers_Plan = BasePriorityDriversSchema.extend({
  parent: SectionReference.openapi(getPlanFieldMetadata('parent')),
}).openapi(getPlanSectionMetadata('1.2'));

// =============================================================================
// PLAN FAMILY SCHEMA
// =============================================================================

// Family 1: Meta & Governance - Plan (extends base + sections)
export const Family_1_MetaGovernance_Plan = BaseFamilySchema.extend({
  priorityDrivers: Section_1_2_PriorityDrivers_Plan,
  document: DocumentReference.openapi(getPlanFieldMetadata('document')),
}).openapi(getPlanFamilyMetadata());

// =============================================================================
// TYPE EXPORTS
// =============================================================================

// Export types for use in other modules
export type Section_1_2_PriorityDrivers_Plan_Type = z.infer<typeof Section_1_2_PriorityDrivers_Plan>;
export type Family_1_MetaGovernance_Plan_Type = z.infer<typeof Family_1_MetaGovernance_Plan>;

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Gets the Meta & Governance family schema for Plan documents
 * @returns The Plan family schema
 */
export const getMetaGovernancePlanSchema = () => Family_1_MetaGovernance_Plan;

/**
 * Gets the Priority Drivers section schema for Plan documents
 * @returns The Priority Drivers section schema for Plans
 */
export const getMetaGovernancePlanPriorityDriversSchema = () => Section_1_2_PriorityDrivers_Plan;
