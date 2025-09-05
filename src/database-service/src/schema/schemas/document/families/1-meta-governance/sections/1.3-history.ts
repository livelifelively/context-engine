/**
 * Section: 1.3 History
 *
 * This file contains the complete data object for History sections,
 * serving as the single source of truth for generating:
 * - GraphQL section interfaces and implementations
 * - Zod section validation schemas
 * - Rich section metadata and documentation
 *
 * History sections maintain execution continuity and preserve links between
 * plan/task and implemented work across all document types.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';

// =============================================================================
// SECTION IDENTIFIER
// =============================================================================

export const SECTION_1_3_HISTORY = '1.3' as const;

export const section_1_3_history = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_1_3_HISTORY,
  name: 'History',
  description: 'Completed work tracking and knowledge preservation',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_1_3_History_',

  // Section-level metadata
  businessPurpose: 'Link existing codebases to the planning and implementation context',

  validationRules: [
    'Must have at least one task document reference',
    'Task document references must be valid',
    'Should be updated when tasks change',
  ],

  questionItAnswers: [
    'What are the task documents are related to this project/module/feature?',
    'What is the implementation history of this project/module/feature?',
  ],

  usageGuidelines: [
    'Should be maintained throughout the project lifecycle',
    'Must be updated when tasks are completed or modified',
    'Should preserve links between planning and implementation',
  ],

  examples: [
    {
      context: 'Completed project with multiple tasks',
      data: {
        taskDocuments: ['task-001', 'task-002', 'task-003'],
      },
    },
    {
      context: 'Feature implementation history',
      data: {
        taskDocuments: ['task-feature-auth', 'task-feature-ui', 'task-feature-tests'],
      },
    },
  ],

  aiInstructions: [
    'Analyze task completion patterns and delivery velocity',
    'Identify recurring blockers and improvement opportunities',
    'Connect tactical execution to strategic objectives through task history',
    'Maintain execution continuity by tracking completed tasks and their outcomes',
  ],

  // =============================================================================
  // SECTION FIELDS
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
        description: 'Unique identifier for the history section',
        businessPurpose: 'Enables unique identification and referencing',
        questionItAnswers: ["What is the id of the 'history' section in the database?"],
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
        description: 'Timestamp when the history section was created',
        businessPurpose: 'Provides audit trail and creation tracking',
        questionItAnswers: ["What is the created on date of the 'history' section?"],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-01T00:00:00Z'],
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
        description: 'Timestamp when the history section was last updated',
        businessPurpose: 'Enables change tracking and freshness monitoring',
        questionItAnswers: ["What is the last updated on date of the 'history' section?"],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T14:30:00Z'],
      },
    },

    taskDocuments: {
      name: 'taskDocuments',
      label: 'Task Documents',
      graphql: {
        type: '[_Document_Task_!]!',
        required: true,
      },
      zod: z.array(z.string().min(1)),
      metadata: {
        description: 'Array of task document IDs in graph database that are linked to this documentation',
        businessPurpose: 'Connects high-level documents to their constituent tasks',
        questionItAnswers: [
          'What are the task documents that are related to this project/module/feature?',
          'What is the implementation history of this project/module/feature?',
        ],
        validationRules: [
          'Must contain at least one task document reference',
          'All task document IDs must be valid strings',
          'Should be updated when tasks change',
        ],
      },
    },

    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_1_MetaGovernance_',
        required: true,
      },
      zod: z.string(),
      metadata: {
        description: 'Reference to the parent family',
        businessPurpose: 'Establishes the relationship between section and family',
        questionItAnswers: ["What is the family of the 'history' section?"],
        validationRules: ['Must be a valid family reference'],
      },
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_1_3_History_Type = typeof section_1_3_history;
