import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import {
  StatusKey,
  PriorityLevel,
  DateTimeString,
  DocumentReference,
  SectionReference,
} from '../../../shared.schema.js';
import { BaseStatusSchema, BasePriorityDriversSchema, BaseFamilySchema } from '../shared.1-meta-governance.schema.js';
import {
  getTaskSectionMetadata,
  getTaskFamilyMetadata,
  getTaskFieldMetadata,
} from './task.1-meta-governance.openapi.js';

// Extend Zod with OpenAPI functionality
extendZodWithOpenApi(z);

// =============================================================================
// TASK-SPECIFIC SECTION SCHEMAS
// =============================================================================

// Section 1.1: Status - Task (extends base + additional fields)
export const Section_1_1_Status_Task = BaseStatusSchema.extend({
  currentState: StatusKey.openapi(getTaskFieldMetadata('currentState')),
  priority: PriorityLevel.openapi(getTaskFieldMetadata('priority')),
  progress: z.number().min(0).max(100).openapi(getTaskFieldMetadata('progress')),
  planningEstimate: z.number().min(0).openapi(getTaskFieldMetadata('planningEstimate')),
  implementationStartedOn: DateTimeString.openapi(getTaskFieldMetadata('implementationStartedOn')),
  completedOn: DateTimeString.openapi(getTaskFieldMetadata('completedOn')),
  parent: SectionReference.openapi(getTaskFieldMetadata('parent')),
}).openapi(getTaskSectionMetadata('1.1'));

// Section 1.2: Priority Drivers - Task (extends base)
export const Section_1_2_PriorityDrivers_Task = BasePriorityDriversSchema.extend({
  parent: SectionReference.openapi(getTaskFieldMetadata('parent')),
}).openapi(getTaskSectionMetadata('1.2'));

// =============================================================================
// TASK FAMILY SCHEMA
// =============================================================================

// Family 1: Meta & Governance - Task (extends base + sections)
export const Family_1_MetaGovernance_Task = BaseFamilySchema.extend({
  status: Section_1_1_Status_Task,
  priorityDrivers: Section_1_2_PriorityDrivers_Task,
  document: DocumentReference.openapi(getTaskFieldMetadata('document')),
}).openapi(getTaskFamilyMetadata());

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
