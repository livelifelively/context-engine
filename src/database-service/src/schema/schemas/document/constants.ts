/**
 * Essential Constants
 *
 * This file contains only the essential constants that cannot be derived.
 * All other type names and schemas are generated or defined in their respective files.
 */

// =============================================================================
// GRAPHQL TYPE CONSTANTS
// =============================================================================

export const GRAPHQL_TYPES = {
  ID: 'ID!',
  ID_OPTIONAL: 'ID',
  STRING: 'String!',
  STRING_OPTIONAL: 'String',
  INT: 'Int!',
  INT_OPTIONAL: 'Int',
  FLOAT: 'Float!',
  FLOAT_OPTIONAL: 'Float',
  BOOLEAN: 'Boolean!',
  BOOLEAN_OPTIONAL: 'Boolean',
  DATETIME: 'DateTime',
  DATETIME_OPTIONAL: 'DateTime',
} as const;

// =============================================================================
// GRAPHQL ENUM CONSTANTS
// =============================================================================

export const GRAPHQL_ENUMS = {
  STATUS_KEY: 'StatusKey!',
  STATUS_KEY_OPTIONAL: 'StatusKey',
  PRIORITY_LEVEL: 'PriorityLevel!',
  PRIORITY_LEVEL_OPTIONAL: 'PriorityLevel',
  // Business & Scope Family Enums
  BUSINESS_RULE_CATEGORY: 'BusinessRuleCategory!',
  BUSINESS_RULE_CATEGORY_OPTIONAL: 'BusinessRuleCategory',
  DONE_CRITERION_CATEGORY: 'DoneCriterionCategory!',
  DONE_CRITERION_CATEGORY_OPTIONAL: 'DoneCriterionCategory',
  SCOPE_ITEM_CATEGORY: 'ScopeItemCategory!',
  SCOPE_ITEM_CATEGORY_OPTIONAL: 'ScopeItemCategory',
} as const;

// =============================================================================
// DOCUMENT TYPES
// =============================================================================

export const DOCUMENT_TYPES = ['Plan', 'Task', 'Project', 'Module', 'Feature'] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number];
