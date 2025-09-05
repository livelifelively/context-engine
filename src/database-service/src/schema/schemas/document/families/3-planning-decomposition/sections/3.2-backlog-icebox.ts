/**
 * Section 3.2: Backlog / Icebox
 *
 * This file contains the complete data object for the Backlog/Icebox section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section defines a list of direct child Plans/Tasks that have been
 * considered but are not scheduled for the current implementation cycle.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';

// =============================================================================
// SECTION IDENTIFIER
// =============================================================================

export const SECTION_3_2_BACKLOG_ICEBOX = '3.2' as const;

// =============================================================================
// DATA TYPE DEFINITIONS
// =============================================================================

// Backlog Item data type - used within this section
export const BacklogItemSchema = z.object({
  name: z.string().min(1), // e.g., "Reporting Plan"
  reason: z.string().min(1), // e.g., "Deferred to Q4 due to dependency on new analytics service."
});

export type BacklogItem = z.infer<typeof BacklogItemSchema>;

export const section_3_2_backlog_icebox = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_3_2_BACKLOG_ICEBOX,
  name: 'Backlog / Icebox',
  description:
    'A list of direct child Plans/Tasks that have been considered but are not scheduled for the current implementation cycle',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_3_2_BacklogIcebox_',

  // Section-level metadata
  businessPurpose:
    'Captures scope decisions by listing considered but de-scoped or deferred child Plans/Tasks to maintain transparency and future planning',

  questionsItAnswers: [
    'What Plans/Tasks were considered but not included in the current cycle?',
    'Why were certain items deferred or de-scoped?',
    'What items are in the backlog for future consideration?',
    'What scope decisions were made?',
  ],

  validationRules: [
    'Must have at least one backlog item for Plans',
    'Each item must have a name and reason',
    'Reasons should be clear and actionable',
  ],

  usageGuidelines: [
    'Should be defined during planning process',
    'Must capture scope decisions transparently',
    'Should include clear reasons for deferral',
    'Keep items organized for future reference',
  ],

  examples: [
    {
      context: 'Authentication system development plan',
      data: {
        backlog: [
          {
            name: 'Advanced Security Features',
            reason: 'Deferred to Q2 due to complexity and current MVP scope requirements',
          },
          {
            name: 'Multi-Factor Authentication',
            reason:
              'Moved to icebox as it is outside the scope of the current MVP and requires additional security review',
          },
          {
            name: 'Social Login Integration',
            reason:
              'Deferred to Q3 due to dependency on third-party service agreements and current focus on core authentication',
          },
        ],
      },
    },
    {
      context: 'User management system',
      data: {
        backlog: [
          {
            name: 'Advanced User Analytics',
            reason: 'Deferred to Q4 due to dependency on new analytics service that is not yet available',
          },
          {
            name: 'Real-time Collaboration Features',
            reason:
              'Moved to icebox as it is outside the scope of the current MVP and requires significant infrastructure changes',
          },
          {
            name: 'User Role Management',
            reason: 'Deferred to Q2 due to complexity and need for additional business requirements gathering',
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help identify items that should be deferred or de-scoped',
    'Suggest clear and actionable reasons for backlog items',
    'Help organize backlog items by priority and timeline',
    'Ensure scope decisions are well-documented',
  ],

  // =============================================================================
  // FIELD DEFINITIONS
  // =============================================================================

  fields: {
    id: {
      name: 'id',
      label: 'ID',
      graphql: {
        type: GRAPHQL_TYPES.ID,
        required: true,
      },
      zod: z.string().optional(),
      metadata: {
        description: 'Unique identifier for the backlog/icebox section',
        businessPurpose: 'Enables unique identification and referencing',
        questionsItAnswers: ['What is the id of the backlog/icebox section in the database?'],
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
        description: 'Timestamp when the backlog/icebox section was created',
        businessPurpose: 'Provides audit trail and creation tracking',
        questionsItAnswers: ['What is the created on date of the backlog/icebox section?'],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T09:00:00Z'],
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
        description: 'Timestamp when the backlog/icebox section was last updated',
        businessPurpose: 'Enables change tracking and freshness monitoring',
        questionsItAnswers: ['What is the last updated on date of the backlog/icebox section?'],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T14:30:00Z'],
      },
    },

    backlog: {
      name: 'backlog',
      label: 'Backlog',
      graphql: {
        type: '[_SectionData_BacklogItem_!]!',
        required: true,
      },
      zod: z.array(BacklogItemSchema).min(1),
      metadata: {
        description:
          'Array of direct child Plans/Tasks that have been considered but are not scheduled for the current implementation cycle',
        businessPurpose:
          'Captures scope decisions by listing considered but de-scoped or deferred child Plans/Tasks to maintain transparency and future planning',
        questionsItAnswers: [
          'What Plans/Tasks were considered but not included in the current cycle?',
          'Why were certain items deferred or de-scoped?',
          'What items are in the backlog for future consideration?',
        ],
        validationRules: [
          'Must contain at least one backlog item for Plans',
          'Each item must have a name and reason',
          'Reasons should be clear and actionable',
        ],
        examples: [
          [
            {
              name: 'Advanced Security Features',
              reason: 'Deferred to Q2 due to complexity and current MVP scope requirements',
            },
            {
              name: 'Multi-Factor Authentication',
              reason:
                'Moved to icebox as it is outside the scope of the current MVP and requires additional security review',
            },
          ],
        ],
      },
    },

    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_3_PlanningDecomposition_',
        required: true,
      },
      zod: z.string(),
      metadata: {
        description: 'Reference to the parent family',
        businessPurpose: 'Establishes the relationship between section and family',
        questionsItAnswers: ['What is the family of the backlog/icebox section?'],
        validationRules: ['Must be a valid family reference'],
      },
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_3_2_BacklogIcebox_Type = typeof section_3_2_backlog_icebox;
