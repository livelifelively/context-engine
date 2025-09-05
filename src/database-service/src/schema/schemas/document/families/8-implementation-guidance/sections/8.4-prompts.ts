import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 8.4: Prompts (LLM reuse)
export const SECTION_8_4_PROMPTS = '8.4' as const;

export const section_8_4_prompts = {
  id: SECTION_8_4_PROMPTS,
  name: 'Prompts (LLM reuse)',
  description:
    'A collection of prompts that can be used with an LLM to assist in the implementation. Includes strategic prompts for planning and implementation-specific prompts for tasks.',
  interfaceName: '_Section_8_4_Prompts_',
  businessPurpose:
    'Provide reusable prompts for LLM-assisted implementation to improve development efficiency and consistency.',
  questionsItAnswers: [
    'What prompts can help with LLM-assisted implementation?',
    'What strategic prompts are useful for planning?',
    'What implementation-specific prompts are available?',
    'How can LLMs assist with code generation and testing?',
  ],
  validationRules: [
    'Must include useful prompts for LLM-assisted implementation',
    'Should include both strategic and implementation-specific prompts',
    'Optional for both Plans and Tasks',
    'Prompts should be specific and actionable',
  ],
  usageGuidelines: [
    'Use this section to provide reusable prompts for LLM assistance',
    'Include both strategic prompts for planning and implementation prompts',
    'Make prompts specific and actionable for better results',
    'Include context and examples in prompts when helpful',
    'Update prompts based on implementation experience and feedback',
  ],
  examples: [
    {
      context: 'Code Generation Prompts',
      description: 'Prompts for generating implementation code',
      content: {
        prompts: [
          {
            description: 'Generate a TypeScript interface for a logging transport',
            code: 'Create a TypeScript interface for a logging transport that includes methods for log(), error(), warn(), and info(). Include proper type definitions and JSDoc comments.',
            language: 'typescript',
          },
          {
            description: 'Generate unit tests for a utility function',
            code: 'Generate comprehensive unit tests for this function using Vitest. Include edge cases, error conditions, and proper assertions.',
            language: 'typescript',
          },
        ],
      },
    },
    {
      context: 'Strategic Planning Prompts',
      description: 'Prompts for strategic planning and architecture decisions',
      content: {
        prompts: [
          {
            description: 'Analyze system architecture for scalability',
            code: 'Analyze this system architecture and provide recommendations for improving scalability. Consider performance bottlenecks, resource utilization, and growth patterns.',
            language: 'text',
          },
          {
            description: 'Review code quality and suggest improvements',
            code: 'Review this code and suggest improvements for maintainability, performance, and best practices. Focus on specific, actionable recommendations.',
            language: 'text',
          },
        ],
      },
    },
  ],
  aiInstructions: [
    'Focus on providing useful prompts for LLM-assisted implementation',
    'Include both strategic and implementation-specific prompts',
    'Make prompts specific and actionable for better results',
    'Include context and examples in prompts when helpful',
    'Provide prompts that can be reused across different implementations',
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
        description: 'Unique identifier for the prompts section',
        applicability: {
          plan: 'optional',
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
        description: 'Timestamp when the prompts section was created',
        applicability: {
          plan: 'optional',
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
        description: 'Timestamp when the prompts section was last updated',
        applicability: {
          plan: 'optional',
          task: 'optional',
        },
      },
    },
    prompts: {
      name: 'prompts',
      label: 'Prompts',
      graphql: {
        type: '[_SectionData_Prompt_!]!',
        required: true,
      },
      zod: z
        .array(
          z.object({
            description: z.string().min(1),
            code: z.string().min(1),
            language: z.string().min(1).optional(),
          })
        )
        .min(1),
      metadata: {
        description: 'Collection of prompts for LLM-assisted implementation',
        applicability: {
          plan: 'optional',
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
          plan: 'optional',
          task: 'optional',
        },
      },
    },
  },
} as const;
