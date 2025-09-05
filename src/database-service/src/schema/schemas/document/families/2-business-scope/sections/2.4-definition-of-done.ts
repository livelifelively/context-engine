/**
 * Section 2.4: Definition of Done
 *
 * This file contains the complete data object for the Definition of Done section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section defines high-level, non-technical criteria that define when
 * the task is complete from a business perspective.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';
import { DoneCriterionSchema, type DoneCriterion } from '../shared-data-types.js';

// =============================================================================
// SECTION IDENTIFIER
// =============================================================================

export const SECTION_2_4_DEFINITION_OF_DONE = '2.4' as const;

export const section_2_4_definition_of_done = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_2_4_DEFINITION_OF_DONE,
  name: 'Definition of Done',
  description: 'High-level, non-technical criteria that define when the task is complete from a business perspective',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_2_4_DefinitionOfDone_',

  // Section-level metadata
  businessPurpose:
    'Defines the business criteria that must be met for task completion, understandable by non-technical stakeholders',

  questionsItAnswers: [
    'What are the definition of done criteria for this task?',
    'What must be completed for this task to be considered done?',
    'What are the business acceptance criteria?',
    'What categories do the done criteria fall into?',
  ],

  validationRules: [
    'Must have at least one done criterion',
    'Each criterion must have a description and category',
    'Categories must be valid enum values',
    'Should be understandable by non-technical stakeholders',
  ],

  usageGuidelines: [
    'Should be defined early in the planning process',
    'Must be specific to the task being done',
    'Should focus on business outcomes, not technical implementation',
    'Categories help organize and understand criterion types',
  ],

  examples: [
    {
      context: 'Validation library for documentation files',
      data: {
        criteria: [
          {
            inDocumentId: 'DoD-1',
            description: 'A validation library is available that can check the content of documentation files',
            category: 'FUNCTIONALITY',
          },
          {
            inDocumentId: 'DoD-2',
            description:
              "The library correctly identifies when a document's 'Status' or 'Priority' section has missing or malformed information",
            category: 'FUNCTIONALITY',
          },
          {
            inDocumentId: 'DoD-3',
            description:
              "The library can validate the structure of all tables, such as 'Dependencies', ensuring they have the right columns",
            category: 'FUNCTIONALITY',
          },
          {
            inDocumentId: 'DoD-4',
            description:
              'The library successfully flags documents that contain structural errors and confirms that valid documents pass without errors',
            category: 'TESTING',
          },
          {
            inDocumentId: 'DoD-5',
            description:
              'The validation logic for each of the 8 documentation families is organized separately for maintainability',
            category: 'QUALITY',
          },
        ],
      },
    },
    {
      context: 'User authentication feature',
      data: {
        criteria: [
          {
            inDocumentId: 'DoD-1',
            description: 'Users can successfully log in using corporate SSO credentials',
            category: 'FUNCTIONALITY',
          },
          {
            inDocumentId: 'DoD-2',
            description: 'Authentication system integrates with SAML and OAuth 2.0 providers',
            category: 'FUNCTIONALITY',
          },
          {
            inDocumentId: 'DoD-3',
            description: 'All authentication flows are covered by automated tests',
            category: 'TESTING',
          },
          {
            inDocumentId: 'DoD-4',
            description: 'Security documentation is updated with authentication requirements',
            category: 'DOCUMENTATION',
          },
          {
            inDocumentId: 'DoD-5',
            description: 'Authentication system is deployed to production environment',
            category: 'DEPLOYMENT',
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help craft clear, business-focused done criteria',
    'Ensure criteria are understandable by non-technical stakeholders',
    'Suggest appropriate categories for criteria',
    'Help identify missing done criteria',
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
        description: 'Unique identifier for the definition of done section',
        businessPurpose: 'Enables unique identification and referencing',
        questionsItAnswers: ['What is the id of the definition of done section in the database?'],
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
        description: 'Timestamp when the definition of done section was created',
        businessPurpose: 'Provides audit trail and creation tracking',
        questionsItAnswers: ['What is the created on date of the definition of done section?'],
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
        description: 'Timestamp when the definition of done section was last updated',
        businessPurpose: 'Enables change tracking and freshness monitoring',
        questionsItAnswers: ['What is the last updated on date of the definition of done section?'],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T14:30:00Z'],
      },
    },

    criteria: {
      name: 'criteria',
      label: 'Criteria',
      graphql: {
        type: '[_SectionData_DoneCriterion_!]!',
        required: true,
      },
      zod: z.array(DoneCriterionSchema).min(1),
      metadata: {
        description: 'Array of done criteria that define when the task is complete from a business perspective',
        businessPurpose:
          'Defines the business criteria that must be met for task completion, understandable by non-technical stakeholders',
        questionsItAnswers: [
          'What are the definition of done criteria for this task?',
          'What must be completed for this task to be considered done?',
          'What are the business acceptance criteria?',
        ],
        validationRules: [
          'Must contain at least one done criterion',
          'Each criterion must have a description and category',
          'Categories must be valid enum values',
        ],
        examples: [
          [
            {
              inDocumentId: 'DoD-1',
              description: 'A validation library is available that can check the content of documentation files',
              category: 'FUNCTIONALITY',
            },
            {
              inDocumentId: 'DoD-2',
              description: 'The library correctly identifies when a document has missing or malformed information',
              category: 'FUNCTIONALITY',
            },
          ],
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
        questionsItAnswers: ['What is the family of the definition of done section?'],
        validationRules: ['Must be a valid family reference'],
      },
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_2_4_DefinitionOfDone_Type = typeof section_2_4_definition_of_done;
