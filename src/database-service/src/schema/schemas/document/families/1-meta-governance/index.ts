// =============================================================================
// META & GOVERNANCE FAMILY - INDEX FILE
// =============================================================================
// This file provides backward compatibility by re-exporting all schemas and types
// from the new folder structure.

// =============================================================================
// SHARED EXPORTS
// =============================================================================

export * from './shared.1-meta-governance.schema.js';
export * from './shared.1-meta-governance.openapi.js';

// =============================================================================
// PLAN EXPORTS
// =============================================================================

export * from './plan/plan.1-meta-governance.schema.js';
export * from './plan/plan.1-meta-governance.openapi.js';

// =============================================================================
// TASK EXPORTS
// =============================================================================

export * from './task/task.1-meta-governance.schema.js';
export * from './task/task.1-meta-governance.openapi.js';

// =============================================================================
// PROJECT EXPORTS
// =============================================================================

export * from './project/project.1-meta-governance.schema.js';
export * from './project/project.1-meta-governance.openapi.js';

// =============================================================================
// MODULE EXPORTS
// =============================================================================

export * from './module/module.1-meta-governance.schema.js';
export * from './module/module.1-meta-governance.openapi.js';

// =============================================================================
// FEATURE EXPORTS
// =============================================================================

export * from './feature/feature.1-meta-governance.schema.js';
export * from './feature/feature.1-meta-governance.openapi.js';

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

import { DocumentType } from '../../shared.schema.js';
import { getMetaGovernancePlanSchema } from './plan/plan.1-meta-governance.schema.js';
import { getMetaGovernanceTaskSchema } from './task/task.1-meta-governance.schema.js';
import { getMetaGovernanceProjectSchema } from './project/project.1-meta-governance.schema.js';
import { getMetaGovernanceModuleSchema } from './module/module.1-meta-governance.schema.js';
import { getMetaGovernanceFeatureSchema } from './feature/feature.1-meta-governance.schema.js';

/**
 * Gets the Meta & Governance family schema for a specific document type
 * @param docType - The document type
 * @returns The appropriate family schema
 */
export const getMetaGovernanceFamilySchema = (docType: DocumentType) => {
  switch (docType) {
    case 'plan':
      return getMetaGovernancePlanSchema();
    case 'task':
      return getMetaGovernanceTaskSchema();
    case 'project':
      return getMetaGovernanceProjectSchema();
    case 'module':
      return getMetaGovernanceModuleSchema();
    case 'feature':
      return getMetaGovernanceFeatureSchema();
    default:
      throw new Error(`Unsupported document type: ${docType}`);
  }
};

/**
 * Gets a specific Meta & Governance family section schema by section ID and document type
 * @param sectionId - The section ID (e.g., '1.1', '1.2', '1.3')
 * @param docType - The document type
 * @returns The appropriate section schema
 */
export const getMetaGovernanceFamilySectionSchema = (sectionId: string, docType: DocumentType) => {
  switch (sectionId) {
    case '1.1': // Status
      return getStatusSectionSchema(docType);
    case '1.2': // Priority Drivers
      return getPriorityDriversSectionSchema(docType);
    case '1.3': // History
      return getHistorySectionSchema(docType);
    default:
      throw new Error(`Unknown section ID: ${sectionId}`);
  }
};

/**
 * Gets the Status section schema for a specific document type
 * @param docType - The document type
 * @returns The appropriate status section schema
 */
export const getStatusSectionSchema = (docType: DocumentType) => {
  switch (docType) {
    case 'task':
      return getMetaGovernanceTaskStatusSchema();
    default:
      throw new Error(`Status section not supported for document type: ${docType}`);
  }
};

/**
 * Gets the Priority Drivers section schema for a specific document type
 * @param docType - The document type
 * @returns The appropriate priority drivers section schema
 */
export const getPriorityDriversSectionSchema = (docType: DocumentType) => {
  switch (docType) {
    case 'plan':
      return getMetaGovernancePlanPriorityDriversSchema();
    case 'task':
      return getMetaGovernanceTaskPriorityDriversSchema();
    default:
      throw new Error(`Priority Drivers section not supported for document type: ${docType}`);
  }
};

/**
 * Gets the History section schema for a specific document type
 * @param docType - The document type
 * @returns The appropriate history section schema
 */
export const getHistorySectionSchema = (docType: DocumentType) => {
  switch (docType) {
    case 'project':
      return getMetaGovernanceProjectHistorySchema();
    case 'module':
      return getMetaGovernanceModuleHistorySchema();
    case 'feature':
      return getMetaGovernanceFeatureHistorySchema();
    default:
      throw new Error(`History section not supported for document type: ${docType}`);
  }
};

// Import the convenience functions from individual modules
import { getMetaGovernanceTaskStatusSchema } from './task/task.1-meta-governance.schema.js';
import { getMetaGovernancePlanPriorityDriversSchema } from './plan/plan.1-meta-governance.schema.js';
import { getMetaGovernanceTaskPriorityDriversSchema } from './task/task.1-meta-governance.schema.js';
import { getMetaGovernanceProjectHistorySchema } from './project/project.1-meta-governance.schema.js';
import { getMetaGovernanceModuleHistorySchema } from './module/module.1-meta-governance.schema.js';
import { getMetaGovernanceFeatureHistorySchema } from './feature/feature.1-meta-governance.schema.js';
