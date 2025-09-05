/**
 * Family 3: Planning & Decomposition
 *
 * This file contains the complete data object for the Planning & Decomposition family,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This family answers what we are building and in what order, providing a clear
 * breakdown of work, implementation sequence, and dependencies.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../constants.js';

// =============================================================================
// FAMILY IDENTIFIER
// =============================================================================

export const FAMILY_3_PLANNING_DECOMPOSITION = '3-planning-decomposition' as const;

export const family_3_planning_decomposition = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: FAMILY_3_PLANNING_DECOMPOSITION,
  name: 'Planning & Decomposition',
  version: '1.0.0',
  description: 'What are we building, in what order?',

  // =============================================================================
  // FAMILY DEFINITION
  // =============================================================================

  // Supported document types
  supportedBy: ['Plan', 'Task'],

  // Sections in this family
  sections: ['3.1', '3.2', '3.3', '3.4'],

  // GraphQL interface name
  interfaceName: '_Family_3_PlanningDecomposition_',

  // Family-level metadata
  businessPurpose:
    'Provides a clear breakdown of work, defines implementation sequence, and explicitly lists dependencies to ensure predictable development flow and resource allocation',

  questionsItAnswers: [
    'What are we building and in what order?',
    'What is the roadmap of child Plans/Tasks?',
    'What items are in the backlog or icebox?',
    'What dependencies must be resolved?',
    'How do the components relate to each other?',
  ],

  validationRules: [
    'Must have roadmap items for Plans',
    'Must have dependencies for both Plans and Tasks',
    'Roadmap items must have valid priority and status',
    'Dependencies must have clear status and type',
  ],

  usageGuidelines: [
    'Essential for Plans to define roadmap and decomposition',
    'Optional for Tasks to track dependencies only',
    'Keep roadmap focused on current implementation cycle',
    'Maintain clear dependency tracking',
  ],

  examples: [
    {
      context: 'Authentication system development plan',
      data: {
        roadmap: [
          {
            id: 'P1',
            childPlanTask: '[Backend Auth Plan](p1-backend-auth.plan.md)',
            priority: 'HIGH',
            priorityDrivers: ['CBP-Break_Block_Revenue_Legal'],
            status: 'NOT_STARTED',
            dependsOn: null,
            summary: 'Core authentication backend services and APIs',
          },
          {
            id: 'T1',
            childPlanTask: '[Database Setup](p1.t1-database-setup.task.md)',
            priority: 'MEDIUM',
            priorityDrivers: ['TEC-Prod_Stability_Blocker'],
            status: 'NOT_STARTED',
            dependsOn: null,
            summary: 'Configure production database for auth system',
          },
        ],
        backlog: [
          {
            name: 'Advanced Security Features',
            reason: 'Deferred to Q2 due to complexity and current MVP scope',
          },
        ],
        dependencies: [
          {
            id: 'D-1',
            dependencyOn: 'shared-ui-library v2.1+',
            type: 'EXTERNAL',
            status: 'BLOCKED',
            affectedPlansTasks: ['p1-frontend'],
            notes: 'Awaiting release from Platform team',
          },
        ],
        decompositionGraph: {
          text: 'This diagram shows the decomposition of our authentication system, with the backend plan as the foundation and UI tasks building upon it.',
          diagram:
            'subgraph Plan: User Authentication\n        P1["Plan: Backend Auth"]\n        T1["Task: Create UI form"]\n        T2["Task: Implement validation"]\n        T3["Task: Add API endpoint"]\n        T4["Task: Write integration tests"]\n    end\n    P1 --> T1\n    T1 --> T2\n    T2 --> T3\n    T3 --> T4',
        },
      },
    },
  ],

  aiInstructions: [
    'Help break down complex work into manageable components',
    'Identify dependencies and critical path items',
    'Suggest appropriate prioritization based on business drivers',
    'Help create clear decomposition graphs',
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
        description: 'Unique identifier for the planning & decomposition family',
        businessPurpose: 'Enables unique identification and referencing',
        questionsItAnswers: ['What is the id of the planning & decomposition family in the database?'],
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
        description: 'Timestamp when the planning & decomposition family was created',
        businessPurpose: 'Provides audit trail and creation tracking',
        questionsItAnswers: ['What is the created on date of the planning & decomposition family?'],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T09:00:00Z'],
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
        description: 'Timestamp when the planning & decomposition family was last updated',
        businessPurpose: 'Enables change tracking and freshness monitoring',
        questionsItAnswers: ['What is the last updated on date of the planning & decomposition family?'],
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
        description: 'Reference to the parent document',
        businessPurpose: 'Establishes the relationship between family and document',
        questionsItAnswers: ['What is the document of the planning & decomposition family?'],
        validationRules: ['Must be a valid document reference'],
      },
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Family_3_PlanningDecomposition_Type = typeof family_3_planning_decomposition;
