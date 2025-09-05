import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 5.1: Guiding Principles
export const SECTION_5_1_GUIDING_PRINCIPLES = '5.1' as const;

export const section_5_1_guiding_principles = {
  id: SECTION_5_1_GUIDING_PRINCIPLES,
  name: 'Guiding Principles',
  description:
    'A list of high-level architectural rules, patterns, or constraints that should apply to the target system. These principles guide the desired future design decisions.',
  interfaceName: '_Section_5_1_GuidingPrinciples_',
  businessPurpose:
    'Define the architectural principles that should govern the target system to ensure consistent design decisions and architectural evolution.',
  questionsItAnswers: [
    'What architectural principles should govern the target system?',
    'What design patterns should be enforced in the future?',
    'What constraints should exist in the target architecture?',
    'What rules should guide future system development?',
  ],
  validationRules: [
    'Must contain at least one guiding principle',
    'Each principle should be a clear, actionable statement',
    'Principles should reflect desired future system state',
    'Should align with business goals and technical constraints',
  ],
  usageGuidelines: [
    'Document desired principles that should govern the target system',
    'Include both positive principles and constraints/limitations',
    'Focus on architectural decisions that affect future system design',
    'Ensure principles align with business objectives',
    'Document rationale for each principle',
  ],
  examples: [
    {
      context: 'Microservices Target Architecture',
      description: 'Target principles for a microservices architecture',
      content: {
        principles: [
          'Each service should have a single responsibility and clear boundaries',
          'Services should communicate via well-defined APIs and events',
          'Data should be owned by a single service',
          'Services should be independently deployable and scalable',
        ],
      },
    },
    {
      context: 'Cloud-Native Target Architecture',
      description: 'Target principles for a cloud-native system',
      content: {
        principles: [
          'Design for cloud-native patterns and auto-scaling',
          'Use infrastructure as code for all deployments',
          'Implement comprehensive observability and monitoring',
          'Follow security-first design principles',
        ],
      },
    },
  ],
  aiInstructions: [
    'Focus on defining desired future principles, not current reality',
    'Include both explicit architectural rules and implicit design patterns',
    'Document the business rationale for each principle',
    'Ensure principles support the overall target architecture vision',
    'Provide context for why these principles are important for the target system',
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
        description: 'Unique identifier for the guiding principles section',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
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
        description: 'Timestamp when the guiding principles section was created',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
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
        description: 'Timestamp when the guiding principles section was last updated',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    principles: {
      name: 'principles',
      label: 'Principles',
      graphql: {
        type: '[String!]!',
        required: true,
      },
      zod: z.array(z.string().min(1)).min(1),
      metadata: {
        description: 'List of architectural principles that should govern the target system',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_5_TargetArchitecture_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent target architecture family',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
  },
} as const;
