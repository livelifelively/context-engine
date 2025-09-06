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
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// =============================================================================
// SECTION IDENTIFIER
// =============================================================================

export const SECTION_2_2_BUSINESS_CONTEXT = '2.2' as const;
export const SECTION_NAME = 'business context' as const;

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
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),

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

    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_2_BUSINESS_SCOPE, SECTION_NAME),
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_2_2_BusinessContext_Type = typeof section_2_2_business_context;
