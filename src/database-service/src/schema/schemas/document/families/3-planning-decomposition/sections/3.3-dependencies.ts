/**
 * Section 3.3: Dependencies
 *
 * This file contains the complete data object for the Dependencies section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section defines an explicit list of internal or external dependencies
 * that must be resolved before this Plan/Task can be completed.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';

// =============================================================================
// SECTION IDENTIFIER
// =============================================================================

export const SECTION_3_3_DEPENDENCIES = '3.3' as const;

// =============================================================================
// DATA TYPE DEFINITIONS
// =============================================================================

// Dependency data type - used within this section
export const DependencySchema = z.object({
  id: z.string().min(1), // e.g., "D-1", "D-2"
  dependencyOn: z.string().min(1), // e.g., "shared-ui-library v2.1+"
  type: z.enum(['INTERNAL', 'EXTERNAL']),
  status: z.enum(['BLOCKED', 'IN_PROGRESS', 'COMPLETED', 'PENDING']),
  affectedPlansTasks: z.array(z.string().min(1)).min(1), // e.g., ["p1-frontend", "p3-reporting"]
  notes: z.string().min(1),
});

export type Dependency = z.infer<typeof DependencySchema>;

export const section_3_3_dependencies = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_3_3_DEPENDENCIES,
  name: 'Dependencies',
  description:
    'An explicit list of internal or external dependencies that must be resolved before this Plan/Task can be completed',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_3_3_Dependencies_',

  // Section-level metadata
  businessPurpose:
    'Tracks dependencies that could block progress to ensure predictable development flow and help in resource allocation',

  questionsItAnswers: [
    'What dependencies must be resolved before this work can be completed?',
    'Are these internal or external dependencies?',
    'What is the current status of each dependency?',
    'Which Plans/Tasks are affected by each dependency?',
  ],

  validationRules: [
    'Must have at least one dependency for both Plans and Tasks',
    'Each dependency must have a unique ID',
    'Type must be INTERNAL or EXTERNAL',
    'Status must be valid enum value',
    'Affected Plans/Tasks must be specified',
  ],

  usageGuidelines: [
    'Should be defined early in the planning process',
    'Must be specific to the work being done',
    'Should track both internal and external dependencies',
    'Keep dependency status up to date',
  ],

  examples: [
    {
      context: 'Authentication system development plan',
      data: {
        dependencies: [
          {
            id: 'D-1',
            dependencyOn: 'shared-ui-library v2.1+',
            type: 'EXTERNAL',
            status: 'BLOCKED',
            affectedPlansTasks: ['p1-frontend'],
            notes: 'Awaiting release from Platform team. Expected delivery: Q1 2024',
          },
          {
            id: 'D-2',
            dependencyOn: 'Plan p2-user-profiles',
            type: 'INTERNAL',
            status: 'COMPLETED',
            affectedPlansTasks: ['p3-reporting'],
            notes: 'User schema is now finalized and available for integration',
          },
          {
            id: 'D-3',
            dependencyOn: 'Database migration scripts',
            type: 'INTERNAL',
            status: 'IN_PROGRESS',
            affectedPlansTasks: ['p1-backend', 't1-database-setup'],
            notes: 'Database team is working on migration scripts. Expected completion: 2 weeks',
          },
        ],
      },
    },
    {
      context: 'User management system task',
      data: {
        dependencies: [
          {
            id: 'D-1',
            dependencyOn: 'Authentication service API',
            type: 'EXTERNAL',
            status: 'PENDING',
            affectedPlansTasks: ['t1-user-validation'],
            notes: 'Waiting for authentication service to be deployed to staging environment',
          },
          {
            id: 'D-2',
            dependencyOn: 'User schema definition',
            type: 'INTERNAL',
            status: 'COMPLETED',
            affectedPlansTasks: ['t2-user-crud'],
            notes: 'User schema has been finalized and documented',
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help identify all dependencies that could block progress',
    'Suggest appropriate dependency types and statuses',
    'Help track affected Plans/Tasks for each dependency',
    'Ensure dependency information is complete and actionable',
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
        description: 'Unique identifier for the dependencies section',
        businessPurpose: 'Enables unique identification and referencing',
        questionsItAnswers: ['What is the id of the dependencies section in the database?'],
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
        description: 'Timestamp when the dependencies section was created',
        businessPurpose: 'Provides audit trail and creation tracking',
        questionsItAnswers: ['What is the created on date of the dependencies section?'],
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
        description: 'Timestamp when the dependencies section was last updated',
        businessPurpose: 'Enables change tracking and freshness monitoring',
        questionsItAnswers: ['What is the last updated on date of the dependencies section?'],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T14:30:00Z'],
      },
    },

    dependencies: {
      name: 'dependencies',
      label: 'Dependencies',
      graphql: {
        type: '[_SectionData_Dependency_!]!',
        required: true,
      },
      zod: z.array(DependencySchema).min(1),
      metadata: {
        description:
          'Array of internal or external dependencies that must be resolved before this Plan/Task can be completed',
        businessPurpose:
          'Tracks dependencies that could block progress to ensure predictable development flow and help in resource allocation',
        questionsItAnswers: [
          'What dependencies must be resolved before this work can be completed?',
          'Are these internal or external dependencies?',
          'What is the current status of each dependency?',
        ],
        validationRules: [
          'Must contain at least one dependency for both Plans and Tasks',
          'Each dependency must have a unique ID',
          'Type must be INTERNAL or EXTERNAL',
          'Status must be valid enum value',
        ],
        examples: [
          [
            {
              id: 'D-1',
              dependencyOn: 'shared-ui-library v2.1+',
              type: 'EXTERNAL',
              status: 'BLOCKED',
              affectedPlansTasks: ['p1-frontend'],
              notes: 'Awaiting release from Platform team',
            },
            {
              id: 'D-2',
              dependencyOn: 'Plan p2-user-profiles',
              type: 'INTERNAL',
              status: 'COMPLETED',
              affectedPlansTasks: ['p3-reporting'],
              notes: 'User schema is now finalized',
            },
          ],
        ],
      },
    },

    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_3_PlanningDecomposition_',
        required: true,
      },
      zod: z.string(),
      metadata: {
        description: 'Reference to the parent family',
        businessPurpose: 'Establishes the relationship between section and family',
        questionsItAnswers: ['What is the family of the dependencies section?'],
        validationRules: ['Must be a valid family reference'],
      },
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_3_3_Dependencies_Type = typeof section_3_3_dependencies;
