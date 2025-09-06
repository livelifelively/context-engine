/**
 * Section 2.2.1: User Personas
 *
 * This file contains the complete data object for the User Personas section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section defines the personas involved in the work, including their
 * goals and roles in the business context.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import { UserPersonaSchema, type UserPersona } from '../shared-data-types.js';
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

export const SECTION_2_2_1_USER_PERSONAS = '2.2.1' as const;
export const SECTION_NAME = 'user personas' as const;

export const section_2_2_1_user_personas = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_2_2_1_USER_PERSONAS,
  name: 'User Personas',
  description: 'Table or list of personas involved in the work',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_2_2_1_UserPersona_',

  // Section-level metadata
  businessPurpose: 'Defines the key personas involved in the work and their specific goals',

  questionsItAnswers: [
    'What are the user personas involved in this task/plan/project/module/feature?',
    'What are the goals of each persona?',
    'Who are the key stakeholders for this work?',
  ],

  validationRules: [
    'Must have at least one persona',
    'Each persona must have a name and goal',
    'Persona names should be descriptive and specific',
  ],

  usageGuidelines: [
    'Should be defined early in the planning process',
    'Must be specific to the work being done',
    'Should focus on personas who directly interact with or benefit from the work',
    'Goals should be clear and measurable',
  ],

  examples: [
    {
      context: 'Logging system for document processing pipeline',
      data: {
        personas: [
          {
            name: 'DevOps Engineer',
            goal: 'Monitor system health and diagnose infrastructure issues',
          },
          {
            name: 'Support Analyst',
            goal: 'Triage user-reported errors and identify root cause',
          },
        ],
      },
    },
    {
      context: 'User authentication system',
      data: {
        personas: [
          {
            name: 'Enterprise IT Administrator',
            goal: 'Configure and manage user access through corporate identity providers',
          },
          {
            name: 'End User',
            goal: 'Access the application securely using existing corporate credentials',
          },
          {
            name: 'Security Officer',
            goal: 'Ensure compliance with corporate security policies and audit requirements',
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help identify relevant personas for the work',
    'Ensure persona goals are specific and measurable',
    'Suggest additional personas that might be relevant',
    'Help refine persona descriptions for clarity',
  ],

  // =============================================================================
  // FIELD DEFINITIONS
  // =============================================================================

  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),

    personas: {
      name: 'personas',
      label: 'Personas',
      graphql: {
        type: '[_SectionData_UserPersona_!]!',
        required: true,
      },
      zod: z.array(UserPersonaSchema).min(1),
      metadata: {
        description: 'Array of user personas involved in the work',
        businessPurpose: 'Defines the key stakeholders and their goals for the work',
        questionsItAnswers: [
          'What are the user personas involved in this work?',
          'What are the goals of each persona?',
          'Who are the key stakeholders for this work?',
        ],
        validationRules: [
          'Must contain at least one persona',
          'Each persona must have a name and goal',
          'Persona names should be descriptive and specific',
        ],
        examples: [
          [
            {
              name: 'DevOps Engineer',
              goal: 'Monitor system health and diagnose infrastructure issues',
            },
            {
              name: 'Support Analyst',
              goal: 'Triage user-reported errors and identify root cause',
            },
          ],
          [
            {
              name: 'Enterprise IT Administrator',
              goal: 'Configure and manage user access through corporate identity providers',
            },
            {
              name: 'End User',
              goal: 'Access the application securely using existing corporate credentials',
            },
          ],
        ],
      },
    },

    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_2_BUSINESS_SCOPE, SECTION_NAME),
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_2_2_1_UserPersonas_Type = typeof section_2_2_1_user_personas;
