import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { DocumentReference, SectionReference } from '../../../shared.schema.js';
import { BaseHistorySchema, BaseFamilySchema } from '../shared.1-meta-governance.schema.js';
import {
  getFeatureSectionMetadata,
  getFeatureFamilyMetadata,
} from './feature.1-meta-governance.openapi.js';
import { getSharedFieldMetadata } from '../shared.1-meta-governance.openapi.js';

// Extend Zod with OpenAPI functionality
extendZodWithOpenApi(z);

// =============================================================================
// FEATURE-SPECIFIC SECTION SCHEMAS
// =============================================================================

// Section 1.3: History - Feature (extends base)
export const Section_1_3_History_Feature = BaseHistorySchema.extend({
  parent: SectionReference.openapi(getSharedFieldMetadata('parent')),
}).openapi(getFeatureSectionMetadata('1.3'));

// =============================================================================
// FEATURE FAMILY SCHEMA
// =============================================================================

// Family 1: Meta & Governance - Feature (extends base + sections)
export const Family_1_MetaGovernance_Feature = BaseFamilySchema.extend({
  history: Section_1_3_History_Feature,
  document: DocumentReference.openapi(getSharedFieldMetadata('document')),
}).openapi(getFeatureFamilyMetadata());

// =============================================================================
// TYPE EXPORTS
// =============================================================================

// Export types for use in other modules
export type Section_1_3_History_Feature_Type = z.infer<typeof Section_1_3_History_Feature>;
export type Family_1_MetaGovernance_Feature_Type = z.infer<typeof Family_1_MetaGovernance_Feature>;

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Gets the Meta & Governance family schema for Feature documents
 * @returns The Feature family schema
 */
export const getMetaGovernanceFeatureSchema = () => Family_1_MetaGovernance_Feature;

/**
 * Gets the History section schema for Feature documents
 * @returns The History section schema for Features
 */
export const getMetaGovernanceFeatureHistorySchema = () => Section_1_3_History_Feature;
