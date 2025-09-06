/**
 * Family 1: Meta & Governance
 *
 * This file contains the complete data object for the Meta & Governance family,
 * serving as the single source of truth for generating:
 * - GraphQL family interfaces and types
 * - Zod family validation schemas
 * - Rich family metadata and documentation
 *
 * This family provides status tracking, priority drivers, and governance metadata
 * for all document types across the system.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES, DOCUMENT_TYPES } from '../../constants.js';
import {
  createFamilyIdField,
  createFamilyCreatedOnField,
  createFamilyLastUpdatedOnField,
  createDocumentReferenceField,
} from '../../field-factories.js';

// =============================================================================
// FAMILY IDENTIFIER
// =============================================================================

export const FAMILY_1_META_GOVERNANCE = '1-meta-governance';
export const FAMILY_NAME = 'meta & governance' as const;

export const family_1_meta_governance = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: FAMILY_1_META_GOVERNANCE,
  name: 'Meta & Governance',
  version: '2.0',
  description: 'Status tracking, priority drivers, and governance metadata for all document types',

  // Document types that support this family
  supportedBy: DOCUMENT_TYPES,

  // Sections that belong to this family
  sections: ['1.1', '1.2', '1.3'], // Status, Priority Drivers, History

  // =============================================================================
  // FAMILY DEFINITION
  // =============================================================================

  // GraphQL family interface name
  interfaceName: '_Family_1_MetaGovernance_',

  // Family-level metadata
  businessPurpose: 'Provides governance framework, status tracking, and priority management across all document types',

  questionsItAnswers: [
    'What is the status of this task/plan?',
    'What are the priority drivers for this task/plan?',
    'What are the project management metrics for this task/plan?',
    'What is the implementation history of this project/module/feature?',
  ],

  validationRules: [
    'All families must have valid timestamps',
    'Section relationships must be properly configured',
    'Document relationships must be bidirectional',
  ],

  usageGuidelines: [
    'Status should be updated in real-time',
    'Priority drivers should reflect business context',
    'History should be maintained for audit purposes',
    'Family metadata should be automatically managed',
  ],

  examples: [
    {
      context: 'Plan with governance',
      data: {
        status: 'ACTIVE',
        priorityDrivers: ['STRATEGIC_ALIGNMENT', 'REVENUE_IMPACT'],
        familyCreatedOn: '2024-01-01T00:00:00Z',
      },
    },
    {
      context: 'Task with full tracking',
      data: {
        status: {
          currentState: 'IN_PROGRESS',
          progress: 75,
          priority: 'HIGH',
        },
        priorityDrivers: ['DEADLINE_CRITICAL', 'CUSTOMER_IMPACT'],
        familyCreatedOn: '2024-01-15T09:00:00Z',
      },
    },
  ],

  aiInstructions: [
    'Monitor family status across all document types',
    'Identify patterns in priority drivers across families',
    'Maintain consistent governance practices',
    'Alert on governance violations or inconsistencies',
  ],

  // =============================================================================
  // FAMILY FIELDS
  // =============================================================================

  fields: {
    id: createFamilyIdField(FAMILY_NAME),

    familyCreatedOn: createFamilyCreatedOnField(FAMILY_NAME),

    familyLastUpdatedOn: createFamilyLastUpdatedOnField(FAMILY_NAME),

    document: createDocumentReferenceField(FAMILY_NAME),
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Family_1_MetaGovernance_Type = typeof family_1_meta_governance;
