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

import { DOCUMENT_TYPES } from '../../constants.js';
import {
  createFamilyIdField,
  createFamilyCreatedOnField,
  createFamilyLastUpdatedOnField,
  createDocumentReferenceField,
} from '../../field-factories.js';

// =============================================================================
// FAMILY IDENTIFIER
// =============================================================================

export const FAMILY_2_BUSINESS_SCOPE = '2-business-scope';
export const FAMILY_NAME = 'business & scope' as const;

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
    id: createFamilyIdField(FAMILY_NAME),

    familyCreatedOn: createFamilyCreatedOnField(FAMILY_NAME),

    familyLastUpdatedOn: createFamilyLastUpdatedOnField(FAMILY_NAME),

    document: createDocumentReferenceField(FAMILY_NAME),
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Family_2_BusinessScope_Type = typeof family_2_business_scope;
