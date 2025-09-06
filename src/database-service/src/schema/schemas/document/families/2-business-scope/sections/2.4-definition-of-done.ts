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

import { DoneCriterionSchema } from '../shared-data-types.js';
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

export const SECTION_2_4_DEFINITION_OF_DONE = '2.4' as const;
export const SECTION_NAME = 'definition of done' as const;

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
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),

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

    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_2_BUSINESS_SCOPE, SECTION_NAME),
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_2_4_DefinitionOfDone_Type = typeof section_2_4_definition_of_done;
