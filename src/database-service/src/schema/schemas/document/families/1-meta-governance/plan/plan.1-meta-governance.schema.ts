import { z } from 'zod';
import { BasePriorityDriversSchema } from '../shared.1-meta-governance.schema.js';
import { BaseFamilySchema } from '../../../shared.schema.js';
import {
  getPlanSectionMetadata,
  getPlanFamilyMetadata,
} from './plan.1-meta-governance.meta.js';



// =============================================================================
// PLAN-SPECIFIC SECTION SCHEMAS
// =============================================================================

// Section 1.2: Priority Drivers - Plan (extends base)
// get base priority drivers schema with field metadata
// apply plan section metadata
export const Section_1_2_PriorityDrivers_Plan = BasePriorityDriversSchema.meta(getPlanSectionMetadata('1.2'));

// =============================================================================
// PLAN FAMILY SCHEMA
// =============================================================================

// Family 1: Meta & Governance - Plan (extends base + sections)
// get base family schema with field metadata
// apply plan family metadata
export const Family_1_MetaGovernance_Plan = BaseFamilySchema.extend({
  priorityDrivers: Section_1_2_PriorityDrivers_Plan,
}).meta(getPlanFamilyMetadata());

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
