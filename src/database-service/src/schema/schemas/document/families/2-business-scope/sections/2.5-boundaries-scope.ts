/**
 * Section 2.5: Boundaries and Scope
 *
 * This file contains the complete data object for the Boundaries and Scope section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section defines explicit boundaries of the work, including what is
 * included and excluded from the scope.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';
import { ScopeItemSchema, type ScopeItem } from '../shared-data-types.js';

// =============================================================================
// SECTION IDENTIFIER
// =============================================================================

export const SECTION_2_5_BOUNDARIES_AND_SCOPE = '2.5' as const;

export const section_2_5_boundaries_scope = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_2_5_BOUNDARIES_AND_SCOPE,
  name: 'Boundaries and Scope',
  description: 'Explicit definition of the work boundaries, including in-scope and out-of-scope items',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_2_5_BoundariesAndScope_',

  // Section-level metadata
  businessPurpose:
    'Defines clear boundaries of what is included and excluded from the work scope to manage expectations and prevent misunderstandings',

  questionsItAnswers: [
    'What is included in the scope of this task/plan/project/module/feature?',
    'What is explicitly excluded from the scope?',
    'What are the boundaries of this work?',
    'What items were considered but deliberately deferred?',
  ],

  validationRules: [
    'Must have at least one in-scope item',
    'Should have out-of-scope items to manage expectations',
    'Each scope item must have a description and category',
    'Categories must be valid enum values',
  ],

  usageGuidelines: [
    'Should be defined early in the planning process',
    'Must be specific and clear about boundaries',
    'Should include items that were considered but deferred',
    'Categories help organize and understand scope items',
  ],

  examples: [
    {
      context: 'Document processing pipeline',
      data: {
        inScope: [
          {
            description: 'Processing of Lok Sabha Q&A documents in PDF format',
            category: 'FUNCTIONALITY',
          },
          {
            description: 'Manual verification and correction workflows for all pipeline steps',
            category: 'FUNCTIONALITY',
          },
          {
            description: 'Generation of a document-level knowledge graph',
            category: 'OUTCOME',
          },
        ],
        outOfScope: [
          {
            description: 'Real-time document processing capabilities',
            category: 'FUNCTIONALITY',
          },
          {
            description: 'Processing documents in formats other than PDF',
            category: 'FUNCTIONALITY',
          },
          {
            description: 'Advanced user management and role-based access control',
            category: 'FEATURE',
          },
        ],
      },
    },
    {
      context: 'User authentication system',
      data: {
        inScope: [
          {
            description: 'SAML and OAuth 2.0 authentication integration',
            category: 'FUNCTIONALITY',
          },
          {
            description: 'Session management and timeout handling',
            category: 'FUNCTIONALITY',
          },
          {
            description: 'Integration with corporate identity providers',
            category: 'INTEGRATION',
          },
        ],
        outOfScope: [
          {
            description: 'Multi-factor authentication (MFA) implementation',
            category: 'FUNCTIONALITY',
          },
          {
            description: 'Password reset and account recovery features',
            category: 'FUNCTIONALITY',
          },
          {
            description: 'Advanced user profile management',
            category: 'FEATURE',
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help define clear scope boundaries',
    'Ensure both in-scope and out-of-scope items are included',
    'Suggest appropriate categories for scope items',
    'Help identify items that should be explicitly excluded',
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
        description: 'Unique identifier for the boundaries and scope section',
        businessPurpose: 'Enables unique identification and referencing',
        questionsItAnswers: ['What is the id of the boundaries & scope section in the database?'],
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
        description: 'Timestamp when the boundaries and scope section was created',
        businessPurpose: 'Provides audit trail and creation tracking',
        questionsItAnswers: ['What is the created on date of the boundaries & scope section?'],
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
        description: 'Timestamp when the boundaries and scope section was last updated',
        businessPurpose: 'Enables change tracking and freshness monitoring',
        questionsItAnswers: ['What is the last updated on date of the boundaries & scope section?'],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T14:30:00Z'],
      },
    },

    inScope: {
      name: 'inScope',
      label: 'In Scope',
      graphql: {
        type: '[_SectionData_Scope_Item_!]!',
        required: true,
      },
      zod: z.array(ScopeItemSchema).min(1),
      metadata: {
        description: 'Array of items that are explicitly included in the scope of the work',
        businessPurpose: 'Defines what is included in the work scope to set clear expectations',
        questionsItAnswers: [
          'What is included in the scope of this work?',
          'What functionalities, features, or outcomes are explicitly included?',
        ],
        validationRules: [
          'Must contain at least one in-scope item',
          'Each item must have a description and category',
          'Categories must be valid enum values',
        ],
        examples: [
          [
            {
              description: 'Processing of Lok Sabha Q&A documents in PDF format',
              category: 'FUNCTIONALITY',
            },
            {
              description: 'Manual verification and correction workflows for all pipeline steps',
              category: 'FUNCTIONALITY',
            },
          ],
        ],
      },
    },

    outOfScope: {
      name: 'outOfScope',
      label: 'Out of Scope',
      graphql: {
        type: '[_SectionData_Scope_Item_!]!',
        required: true,
      },
      zod: z.array(ScopeItemSchema).min(1),
      metadata: {
        description: 'Array of items that are explicitly excluded from the scope of the work',
        businessPurpose:
          'Defines what is excluded from the work scope to manage expectations and prevent misunderstandings',
        questionsItAnswers: [
          'What is explicitly excluded from the scope of this work?',
          'What functionalities, features, or outcomes are deliberately deferred?',
        ],
        validationRules: [
          'Should contain out-of-scope items to manage expectations',
          'Each item must have a description and category',
          'Categories must be valid enum values',
        ],
        examples: [
          [
            {
              description: 'Real-time document processing capabilities',
              category: 'FUNCTIONALITY',
            },
            {
              description: 'Processing documents in formats other than PDF',
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
        questionsItAnswers: ['What is the family of the boundaries and scope section?'],
        validationRules: ['Must be a valid family reference'],
      },
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_2_5_BoundariesScope_Type = typeof section_2_5_boundaries_scope;
