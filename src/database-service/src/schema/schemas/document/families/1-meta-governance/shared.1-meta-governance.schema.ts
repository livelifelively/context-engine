import { z } from 'zod';
import { PriorityDriver, SchemaFamilyConfig, BaseSectionSchema } from '../../shared.schema.js';
import { getSharedFieldMetadata } from './shared.1-meta-governance.meta.js';



// =============================================================================
// FAMILY CONFIGURATION
// =============================================================================

// Meta & Governance family configuration
export const META_GOVERNANCE_FAMILY_CONFIG: SchemaFamilyConfig = {
  id: 1,
  name: 'Meta & Governance',
  version: '2.0',
  description: 'Status tracking, priority drivers, and governance metadata for all document types',
};

// =============================================================================
// SECTION DEFINITIONS
// =============================================================================

// Section definitions for Meta & Governance family
export const META_GOVERNANCE_SECTIONS = {
  STATUS: { id: '1.1', name: 'Status' },
  PRIORITY_DRIVERS: { id: '1.2', name: 'Priority Drivers' },
  HISTORY: { id: '1.3', name: 'History' },
} as const;

// =============================================================================
// BASE SCHEMAS (Interface-like)
// =============================================================================

// Base Status schema (shared fields)
export const BaseStatusSchema = BaseSectionSchema.extend({
  // Additional status-specific fields can be added here
});

// Base Priority Drivers schema (shared fields)
export const BasePriorityDriversSchema = BaseSectionSchema.extend({
  priorityDrivers: z.array(PriorityDriver).min(1).meta(getSharedFieldMetadata('priorityDrivers')),
});

// Base History schema (shared fields)
export const BaseHistorySchema = BaseSectionSchema.extend({
  taskDocuments: z.array(z.string().min(1)).min(1).meta(getSharedFieldMetadata('taskDocuments')),
});

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets the family configuration for Meta & Governance
 * @returns The family configuration object
 */
export const getMetaGovernanceFamilyConfig = () => META_GOVERNANCE_FAMILY_CONFIG;

/**
 * Gets all section definitions for Meta & Governance
 * @returns Object containing all section definitions
 */
export const getMetaGovernanceSections = () => META_GOVERNANCE_SECTIONS;

/**
 * Gets the schema version for Meta & Governance
 * @returns The schema version string
 */
export const getMetaGovernanceSchemaVersion = () => META_GOVERNANCE_FAMILY_CONFIG.version;
