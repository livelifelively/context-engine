import { z } from 'zod';
import { BaseStatusSchema, BasePriorityDriversSchema, BaseHistorySchema } from '../shared.1-meta-governance.schema.js';
import { BaseFamilySchema } from '../../../shared.schema.js';
import {
  getTaskSectionMetadata,
  getTaskFamilyMetadata,
} from './task.1-meta-governance.meta.js';
import {
  StatusKey,
  PriorityLevel,
  DateTimeString,
} from '../../../shared.schema.js';
import { getStatusFieldMetadata } from './task.1-meta-governance.meta.js';

// =============================================================================
// TASK-SPECIFIC SECTION SCHEMAS
// =============================================================================

// Section 1.1: Status - Task (extends base + additional fields)
export const Section_1_1_Status_Task = BaseStatusSchema.extend({
  currentState: StatusKey.meta(getStatusFieldMetadata('currentState')),
  priority: PriorityLevel.meta(getStatusFieldMetadata('priority')),
  progress: z.number().min(0).max(100).meta(getStatusFieldMetadata('progress')),
  planningEstimate: z.number().min(1).meta(getStatusFieldMetadata('planningEstimate')),
  implementationStartedOn: DateTimeString.meta(getStatusFieldMetadata('implementationStartedOn')),
  completedOn: DateTimeString.meta(getStatusFieldMetadata('completedOn')),
}).meta(getTaskSectionMetadata('1.1'));

// Section 1.2: Priority Drivers - Task (extends base)
// get base priority drivers schema with field metadata
// apply task section metadata
export const Section_1_2_PriorityDrivers_Task = BasePriorityDriversSchema.meta(getTaskSectionMetadata('1.2'));

// Section 1.3: History - Task (extends base)
// get base history schema with field metadata
// apply task section metadata
export const Section_1_3_History_Task = BaseHistorySchema.meta(getTaskSectionMetadata('1.3'));

// =============================================================================
// TASK FAMILY SCHEMA
// =============================================================================

// Family 1: Meta & Governance - Task (extends base + sections)
// get base family schema with field metadata
// apply task family metadata
export const Family_1_MetaGovernance_Task = BaseFamilySchema.extend({
  status: Section_1_1_Status_Task,
  priorityDrivers: Section_1_2_PriorityDrivers_Task,
}).meta(getTaskFamilyMetadata());

// =============================================================================
// TYPE EXPORTS
// =============================================================================

// Export types for use in other modules
export type Section_1_1_Status_Task_Type = z.infer<typeof Section_1_1_Status_Task>;
export type Section_1_2_PriorityDrivers_Task_Type = z.infer<typeof Section_1_2_PriorityDrivers_Task>;

export type Family_1_MetaGovernance_Task_Type = z.infer<typeof Family_1_MetaGovernance_Task>;

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Gets the Meta & Governance family schema for Task documents
 * @returns The Task family schema
 */
export const getMetaGovernanceTaskSchema = () => Family_1_MetaGovernance_Task;

/**
 * Gets the Status section schema for Task documents
 * @returns The Status section schema for Tasks
 */
export const getMetaGovernanceTaskStatusSchema = () => Section_1_1_Status_Task;

/**
 * Gets the Priority Drivers section schema for Task documents
 * @returns The Priority Drivers section schema for Tasks
 */
export const getMetaGovernanceTaskPriorityDriversSchema = () => Section_1_2_PriorityDrivers_Task;
