/**
 * Section 2.2.3: User Stories
 *
 * This file contains the complete data object for the User Stories section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section defines user-centric stories that describe functionality
 * from the end-user's perspective.
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

export const SECTION_2_2_3_USER_STORIES = '2.2.3' as const;
export const SECTION_NAME = 'user stories' as const;

// =============================================================================
// DATA TYPE DEFINITIONS
// =============================================================================

// User Story data type - used within this section
export const UserStorySchema = z.object({
  persona: UserPersonaSchema,
  action: z.string().min(1),
  goal: z.string().min(1),
});

export type UserStory = z.infer<typeof UserStorySchema>;

export const section_2_2_3_user_stories = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_2_2_3_USER_STORIES,
  name: 'User Stories',
  description: 'User-centric stories that describe functionality from the end-user perspective',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_2_2_3_UserStory_',

  // Section-level metadata
  businessPurpose: 'Defines user-centric goals and workflows relevant to the work scope',

  questionsItAnswers: [
    'What are the user stories for this task/plan/project/module/feature?',
    'What actions do users want to perform?',
    'What goals do users want to achieve?',
    'Who are the personas involved in these stories?',
  ],

  validationRules: [
    'Must have at least one user story',
    'Each story must have a persona, action, and goal',
    'Stories should follow the format: "As a [persona], I want [action], so that I can [goal]"',
  ],

  usageGuidelines: [
    'Should be defined early in the planning process',
    'Must be specific to the work being done',
    'Should focus on user-centric goals and workflows',
    'Stories should be testable and measurable',
  ],

  examples: [
    {
      context: 'Logging system for document processing pipeline',
      data: {
        userStories: [
          {
            persona: {
              name: 'DevOps Engineer',
              goal: 'Monitor system health and diagnose infrastructure issues',
            },
            action: 'receive a real-time alert when a critical error occurs',
            goal: 'immediately begin troubleshooting',
          },
          {
            persona: {
              name: 'Support Analyst',
              goal: 'Triage user-reported errors and identify root cause',
            },
            action: 'filter logs by user ID',
            goal: 'quickly investigate user-reported issues',
          },
        ],
      },
    },
    {
      context: 'User authentication system',
      data: {
        userStories: [
          {
            persona: {
              name: 'End User',
              goal: 'Access the application securely using existing corporate credentials',
            },
            action: 'log in using my corporate SSO credentials',
            goal: 'access the application without creating a new account',
          },
          {
            persona: {
              name: 'Enterprise IT Administrator',
              goal: 'Configure and manage user access through corporate identity providers',
            },
            action: 'configure SAML integration with our identity provider',
            goal: 'enable single sign-on for all corporate users',
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help craft clear, user-focused stories',
    'Ensure stories follow the standard format',
    'Suggest additional user stories that might be relevant',
    'Help identify missing personas or use cases',
  ],

  // =============================================================================
  // FIELD DEFINITIONS
  // =============================================================================

  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),

    userStories: {
      name: 'userStories',
      label: 'User Stories',
      graphql: {
        type: '[_SectionData_UserStory_!]!',
        required: true,
      },
      zod: z.array(UserStorySchema).min(1),
      metadata: {
        description: 'Array of user-centric stories that describe functionality from the end-user perspective',
        businessPurpose: 'Defines user-centric goals and workflows relevant to the work scope',
        questionsItAnswers: [
          'What are the user stories for this work?',
          'What actions do users want to perform?',
          'What goals do users want to achieve?',
        ],
        validationRules: [
          'Must contain at least one user story',
          'Each story must have a persona, action, and goal',
          'Stories should follow the standard format',
        ],
        examples: [
          [
            {
              persona: {
                name: 'DevOps Engineer',
                goal: 'Monitor system health and diagnose infrastructure issues',
              },
              action: 'receive a real-time alert when a critical error occurs',
              goal: 'immediately begin troubleshooting',
            },
            {
              persona: {
                name: 'Support Analyst',
                goal: 'Triage user-reported errors and identify root cause',
              },
              action: 'filter logs by user ID',
              goal: 'quickly investigate user-reported issues',
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

export type Section_2_2_3_UserStories_Type = typeof section_2_2_3_user_stories;
