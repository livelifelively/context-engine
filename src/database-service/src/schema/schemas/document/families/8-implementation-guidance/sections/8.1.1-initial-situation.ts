import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 8.1.1: Initial Situation
export const SECTION_8_1_1_INITIAL_SITUATION = '8.1.1' as const;

export const section_8_1_1_initial_situation = {
  id: SECTION_8_1_1_INITIAL_SITUATION,
  name: 'Initial Situation',
  description:
    'Baseline state before implementation begins. Documents the current state of the system, codebase, or component before any implementation work starts.',
  interfaceName: '_Section_8_1_1_InitialSituation_',
  businessPurpose:
    'Establish a clear baseline state before implementation begins to understand the starting point and track changes during implementation.',
  questionsItAnswers: [
    'What is the current state before implementation begins?',
    'What existing code or systems are we building upon?',
    'What are the current constraints and limitations?',
    'What is the baseline for measuring implementation progress?',
  ],
  validationRules: [
    'Must document the current state before implementation begins',
    'Should include existing code, systems, and constraints',
    'Required for Tasks only (not applicable for Plans)',
    'Must provide clear baseline for implementation tracking',
  ],
  usageGuidelines: [
    'Document the current state of the system or codebase',
    'Include existing code, dependencies, and constraints',
    'Describe the current limitations and what needs to be changed',
    'Provide context for why implementation is needed',
    'Use this as a baseline for tracking implementation progress',
  ],
  examples: [
    {
      context: 'Task Implementation Baseline',
      description: 'Current state before implementing a new feature',
      content: {
        currentState:
          'The system currently has basic console logging with no structured logging capabilities. The existing logger.ts file only supports console output and lacks transport abstraction.',
        existingCode: 'Current logger.ts contains a simple Logger class with console.log methods',
        constraints: 'Must maintain backward compatibility with existing logging calls',
        limitations: 'No support for different log levels, file output, or remote logging',
      },
    },
    {
      context: 'System Integration Baseline',
      description: 'Current state before integrating with external system',
      content: {
        currentState: 'The application currently operates in isolation with no external API integrations',
        existingCode: 'Basic HTTP client exists but no authentication or error handling',
        constraints: 'Must work with existing authentication system',
        limitations: 'No retry logic, rate limiting, or comprehensive error handling',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting the current reality, not future plans',
    'Include both positive aspects and limitations of current state',
    'Provide clear context for why implementation is needed',
    'Document existing code, systems, and constraints',
    'Establish a clear baseline for implementation tracking',
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
        description: 'Unique identifier for the initial situation section',
        applicability: {
          plan: 'omitted',
          task: 'required',
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
        description: 'Timestamp when the initial situation section was created',
        applicability: {
          plan: 'omitted',
          task: 'required',
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
        description: 'Timestamp when the initial situation section was last updated',
        applicability: {
          plan: 'omitted',
          task: 'required',
        },
      },
    },
    currentState: {
      name: 'currentState',
      label: 'Current State',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of the current state before implementation begins',
        applicability: {
          plan: 'omitted',
          task: 'required',
        },
      },
    },
    existingCode: {
      name: 'existingCode',
      label: 'Existing Code',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of existing code, systems, and components',
        applicability: {
          plan: 'omitted',
          task: 'required',
        },
      },
    },
    constraints: {
      name: 'constraints',
      label: 'Constraints',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current constraints and limitations that must be considered',
        applicability: {
          plan: 'omitted',
          task: 'required',
        },
      },
    },
    limitations: {
      name: 'limitations',
      label: 'Limitations',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current limitations and what needs to be changed',
        applicability: {
          plan: 'omitted',
          task: 'required',
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
          plan: 'omitted',
          task: 'required',
        },
      },
    },
  },
} as const;
