/**
 * Section 3.1: Roadmap (In-Focus Items)
 *
 * This file contains the complete data object for the Roadmap section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section defines a table of direct child Plans/Tasks that are currently
 * planned for implementation in the active cycle.
 */

import { z } from 'zod';

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

export const SECTION_3_1_ROADMAP = '3.1' as const;
export const SECTION_NAME = 'roadmap' as const;

// =============================================================================
// DATA TYPE DEFINITIONS
// =============================================================================

// Roadmap Item data type - used within this section
export const RoadmapItemSchema = z.object({
  id: z.string().min(1), // e.g., "P1", "T1"
  childPlanTask: z.string().min(1), // e.g., "[Backend Plan](p1-backend.plan.md)"
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  priorityDrivers: z.array(z.string().min(1)).min(1), // e.g., ["CBP-Break_Block_Revenue_Legal"]
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED']),
  dependsOn: z.string().optional(), // e.g., "—", "P1", "T1"
  summary: z.string().min(1),
});

export type RoadmapItem = z.infer<typeof RoadmapItemSchema>;

export const section_3_1_roadmap = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_3_1_ROADMAP,
  name: 'Roadmap (In-Focus Items)',
  description: 'A table of direct child Plans/Tasks that are currently planned for implementation in the active cycle',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_3_1_Roadmap_',

  // Section-level metadata
  businessPurpose:
    'Lists the immediate child Plans/Tasks being actively worked on to provide clear visibility into current implementation focus',

  questionsItAnswers: [
    'What child Plans/Tasks are currently in focus?',
    'What is the priority and status of each roadmap item?',
    'What are the dependencies between roadmap items?',
    'What is the summary of each planned work item?',
  ],

  validationRules: [
    'Must have at least one roadmap item for Plans',
    'Each item must have a unique ID',
    'Priority must be HIGH, MEDIUM, or LOW',
    'Status must be valid enum value',
    'Priority drivers must be provided',
  ],

  usageGuidelines: [
    'Should be defined early in the planning process',
    'Must be specific to the current implementation cycle',
    'Should focus on immediate child Plans/Tasks only',
    'Keep items actionable and well-defined',
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
          {
            id: 'T2',
            childPlanTask: '[Frontend Integration](p1.t2-frontend-integration.task.md)',
            priority: 'HIGH',
            priorityDrivers: ['CBP-Break_Block_Revenue_Legal'],
            status: 'IN_PROGRESS',
            dependsOn: 'P1',
            summary: 'Integrate authentication UI with backend APIs',
          },
        ],
      },
    },
    {
      context: 'User management system',
      data: {
        roadmap: [
          {
            id: 'P1',
            childPlanTask: '[User Profiles Plan](p1-user-profiles.plan.md)',
            priority: 'HIGH',
            priorityDrivers: ['CBP-Break_Block_Revenue_Legal', 'TEC-Prod_Stability_Blocker'],
            status: 'COMPLETED',
            dependsOn: null,
            summary: 'Complete user profile management system',
          },
          {
            id: 'T1',
            childPlanTask: '[Profile Validation](p1.t1-profile-validation.task.md)',
            priority: 'MEDIUM',
            priorityDrivers: ['TEC-Prod_Stability_Blocker'],
            status: 'BLOCKED',
            dependsOn: 'P1',
            summary: 'Implement profile data validation rules',
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help identify appropriate child Plans/Tasks for the roadmap',
    'Suggest realistic priorities based on business drivers',
    'Help identify dependencies between roadmap items',
    'Ensure roadmap items are specific and actionable',
  ],

  // =============================================================================
  // FIELD DEFINITIONS
  // =============================================================================

  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),

    roadmap: {
      name: 'roadmap',
      label: 'Roadmap',
      graphql: {
        type: '[_SectionData_RoadmapItem_!]!',
        required: true,
      },
      zod: z.array(RoadmapItemSchema).min(1),
      metadata: {
        description: 'Array of direct child Plans/Tasks currently planned for implementation in the active cycle',
        businessPurpose:
          'Lists the immediate child Plans/Tasks being actively worked on to provide clear visibility into current implementation focus',
        questionsItAnswers: [
          'What child Plans/Tasks are currently in focus?',
          'What is the priority and status of each roadmap item?',
          'What are the dependencies between roadmap items?',
        ],
        validationRules: [
          'Must contain at least one roadmap item for Plans',
          'Each item must have a unique ID',
          'Priority must be valid enum value',
          'Status must be valid enum value',
        ],
        examples: [
          [
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
        ],
      },
    },

    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_3_PLANNING_DECOMPOSITION, SECTION_NAME),
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_3_1_Roadmap_Type = typeof section_3_1_roadmap;
