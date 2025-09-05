/**
 * Section: 1.2 Priority Drivers
 *
 * This file contains the complete data object for Priority Drivers sections,
 * serving as the single source of truth for generating:
 * - GraphQL section interfaces and implementations
 * - Zod section validation schemas
 * - Rich section metadata and documentation
 *
 * Priority Drivers sections define business justification and priority context
 * for work items across all document types.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';

// =============================================================================
// SECTION IDENTIFIER
// =============================================================================

export const SECTION_1_2_PRIORITY_DRIVERS = '1.2' as const;

// =============================================================================
// PRIORITY DRIVER ENUM
// =============================================================================

export const PriorityDriverEnum = z.enum([
  // Core-Business Process (CBP)
  'CBP_BREAK_BLOCK_REVENUE_LEGAL',
  'CBP_SLA_BREACH',
  'CBP_PARTIAL_DEGRADATION_KPI',
  'CBP_INCREMENTAL_IMPROVEMENT',

  // Security / Compliance (SEC)
  'SEC_CRITICAL_VULNERABILITY',
  'SEC_DATA_LEAK',
  'SEC_UPCOMING_COMPLIANCE',
  'SEC_HARDENING_LOW_RISK',

  // User Experience (UX)
  'UX_TASK_ABANDONMENT',
  'UX_SEVERE_USABILITY',
  'UX_NOTICEABLE_FRICTION',
  'UX_COSMETIC_POLISH',

  // Marketing / Growth (MKT)
  'MKT_LAUNCH_CRITICAL',
  'MKT_BRAND_RISK',
  'MKT_CAMPAIGN_OPTIMISATION',
  'MKT_LONG_TAIL_SEO',

  // Technical Foundation / Infrastructure (TEC)
  'TEC_PROD_STABILITY_BLOCKER',
  'TEC_DEV_PRODUCTIVITY_BLOCKER',
  'TEC_DEV_PRODUCTIVITY_ENHANCEMENT',
  'TEC_FLAKY_TEST',
  'TEC_TECH_DEBT_REFACTOR',
]);

export type PriorityDriver = z.infer<typeof PriorityDriverEnum>;

export const section_1_2_priority_drivers = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_1_2_PRIORITY_DRIVERS,
  name: 'Priority Drivers',
  description: 'Business justification and priority context for work items',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_1_2_PriorityDrivers_',

  // Section-level metadata
  businessPurpose: 'Provides business context and justification for resource allocation decisions',

  questionItAnswers: [
    'What is the priority drivers of the task/plan?',
    'Why is this task/plan important?',
    'What is the priority context of the task/plan?',
  ],

  validationRules: [
    'Must have at least one priority driver',
    'Priority drivers must be valid enum values',
    'Must follow business justification format',
  ],

  usageGuidelines: [
    'Should be defined early in the planning process',
    'Must be updated when business context changes',
    'Should align with organizational priorities',
  ],

  examples: [
    {
      context: 'High-priority task',
      data: {
        priorityDrivers: ['CBP_SLA_BREACH', 'SEC_CRITICAL_VULNERABILITY'],
      },
    },
    {
      context: 'Enhancement work',
      data: {
        priorityDrivers: ['UX_NOTICEABLE_FRICTION', 'TEC_DEV_PRODUCTIVITY_ENHANCEMENT'],
      },
    },
  ],

  aiInstructions: [
    'Analyze priority drivers to understand business impact',
    'Suggest priority driver updates based on changing business context',
    'Identify conflicts between different priority drivers',
  ],

  // =============================================================================
  // SECTION FIELDS
  // =============================================================================

  fields: {
    id: {
      name: 'id',
      label: 'ID',
      graphql: {
        type: GRAPHQL_TYPES.ID,
        required: true,
      },
      zod: z.string(),
      metadata: {
        description: 'Unique identifier for the priority drivers section',
        businessPurpose: 'Enables unique identification and referencing',
        questionItAnswers: ["What is the id of the 'priority drivers' section in the database?"],
        validationRules: ['Must be a valid string'],
      },
    },

    sectionCreatedOn: {
      name: 'sectionCreatedOn',
      label: 'Section Created On',
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false,
      },
      zod: z.date().optional(),
      metadata: {
        description: 'Timestamp when the priority drivers section was created',
        businessPurpose: 'Provides audit trail and creation tracking',
        questionItAnswers: ["What is the created on date of the 'priority drivers' section?"],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-01T00:00:00Z'],
      },
    },

    sectionLastUpdatedOn: {
      name: 'sectionLastUpdatedOn',
      label: 'Section Last Updated On',
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false,
      },
      zod: z.date().optional(),
      metadata: {
        description: 'Timestamp when the priority drivers section was last updated',
        businessPurpose: 'Enables change tracking and freshness monitoring',
        questionItAnswers: ["What is the last updated on date of the 'priority drivers' section?"],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T14:30:00Z'],
      },
    },

    priorityDrivers: {
      name: 'priorityDrivers',
      label: 'Priority Drivers',
      graphql: {
        type: '[PriorityDriver!]!',
        required: true,
      },
      zod: z.array(PriorityDriverEnum).min(1),
      metadata: {
        description: 'Array of priority driver codes that justify the importance of this work',
        businessPurpose: 'Provides business context and justification for resource allocation decisions',
        questionItAnswers: [
          'What are the priority drivers of the task/plan?',
          'Why is this task/plan important?',
          'What is the priority context of the task/plan?',
        ],
        validationRules: [
          'Must contain at least one priority driver',
          'All values must be valid PriorityDriver enum values',
        ],
        examples: [
          ['CBP_SLA_BREACH', 'SEC_CRITICAL_VULNERABILITY'],
          ['UX_NOTICEABLE_FRICTION', 'TEC_DEV_PRODUCTIVITY_ENHANCEMENT'],
        ],
      },
    },

    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_1_MetaGovernance_',
        required: true,
      },
      zod: z.string(),
      metadata: {
        description: 'Reference to the parent family',
        businessPurpose: 'Establishes the relationship between section and family',
        questionItAnswers: ["What is the family of the 'priority drivers' section?"],
        validationRules: ['Must be a valid family reference'],
      },
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_1_2_PriorityDrivers_Type = typeof section_1_2_priority_drivers;
