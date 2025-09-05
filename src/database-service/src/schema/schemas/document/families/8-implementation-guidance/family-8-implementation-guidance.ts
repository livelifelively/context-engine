import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../constants.js';

// Family 8: Implementation Guidance
export const FAMILY_8_IMPLEMENTATION_GUIDANCE = '8-implementation-guidance' as const;

export const family_8_implementation_guidance = {
  id: FAMILY_8_IMPLEMENTATION_GUIDANCE,
  name: 'Implementation Guidance',
  version: '1.0.0',
  description:
    'Provides practical, step-by-step instructions for building components. Translates the "what" from planning sections and the "how" from architecture sections into concrete "to-do" lists. This is where design becomes action.',
  supportedBy: ['plan', 'task'],
  sections: [
    '8.1', // Implementation Plan
    '8.2', // Initial Situation
    '8.3', // Files Change Log
    '8.4', // Prompts (LLM reuse)
  ],
  interfaceName: '_Family_8_ImplementationGuidance_',
  businessPurpose:
    'Provide practical, step-by-step instructions for building components and translating design into actionable implementation steps.',
  questionsItAnswers: [
    'What are the practical steps to implement this component?',
    'How do we translate design into concrete actions?',
    'What is the step-by-step implementation process?',
    'What prompts can help with LLM-assisted implementation?',
    'What files need to be modified during implementation?',
  ],
  validationRules: [
    'Implementation Plan is required for Plans (phased approach)',
    'Implementation Plan is optional for Tasks (direct implementation)',
    'Initial Situation and Files Change Log are required for Tasks only',
    'Prompts are optional for both Plans and Tasks',
    'All implementation steps must be actionable and specific',
  ],
  usageGuidelines: [
    'Use this family to provide concrete implementation guidance',
    'Focus on actionable steps rather than high-level concepts',
    'Include both technical and process implementation steps',
    'For Plans, provide phased rollout strategies',
    'For Tasks, provide detailed step-by-step execution logs',
    'Include LLM prompts to assist with implementation when helpful',
  ],
  examples: [
    {
      context: 'Task Implementation Log',
      description: 'Detailed step-by-step implementation for a specific task',
      content: {
        implementationPlan: 'Phased approach with milestones and dependencies',
        initialSituation: 'Current state before implementation begins',
        filesChangeLog: 'Detailed tracking of file modifications',
        prompts: 'LLM prompts for code generation and testing',
      },
    },
    {
      context: 'Plan Implementation Strategy',
      description: 'High-level implementation strategy for a plan',
      content: {
        implementationPlan: 'Strategic implementation phases with resource allocation',
        prompts: 'Strategic prompts for planning and architecture decisions',
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
        description: 'Unique identifier for the implementation guidance family',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    familyCreatedOn: {
      name: 'familyCreatedOn',
      label: 'Family Created On',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().datetime(),
      metadata: {
        description: 'Timestamp when the implementation guidance family was created',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    familyLastUpdatedOn: {
      name: 'familyLastUpdatedOn',
      label: 'Family Last Updated On',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().datetime(),
      metadata: {
        description: 'Timestamp when the implementation guidance family was last updated',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    document: {
      name: 'document',
      label: 'Document',
      graphql: {
        type: '_Document_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent document containing this implementation guidance family',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
  },
} as const;
