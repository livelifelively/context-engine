/**
 * Family 2: Business & Scope
 *
 * This file contains the complete data object for the Business & Scope family,
 * serving as the single source of truth for generating:
 * - GraphQL family interfaces and types
 * - Zod family validation schemas
 * - Rich family metadata and documentation
 *
 * This family provides business context, scope boundaries, and success criteria
 * for all document types across the system.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES, DOCUMENT_TYPES } from '../../constants.js';

// =============================================================================
// FAMILY IDENTIFIER
// =============================================================================

export const FAMILY_2_BUSINESS_SCOPE = '2-business-scope';

export const family_2_business_scope = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: FAMILY_2_BUSINESS_SCOPE,
  name: 'Business & Scope',
  version: '2.0',
  description: 'Business context, scope boundaries, and success criteria for all document types',

  // Document types that support this family
  supportedBy: DOCUMENT_TYPES,

  // Sections that belong to this family
  sections: ['2.1', '2.2', '2.2.1', '2.2.2', '2.2.3', '2.2.4', '2.3', '2.4', '2.5', '2.6'],

  // =============================================================================
  // FAMILY DEFINITION
  // =============================================================================

  // GraphQL family interface name
  interfaceName: '_Family_2_BusinessScope_',

  // Family-level metadata
  businessPurpose: 'Explains why the document exists, who it serves, and what success looks like',

  questionsItAnswers: [
    'Why are we doing this work?',
    'Who are the stakeholders and users?',
    'What are the business rules and constraints?',
    'What defines success for this work?',
    'What is included and excluded from scope?',
    'What are the key business processes involved?',
  ],

  validationRules: [
    'All families must have valid business context',
    'Section relationships must be properly configured',
    'Document relationships must be bidirectional',
  ],

  usageGuidelines: [
    'Business context should be defined early in planning',
    'Scope boundaries should be clearly defined',
    'Success criteria should be measurable',
    'Family metadata should be automatically managed',
  ],

  examples: [
    {
      context: 'Plan with full business context',
      data: {
        overview: {
          coreFunction: 'Implements a robust logging system',
          keyCapability: 'Provides structured, queryable data',
          businessValue: 'Enables proactive issue resolution',
        },
        businessContext: {
          narrative: 'Currently, pipeline failures are opaque, requiring manual inspection',
        },
        successCriteria: [
          'All pipeline stages emit structured logs',
          'Dashboard can ingest and display logs from all stages',
        ],
      },
    },
    {
      context: 'Task with definition of done',
      data: {
        overview: {
          coreFunction: 'Creates validation library for documentation',
          keyCapability: 'Checks content and structure of documentation files',
          businessValue: 'Ensures documentation quality and consistency',
        },
        definitionOfDone: [
          {
            inDocumentId: 'DoD-1',
            description: 'A validation library is available',
            category: 'FUNCTIONALITY',
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help define clear business context and rationale',
    'Identify relevant stakeholders and their goals',
    'Suggest measurable success criteria',
    'Help define clear scope boundaries',
    'Identify key business processes and workflows',
  ],

  // =============================================================================
  // FAMILY FIELDS
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
        description: 'Unique identifier for the family',
        businessPurpose: 'Enables unique identification and referencing',
        questionItAnswers: ["What is the ID of the 'business & scope' family in the database?"],
        validationRules: ['Must be a valid string'],
      },
    },

    familyCreatedOn: {
      name: 'familyCreatedOn',
      label: 'Family Created On',
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false,
      },
      zod: z.date().optional(),
      metadata: {
        description: 'Timestamp when the family was created',
        businessPurpose: 'Provides audit trail and creation tracking',
        questionItAnswers: ["What is the created on date of the 'business & scope' family?"],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-01T00:00:00Z'],
      },
    },

    familyLastUpdatedOn: {
      name: 'familyLastUpdatedOn',
      label: 'Family Last Updated On',
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false,
      },
      zod: z.date().optional(),
      metadata: {
        description: 'Timestamp when the family was last updated',
        businessPurpose: 'Enables change tracking and freshness monitoring',
        questionItAnswers: ["What is the last updated on date of the 'business & scope' family?"],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T14:30:00Z'],
      },
    },

    document: {
      name: 'document',
      label: 'Document',
      graphql: {
        type: '_Document_',
        required: true,
      },
      zod: z.string(),
      metadata: {
        description: 'Reference ID to the parent document in the database',
        businessPurpose: 'Establishes the relationship between family and document',
        questionItAnswers: ["Which document is the 'business & scope' family related to?"],
        validationRules: ['Must be a valid document reference'],
      },
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Family_2_BusinessScope_Type = typeof family_2_business_scope;
