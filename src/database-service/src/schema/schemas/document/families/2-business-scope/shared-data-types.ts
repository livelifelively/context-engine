/**
 * Family 2: Business & Scope - Shared Data Types
 *
 * This file contains shared data types that are used across multiple sections
 * within the Business & Scope family, serving as the single source of truth for:
 * - GraphQL data type schemas
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * These types follow the _SectionData_ naming convention and are referenced
 * by multiple sections within the family.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../constants.js';

// =============================================================================
// SHARED DATA TYPE: USER PERSONA
// =============================================================================

export const UserPersonaSchema = z.object({
  name: z.string().min(1),
  goal: z.string().min(1),
});

export type UserPersona = z.infer<typeof UserPersonaSchema>;

export const userPersonaData = {
  // GraphQL type name
  graphqlTypeName: '_SectionData_UserPersona_',

  // Zod schema
  zod: UserPersonaSchema,

  // Metadata
  description: 'User persona with name and goal',
  businessPurpose: 'Defines a user persona and their specific goal in the business context',
  usedBy: ['2.2.1', '2.2.3', '2.2.4'], // User Personas, User Stories, User Journeys

  // Field definitions
  fields: {
    name: {
      name: 'name',
      label: 'Name',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Name of the user persona',
        businessPurpose: 'Identifies the specific persona',
        examples: ['DevOps Engineer', 'Support Analyst', 'End User'],
      },
    },
    goal: {
      name: 'goal',
      label: 'Goal',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Goal of the user persona',
        businessPurpose: 'Defines what the persona wants to achieve',
        examples: [
          'Monitor system health and diagnose infrastructure issues',
          'Triage user-reported errors and identify root cause',
        ],
      },
    },
  },
} as const;

// =============================================================================
// SHARED DATA TYPE: BUSINESS RULE
// =============================================================================

export const BusinessRuleCategoryEnum = z.enum([
  'DOMAIN_RULE',
  'IMPLEMENTATION_CONSTRAINT',
  'COMPLIANCE_REQUIREMENT',
  'PERFORMANCE_REQUIREMENT',
  'SECURITY_REQUIREMENT',
]);

export type BusinessRuleCategory = z.infer<typeof BusinessRuleCategoryEnum>;

export const BusinessRuleSchema = z.object({
  rule: z.string().min(1),
  category: BusinessRuleCategoryEnum,
});

export type BusinessRule = z.infer<typeof BusinessRuleSchema>;

export const businessRuleData = {
  // GraphQL type name
  graphqlTypeName: '_SectionData_BusinessRule_',

  // Zod schema
  zod: BusinessRuleSchema,

  // Metadata
  description: 'Business rule with category classification',
  businessPurpose: 'Defines domain rules and constraints that apply to the work',
  usedBy: ['2.2.2'], // Business Rules

  // Field definitions
  fields: {
    rule: {
      name: 'rule',
      label: 'Rule',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'The business rule description',
        businessPurpose: 'Defines the specific rule or constraint',
        examples: [
          'All personally identifiable information (PII) must be logged at the DEBUG level or lower',
          'Any log with a FATAL level must trigger an immediate PagerDuty alert',
        ],
      },
    },
    category: {
      name: 'category',
      label: 'Category',
      graphql: {
        type: GRAPHQL_ENUMS.BUSINESS_RULE_CATEGORY,
        required: true,
      },
      zod: BusinessRuleCategoryEnum,
      metadata: {
        description: 'Category classification of the business rule',
        businessPurpose: 'Categorizes the rule for better organization and understanding',
        examples: ['DOMAIN_RULE', 'SECURITY_REQUIREMENT', 'COMPLIANCE_REQUIREMENT'],
      },
    },
  },
} as const;

// =============================================================================
// SHARED DATA TYPE: DONE CRITERION
// =============================================================================

export const DoneCriterionCategoryEnum = z.enum(['FUNCTIONALITY', 'QUALITY', 'DOCUMENTATION', 'TESTING', 'DEPLOYMENT']);

export type DoneCriterionCategory = z.infer<typeof DoneCriterionCategoryEnum>;

export const DoneCriterionSchema = z.object({
  inDocumentId: z.string().optional(), // e.g., "DoD-1"
  description: z.string().min(1),
  category: DoneCriterionCategoryEnum,
});

export type DoneCriterion = z.infer<typeof DoneCriterionSchema>;

export const doneCriterionData = {
  // GraphQL type name
  graphqlTypeName: '_SectionData_DoneCriterion_',

  // Zod schema
  zod: DoneCriterionSchema,

  // Metadata
  description: 'Definition of Done criterion with category classification',
  businessPurpose: 'Defines specific criteria that must be met for work completion',
  usedBy: ['2.4'], // Definition of Done

  // Field definitions
  fields: {
    inDocumentId: {
      name: 'inDocumentId',
      label: 'In Document ID',
      graphql: {
        type: GRAPHQL_TYPES.STRING_OPTIONAL,
        required: false,
      },
      zod: z.string().optional(),
      metadata: {
        description: 'Reference ID within the document (e.g., "DoD-1")',
        businessPurpose: 'Enables referencing criteria within the document',
        examples: ['DoD-1', 'DoD-2', 'DoD-3'],
      },
    },
    description: {
      name: 'description',
      label: 'Description',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of the done criterion',
        businessPurpose: 'Defines what must be completed',
        examples: [
          'A validation library is available that can check the content of documentation files',
          'The library correctly identifies when a document has missing or malformed information',
        ],
      },
    },
    category: {
      name: 'category',
      label: 'Category',
      graphql: {
        type: GRAPHQL_ENUMS.DONE_CRITERION_CATEGORY,
        required: true,
      },
      zod: DoneCriterionCategoryEnum,
      metadata: {
        description: 'Category classification of the done criterion',
        businessPurpose: 'Categorizes the criterion for better organization',
        examples: ['FUNCTIONALITY', 'QUALITY', 'TESTING', 'DOCUMENTATION'],
      },
    },
  },
} as const;

// =============================================================================
// SHARED DATA TYPE: SCOPE ITEM
// =============================================================================

export const ScopeItemCategoryEnum = z.enum(['FUNCTIONALITY', 'FEATURE', 'OUTCOME', 'INTEGRATION', 'DATA']);

export type ScopeItemCategory = z.infer<typeof ScopeItemCategoryEnum>;

export const ScopeItemSchema = z.object({
  description: z.string().min(1),
  category: ScopeItemCategoryEnum,
});

export type ScopeItem = z.infer<typeof ScopeItemSchema>;

export const scopeItemData = {
  // GraphQL type name
  graphqlTypeName: '_SectionData_Scope_Item_',

  // Zod schema
  zod: ScopeItemSchema,

  // Metadata
  description: 'Scope item with category classification',
  businessPurpose: 'Defines items that are included or excluded from scope',
  usedBy: ['2.5'], // Boundaries & Scope

  // Field definitions
  fields: {
    description: {
      name: 'description',
      label: 'Description',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of the scope item',
        businessPurpose: 'Defines what is included or excluded from scope',
        examples: [
          'Processing of Lok Sabha Q&A documents in PDF format',
          'Manual verification and correction workflows for all pipeline steps',
        ],
      },
    },
    category: {
      name: 'category',
      label: 'Category',
      graphql: {
        type: GRAPHQL_ENUMS.SCOPE_ITEM_CATEGORY,
        required: true,
      },
      zod: ScopeItemCategoryEnum,
      metadata: {
        description: 'Category classification of the scope item',
        businessPurpose: 'Categorizes the scope item for better organization',
        examples: ['FUNCTIONALITY', 'FEATURE', 'OUTCOME', 'INTEGRATION'],
      },
    },
  },
} as const;

// =============================================================================
// EXPORT ALL SHARED DATA TYPES
// =============================================================================

export const sharedDataTypes = {
  userPersona: userPersonaData,
  businessRule: businessRuleData,
  doneCriterion: doneCriterionData,
  scopeItem: scopeItemData,
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type SharedDataTypes = typeof sharedDataTypes;
