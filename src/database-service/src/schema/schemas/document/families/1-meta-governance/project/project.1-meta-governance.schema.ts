import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { DocumentReference, SectionReference } from '../../../shared.schema.js';
import { BaseHistorySchema, BaseFamilySchema } from '../shared.1-meta-governance.schema.js';
import {
  getProjectSectionMetadata,
  getProjectFamilyMetadata,
} from './project.1-meta-governance.openapi.js';
import { getSharedFieldMetadata } from '../shared.1-meta-governance.openapi.js';

// Extend Zod with OpenAPI functionality
extendZodWithOpenApi(z);

// =============================================================================
// PROJECT-SPECIFIC SECTION SCHEMAS
// =============================================================================

// Section 1.3: History - Project (extends base)
export const Section_1_3_History_Project = BaseHistorySchema.extend({
  parent: SectionReference.openapi(getSharedFieldMetadata('parent')),
}).openapi(getProjectSectionMetadata('1.3'));

// =============================================================================
// PROJECT FAMILY SCHEMA
// =============================================================================

// Family 1: Meta & Governance - Project (extends base + sections)
export const Family_1_MetaGovernance_Project = BaseFamilySchema.extend({
  history: Section_1_3_History_Project,
  document: DocumentReference.openapi(getSharedFieldMetadata('document')),
}).openapi(getProjectFamilyMetadata());

// =============================================================================
// TYPE EXPORTS
// =============================================================================

// Export types for use in other modules
export type Section_1_3_History_Project_Type = z.infer<typeof Section_1_3_History_Project>;
export type Family_1_MetaGovernance_Project_Type = z.infer<typeof Family_1_MetaGovernance_Project>;

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Gets the Meta & Governance family schema for Project documents
 * @returns The Project family schema
 */
export const getMetaGovernanceProjectSchema = () => Family_1_MetaGovernance_Project;

/**
 * Gets the History section schema for Project documents
 * @returns The History section schema for Projects
 */
export const getMetaGovernanceProjectHistorySchema = () => Section_1_3_History_Project;
