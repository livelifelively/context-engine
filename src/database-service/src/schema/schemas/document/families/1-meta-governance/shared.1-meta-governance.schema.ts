import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { DateTimeString, PriorityDriver, SchemaFamilyConfig, SectionReference } from '../../shared.schema.js';


// Extend Zod with OpenAPI functionality
extendZodWithOpenApi(z);

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
export const BaseStatusSchema = z
  .object({
    id: SectionReference,
    createdOn: DateTimeString,
    lastUpdatedOn: DateTimeString,
  })

// Base Priority Drivers schema (shared fields)
export const BasePriorityDriversSchema = z
  .object({
    id: SectionReference,
    priorityDrivers: z.array(PriorityDriver).min(1),
  })

// Base History schema (shared fields)
export const BaseHistorySchema = z
  .object({
    id: SectionReference,
    taskDocuments: z.array(z.string().min(1)).min(1),
  })

// Base Family schema (shared fields)
export const BaseFamilySchema = z
  .object({
    id: SectionReference,
    createdOn: DateTimeString,
    lastUpdatedOn: DateTimeString,
  })

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
