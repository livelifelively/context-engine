/**
 * Section 2.1: Overview
 *
 * This file contains the complete data object for the Overview section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section provides core function, key capability, and business value
 * for all document types in the Business & Scope family.
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

export const SECTION_2_1_OVERVIEW = '2.1' as const;
export const SECTION_NAME = 'overview' as const;

export const section_2_1_overview = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_2_1_OVERVIEW,
  name: 'Overview',
  description: 'Core function, key capability, and business value definition',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_2_1_Overview_',

  // Section-level metadata
  businessPurpose: 'Provides a concise summary of what the artifact delivers and why it matters',

  questionsItAnswers: [
    'What is the core function this task/plan/project/module/feature serves?',
    'What key capability does this task/plan/project/module/feature provide?',
    'What is the business value of this task/plan/project/module/feature?',
  ],

  validationRules: [
    'Must follow markdown format',
    'All three fields are required',
    'Content should be concise and clear',
  ],

  usageGuidelines: [
    'Should be written early in the planning process',
    'Must be understandable by non-technical stakeholders',
    'Should focus on business value and outcomes',
    'Should not have any technical implementation details',
  ],

  examples: [
    {
      context: 'Logging system implementation for a document processing pipeline',
      data: {
        coreFunction: 'Implements a robust, multi-level logging system for the document processing pipeline',
        keyCapability:
          'Ensures both operational errors and business events are captured, categorized, and routed to monitoring tools',
        businessValue: 'Enables proactive issue resolution and performance analysis',
      },
    },
    {
      context: 'User authentication feature for an application',
      data: {
        coreFunction: 'Provides secure user authentication and authorization for the application',
        keyCapability: 'Supports multiple authentication methods including OAuth, SAML, and local credentials',
        businessValue: 'Ensures data security and enables enterprise customer adoption',
      },
    },
  ],

  aiInstructions: [
    'Help craft clear, business-focused descriptions',
    'Ensure all three components (function, capability, value) are present',
    'Suggest improvements for clarity and business impact',
  ],

  // =============================================================================
  // FIELD DEFINITIONS
  // =============================================================================

  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),

    coreFunction: {
      name: 'coreFunction',
      label: 'Core Function',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'A concise description of what this artifact delivers',
        businessPurpose: 'Provides clear understanding of the primary deliverable',
        questionsItAnswers: ['What is the core function of this work?'],
        validationRules: ['Must be a non-empty string'],
        examples: [
          'Implements a robust, multi-level logging system for the document processing pipeline',
          'Provides secure user authentication and authorization for the application',
        ],
      },
    },

    keyCapability: {
      name: 'keyCapability',
      label: 'Key Capability',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'The primary capability or functionality this work provides',
        businessPurpose: 'Defines the specific technical or business capability delivered',
        questionsItAnswers: ['What key capability does this provide?'],
        validationRules: ['Must be a non-empty string'],
        examples: [
          'Ensures both operational errors and business events are captured, categorized, and routed to monitoring tools',
          'Supports multiple authentication methods including OAuth, SAML, and local credentials',
        ],
      },
    },

    businessValue: {
      name: 'businessValue',
      label: 'Business Value',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'The business value or benefit this work provides',
        businessPurpose: 'Justifies the work from a business perspective',
        questionsItAnswers: ['What is the business value of this work?'],
        validationRules: ['Must be a non-empty string'],
        examples: [
          'Enables proactive issue resolution and performance analysis',
          'Ensures data security and enables enterprise customer adoption',
        ],
      },
    },

    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_2_BUSINESS_SCOPE, SECTION_NAME),
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_2_1_Overview_Type = typeof section_2_1_overview;
