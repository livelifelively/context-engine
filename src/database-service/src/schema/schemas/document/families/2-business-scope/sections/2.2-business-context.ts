/**
 * Section 2.2: Business Context
 *
 * This file contains the complete data object for the Business Context section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section provides the narrative and domain-specific details behind the work.
 * If no additional context beyond the parent level is needed, this section can
 * contain "None (inherits from parent)".
 */

import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';

// =============================================================================
// SECTION IDENTIFIER
// =============================================================================

export const SECTION_2_2_BUSINESS_CONTEXT = '2.2' as const;

export const section_2_2_business_context = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_2_2_BUSINESS_CONTEXT,
  name: 'Business Context',
  description: 'Business narrative and domain-specific details behind the work',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_2_2_BusinessContext_',

  // Section-level metadata
  businessPurpose:
    'Provides the narrative and domain-specific details behind the work, explaining the business context and rationale',

  questionsItAnswers: [
    'What is the business context of this task/plan/project/module/feature?',
    'What domain-specific details are relevant to this work?',
    'What is the narrative behind why this work is needed?',
  ],

  validationRules: [
    'Must follow markdown format',
    'Can contain "None (inherits from parent)" if no additional context is needed',
    'Should be written in narrative form',
  ],

  usageGuidelines: [
    'Should provide strategic context for the work',
    'Must be understandable by business stakeholders',
    'Should explain the "why" behind the work',
    'Can reference parent-level context if no additional details are needed',
  ],

  examples: [
    {
      context: 'Logging system for document processing pipeline',
      data: {
        narrative:
          'Currently, pipeline failures are opaque, requiring developers to manually inspect logs, which slows down resolution time. This new logging system will provide structured, queryable data to our analytics dashboard, allowing support staff to diagnose issues without engineering intervention.',
      },
    },
    {
      context: 'User authentication system',
      data: {
        narrative:
          'As we expand to enterprise customers, we need to support their existing identity providers and security requirements. This authentication system will enable seamless integration with corporate directories while maintaining our security standards.',
      },
    },
    {
      context: 'Feature with inherited context',
      data: {
        narrative: 'None (inherits from parent)',
      },
    },
  ],

  aiInstructions: [
    'Help craft clear, business-focused narratives',
    'Ensure the context explains the business rationale',
    'Suggest when to use "None (inherits from parent)"',
    'Help identify missing business context that should be included',
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
        description: 'Unique identifier for the business context section',
        businessPurpose: 'Enables unique identification and referencing',
        questionsItAnswers: ['What is the id of the business context section in the database?'],
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
        description: 'Timestamp when the business context section was created',
        businessPurpose: 'Provides audit trail and creation tracking',
        questionsItAnswers: ['What is the created on date of the business context section?'],
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
        description: 'Timestamp when the business context section was last updated',
        businessPurpose: 'Enables change tracking and freshness monitoring',
        questionsItAnswers: ['What is the last updated on date of the business context section?'],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T14:30:00Z'],
      },
    },

    narrative: {
      name: 'narrative',
      label: 'Narrative',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Business context narrative explaining the domain-specific details and rationale',
        businessPurpose: 'Provides strategic context and business rationale for the work',
        questionsItAnswers: [
          'What is the business context of this work?',
          'What domain-specific details are relevant?',
          'What is the narrative behind why this work is needed?',
        ],
        validationRules: ['Must be a non-empty string'],
        examples: [
          'Currently, pipeline failures are opaque, requiring developers to manually inspect logs, which slows down resolution time. This new logging system will provide structured, queryable data to our analytics dashboard, allowing support staff to diagnose issues without engineering intervention.',
          'As we expand to enterprise customers, we need to support their existing identity providers and security requirements. This authentication system will enable seamless integration with corporate directories while maintaining our security standards.',
          'None (inherits from parent)',
        ],
      },
    },

    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_2_BusinessScope_',
        required: true,
      },
      zod: z.string(),
      metadata: {
        description: 'Reference to the parent family',
        businessPurpose: 'Establishes the relationship between section and family',
        questionsItAnswers: ['What is the family of the business context section?'],
        validationRules: ['Must be a valid family reference'],
      },
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_2_2_BusinessContext_Type = typeof section_2_2_business_context;
