/**
 * Section 2.2.2: Business Rules
 *
 * This file contains the complete data object for the Business Rules section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section defines domain rules and constraints that apply to the work.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';
import { BusinessRuleSchema, type BusinessRule } from '../shared-data-types.js';
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

export const SECTION_2_2_2_BUSINESS_RULES = '2.2.2' as const;
export const SECTION_NAME = 'business rules' as const;

export const section_2_2_2_business_rules = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_2_2_2_BUSINESS_RULES,
  name: 'Business Rules',
  description: 'Domain rules and constraints that apply to the work',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_2_2_2_BusinessRule_',

  // Section-level metadata
  businessPurpose: 'Defines domain rules and constraints that govern the work scope and implementation',

  questionsItAnswers: [
    'What are the business rules that apply to this task/plan/project/module/feature?',
    'What domain constraints must be followed?',
    'What compliance requirements exist?',
    'What are the implementation constraints?',
  ],

  validationRules: [
    'Must have at least one business rule',
    'Each rule must have a description and category',
    'Categories must be valid enum values',
  ],

  usageGuidelines: [
    'Should be defined early in the planning process',
    'Must be specific to the work being done',
    'Should cover domain, compliance, and implementation constraints',
    'Categories help organize and understand rule types',
  ],

  examples: [
    {
      context: 'Logging system for document processing pipeline',
      data: {
        coreBusinessRules: [
          {
            rule: 'All personally identifiable information (PII) must be logged at the DEBUG level or lower',
            category: 'COMPLIANCE_REQUIREMENT',
          },
          {
            rule: 'Any log with a FATAL level must trigger an immediate PagerDuty alert',
            category: 'DOMAIN_RULE',
          },
          {
            rule: 'Log retention period is 90 days for INFO and 1 year for ERROR and above',
            category: 'COMPLIANCE_REQUIREMENT',
          },
        ],
      },
    },
    {
      context: 'User authentication system',
      data: {
        coreBusinessRules: [
          {
            rule: 'All authentication attempts must be logged for security auditing',
            category: 'SECURITY_REQUIREMENT',
          },
          {
            rule: 'Session timeout must not exceed 8 hours for security compliance',
            category: 'SECURITY_REQUIREMENT',
          },
          {
            rule: 'System must support at least 10,000 concurrent users',
            category: 'PERFORMANCE_REQUIREMENT',
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help identify relevant business rules and constraints',
    'Ensure rules are specific and actionable',
    'Suggest appropriate categories for rules',
    'Help identify missing compliance or security requirements',
  ],

  // =============================================================================
  // FIELD DEFINITIONS
  // =============================================================================

  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),

    coreBusinessRules: {
      name: 'coreBusinessRules',
      label: 'Core Business Rules',
      graphql: {
        type: '[_SectionData_BusinessRule_!]!',
        required: true,
      },
      zod: z.array(BusinessRuleSchema).min(1),
      metadata: {
        description: 'Array of business rules and constraints that apply to the work',
        businessPurpose: 'Defines domain rules and constraints that govern the work scope and implementation',
        questionsItAnswers: [
          'What are the business rules that apply to this work?',
          'What domain constraints must be followed?',
          'What compliance requirements exist?',
        ],
        validationRules: [
          'Must contain at least one business rule',
          'Each rule must have a description and category',
          'Categories must be valid enum values',
        ],
        examples: [
          [
            {
              rule: 'All personally identifiable information (PII) must be logged at the DEBUG level or lower',
              category: 'COMPLIANCE_REQUIREMENT',
            },
            {
              rule: 'Any log with a FATAL level must trigger an immediate PagerDuty alert',
              category: 'DOMAIN_RULE',
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

export type Section_2_2_2_BusinessRules_Type = typeof section_2_2_2_business_rules;
