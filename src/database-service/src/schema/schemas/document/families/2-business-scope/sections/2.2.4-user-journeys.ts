/**
 * Section 2.2.4: User Journeys
 *
 * This file contains the complete data object for the User Journeys section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section defines user journeys with personas, descriptions, and diagrams.
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

export const SECTION_2_2_4_USER_JOURNEYS = '2.2.4' as const;
export const SECTION_NAME = 'user journeys' as const;

// =============================================================================
// DATA TYPE DEFINITIONS
// =============================================================================

// User Journey data type - used within this section
export const UserJourneySchema = z.object({
  persona: UserPersonaSchema,
  description: z.string().min(1),
  diagram: z.string().min(1), // Mermaid diagram content
});

export type UserJourney = z.infer<typeof UserJourneySchema>;

export const section_2_2_4_user_journeys = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_2_2_4_USER_JOURNEYS,
  name: 'User Journeys',
  description: 'User journeys with personas, descriptions, and diagrams',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_2_2_4_UserJourney_',

  // Section-level metadata
  businessPurpose: 'Defines complete user journeys with personas, descriptions, and visual diagrams',

  questionsItAnswers: [
    'What are the user journeys for this task/plan/project/module/feature?',
    'What are the complete user paths and interactions?',
    'How do users navigate through the system?',
    'What diagrams illustrate the user journeys?',
  ],

  validationRules: [
    'Must have at least one user journey',
    'Each journey must have a persona, description, and diagram',
    'Diagrams should be valid Mermaid syntax',
  ],

  usageGuidelines: [
    'Should be defined early in the planning process',
    'Must be specific to the work being done',
    'Should provide complete end-to-end user paths',
    'Diagrams should be clear and understandable',
  ],

  examples: [
    {
      context: 'Logging system for document processing pipeline',
      data: {
        userJourneys: [
          {
            persona: {
              name: 'Data Analyst',
              goal: 'Supervise the processing of documents from selection to completion',
            },
            description:
              'This journey describes the end-to-end path for a data analyst supervising the processing of a single document from selection to completion.',
            diagram:
              'graph TD\n    A[Start] --> B[Selects Document]\n    B --> C[Completes Pipeline]\n    C --> D[End]',
          },
          {
            persona: {
              name: 'DevOps Engineer',
              goal: 'Monitor system health and diagnose infrastructure issues',
            },
            description:
              'This journey describes how a DevOps engineer interacts with the system outputs to monitor for errors and performance issues.',
            diagram:
              'sequenceDiagram\n    participant Pipeline\n    participant Logger\n    participant DevOps\n    Pipeline-->>Logger: Log "Processing Failed" (ERROR)\n    DevOps->>Logger: Views and analyzes error',
          },
        ],
      },
    },
    {
      context: 'User authentication system',
      data: {
        userJourneys: [
          {
            persona: {
              name: 'End User',
              goal: 'Access the application securely using existing corporate credentials',
            },
            description:
              'This journey describes how an end user logs into the application using their corporate SSO credentials.',
            diagram:
              'graph TD\n    A[User visits app] --> B[Click Login]\n    B --> C[Redirected to SSO]\n    C --> D[Enter corporate credentials]\n    D --> E[Authenticated]\n    E --> F[Access granted]',
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help craft clear, complete user journeys',
    'Ensure journeys cover end-to-end user paths',
    'Suggest appropriate Mermaid diagrams for visualization',
    'Help identify missing user journey steps or interactions',
  ],

  // =============================================================================
  // FIELD DEFINITIONS
  // =============================================================================

  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),

    userJourneys: {
      name: 'userJourneys',
      label: 'User Journeys',
      graphql: {
        type: '[_SectionData_UserJourney_!]!',
        required: true,
      },
      zod: z.array(UserJourneySchema).min(1),
      metadata: {
        description: 'Array of user journeys with personas, descriptions, and diagrams',
        businessPurpose: 'Defines complete user journeys with personas, descriptions, and visual diagrams',
        questionsItAnswers: [
          'What are the user journeys for this work?',
          'What are the complete user paths and interactions?',
          'How do users navigate through the system?',
        ],
        validationRules: [
          'Must contain at least one user journey',
          'Each journey must have a persona, description, and diagram',
          'Diagrams should be valid Mermaid syntax',
        ],
        examples: [
          [
            {
              persona: {
                name: 'Data Analyst',
                goal: 'Supervise the processing of documents from selection to completion',
              },
              description:
                'This journey describes the end-to-end path for a data analyst supervising the processing of a single document from selection to completion.',
              diagram:
                'graph TD\n    A[Start] --> B[Selects Document]\n    B --> C[Completes Pipeline]\n    C --> D[End]',
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

export type Section_2_2_4_UserJourneys_Type = typeof section_2_2_4_user_journeys;
