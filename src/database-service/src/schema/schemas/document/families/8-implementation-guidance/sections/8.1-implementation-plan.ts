import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 8.1: Implementation Plan
export const SECTION_8_1_IMPLEMENTATION_PLAN = '8.1' as const;

export const section_8_1_implementation_plan = {
  id: SECTION_8_1_IMPLEMENTATION_PLAN,
  name: 'Implementation Plan',
  description:
    'A detailed, step-by-step log of the implementation process. For Plans, this provides a phased rollout strategy. For Tasks, this provides direct implementation approach if complex.',
  interfaceName: '_Section_8_1_ImplementationPlan_',
  businessPurpose:
    'Provide a structured, actionable plan for implementing the component or system, translating design into concrete implementation steps.',
  questionsItAnswers: [
    'What are the step-by-step implementation steps?',
    'How should the implementation be phased or structured?',
    'What are the key milestones and dependencies?',
    'What is the implementation timeline and approach?',
  ],
  validationRules: [
    'Must provide actionable, step-by-step implementation guidance',
    'Should include clear milestones and dependencies',
    'For Plans, focus on phased rollout strategy',
    'For Tasks, focus on direct implementation approach',
    'All steps must be specific and actionable',
  ],
  usageGuidelines: [
    'Use this section to provide concrete implementation guidance',
    'Focus on actionable steps rather than high-level concepts',
    'Include both technical and process implementation steps',
    'For Plans, provide strategic implementation phases',
    'For Tasks, provide detailed execution steps',
    'Update the plan as implementation progresses',
  ],
  examples: [
    {
      context: 'Plan Implementation Strategy',
      description: 'Phased rollout strategy for a complex system',
      content: {
        implementationSteps: [
          'Phase 1: Core infrastructure setup and basic functionality',
          'Phase 2: Advanced features and integrations',
          'Phase 3: Performance optimization and monitoring',
          'Phase 4: Documentation and deployment',
        ],
      },
    },
    {
      context: 'Task Implementation Steps',
      description: 'Detailed implementation steps for a specific task',
      content: {
        implementationSteps: [
          'Create logger/types.ts with core interfaces',
          'Implement ConsoleTransport class',
          'Implement HttpTransport class',
          'Write unit tests for all transports',
          'Update documentation with usage examples',
        ],
      },
    },
  ],
  aiInstructions: [
    'Focus on providing actionable, step-by-step implementation guidance',
    'Translate high-level design into concrete implementation steps',
    'Include both technical implementation and process steps',
    'Provide clear, specific instructions that can be followed',
    'Include rationale for implementation decisions and approaches',
  ],
  fields: {
    id: {
      name: 'id',
      label: 'ID',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Unique identifier for the implementation plan section',
        applicability: {
          plan: 'required',
          task: 'optional',
        },
      },
    },
    sectionCreatedOn: {
      name: 'sectionCreatedOn',
      label: 'Section Created On',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().datetime(),
      metadata: {
        description: 'Timestamp when the implementation plan section was created',
        applicability: {
          plan: 'required',
          task: 'optional',
        },
      },
    },
    sectionLastUpdatedOn: {
      name: 'sectionLastUpdatedOn',
      label: 'Section Last Updated On',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().datetime(),
      metadata: {
        description: 'Timestamp when the implementation plan section was last updated',
        applicability: {
          plan: 'required',
          task: 'optional',
        },
      },
    },
    implementationSteps: {
      name: 'implementationSteps',
      label: 'Implementation Steps',
      graphql: {
        type: '[String!]!',
        required: true,
      },
      zod: z.array(z.string().min(1)).min(1),
      metadata: {
        description: 'Detailed, step-by-step implementation steps',
        applicability: {
          plan: 'required',
          task: 'optional',
        },
      },
    },
    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_8_ImplementationGuidance_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent implementation guidance family',
        applicability: {
          plan: 'required',
          task: 'optional',
        },
      },
    },
  },
} as const;
