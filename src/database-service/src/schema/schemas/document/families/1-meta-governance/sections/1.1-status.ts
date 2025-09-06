/**
 * Section 1.1: Status
 *
 * This file contains the complete data object for the Status section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section provides real-time execution visibility and status tracking
 * for tasks across all document types in the Meta & Governance family.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';
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

export const SECTION_1_1_STATUS = '1.1' as const;
export const SECTION_NAME = 'status' as const;

export const section_1_1_status = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_1_1_STATUS,
  name: 'Status',
  description: 'Real-time execution visibility and status tracking for tasks',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_1_1_Status_',

  // Section-level metadata
  businessPurpose:
    'Enables humans and AI systems to know the current status of task, identify blockers and track development velocity',

  questionsItAnswers: [
    'What is the current status of the task?',
    'What is the priority of the task?',
    'What is the current progress of the task?',
    'What is the planning estimate of the task?',
    'How many story points is the task?',
    'What is the implementation started on of the task?',
    'When was the task completed?',
  ],

  validationRules: [
    'Must follow markdown format',
    'Must include required timestamp fields',
    'Progress must be between 0 and 100',
    'Planning estimate must be positive integer',
  ],

  usageGuidelines: [
    'Should be updated in real-time as work progresses',
    'Must reflect current execution state accurately',
    'Progress updates should be granular and meaningful',
    'Timestamps should be automatically managed by the system',
  ],

  examples: [
    {
      context: 'Task in progress',
      data: {
        currentState: 'IN_PROGRESS',
        priority: 'HIGH',
        progress: 75,
        planningEstimate: 8,
        implementationStartedOn: '2024-01-15T09:00:00Z',
      },
    },
    {
      context: 'Blocked task',
      data: {
        currentState: 'BLOCKED',
        priority: 'MEDIUM',
        progress: 30,
        planningEstimate: 5,
        implementationStartedOn: '2024-01-10T14:30:00Z',
      },
    },
    {
      context: 'Completed task',
      data: {
        currentState: 'COMPLETED',
        priority: 'HIGH',
        progress: 100,
        planningEstimate: 3,
        implementationStartedOn: '2024-01-12T10:00:00Z',
        completedOn: '2024-01-15T16:45:00Z',
      },
    },
  ],

  aiInstructions: [
    'Monitor status changes and update progress automatically when possible',
    'Identify patterns in status changes to predict completion times',
    'Alert on blocked tasks that have been stuck for extended periods',
    'Suggest priority adjustments based on business context and deadlines',
  ],

  // =============================================================================
  // FIELD DEFINITIONS
  // =============================================================================

  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),

    currentState: {
      name: 'currentState',
      label: 'Current State',
      graphql: {
        type: GRAPHQL_ENUMS.STATUS_KEY,
        required: true,
      },
      zod: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED']),
      metadata: {
        description: 'Current execution state',
        businessPurpose: 'Provides immediate visibility into progress',
        questionsItAnswers: ['What is the current state of the status section?'],
        validationRules: ['Must be a valid StatusKey enum value'],
        examples: ['NOT_STARTED', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED'],
      },
    },

    priority: {
      name: 'priority',
      label: 'Priority',
      graphql: {
        type: GRAPHQL_ENUMS.PRIORITY_LEVEL,
        required: true,
      },
      zod: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
      metadata: {
        description: 'Priority level',
        businessPurpose: 'Helps with resource allocation and scheduling decisions',
        questionsItAnswers: ['What is the priority of the status section?'],
        validationRules: ['Must be a valid PriorityLevel enum value'],
        examples: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      },
    },

    progress: {
      name: 'progress',
      label: 'Progress',
      graphql: {
        type: GRAPHQL_TYPES.INT,
        required: true,
      },
      zod: z.number().min(0).max(100),
      metadata: {
        description: 'Completion percentage (0-100)',
        businessPurpose: 'Provides quantitative progress tracking',
        questionsItAnswers: ['What is the progress of the status section?'],
        validationRules: ['Must be integer between 0 and 100'],
        examples: [0, 25, 50, 75, 100],
      },
    },

    planningEstimate: {
      name: 'planningEstimate',
      label: 'Planning Estimate',
      graphql: {
        type: GRAPHQL_TYPES.INT,
        required: true,
      },
      zod: z.number().min(1),
      metadata: {
        description: 'Estimated effort in story points or hours',
        businessPurpose: 'Enables capacity planning and velocity tracking',
        questionsItAnswers: [
          'What is the planning estimate of the status section?',
          'How many story points is the task?',
        ],
        validationRules: ['Must be positive integer'],
        examples: [1, 3, 5, 8, 13],
      },
    },

    implementationStartedOn: {
      name: 'implementationStartedOn',
      label: 'Implementation Started On',
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false,
      },
      zod: z.date().optional(),
      metadata: {
        description: 'When implementation began',
        businessPurpose: 'Tracks actual start time for velocity calculations',
        questionsItAnswers: [
          'What is the implementation started on date of the status section?',
          'When was the implementation started on?',
        ],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T09:00:00Z'],
      },
    },

    completedOn: {
      name: 'completedOn',
      label: 'Completed On',
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false,
      },
      zod: z.date().optional(),
      metadata: {
        description: 'When task was completed',
        businessPurpose: 'Tracks completion time for velocity and cycle time analysis',
        questionsItAnswers: ['What is the completed on date of the status section?', 'When was the task completed?'],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T16:45:00Z'],
      },
    },

    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_1_META_GOVERNANCE, SECTION_NAME),
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_1_1_Status_Type = typeof section_1_1_status;
