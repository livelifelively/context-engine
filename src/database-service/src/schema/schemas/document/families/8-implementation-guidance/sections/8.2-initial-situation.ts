import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 8.2: Initial Situation
export const SECTION_8_2_INITIAL_SITUATION = '8.2' as const;
export const SECTION_NAME = 'initial situation' as const;

export const section_8_2_initial_situation = {
  id: SECTION_8_2_INITIAL_SITUATION,
  name: 'Initial Situation',
  description:
    'Baseline state before implementation begins. Documents the current state of the system, codebase, or component before any implementation work starts.',
  interfaceName: '_Section_8_2_InitialSituation_',
  businessPurpose:
    'Establish a clear baseline state before implementation begins to understand the starting point and track changes during implementation.',
  questionsItAnswers: [
    'What is the current state before implementation begins?',
    'What exists in the codebase or system currently?',
    'What are the baseline conditions and constraints?',
    'What is the starting point for this implementation?',
  ],
  validationRules: [
    'Must document the baseline state before implementation',
    'Should include current system state and constraints',
    'Required for Tasks only (not applicable for Plans)',
    'Must provide clear context for implementation starting point',
  ],
  usageGuidelines: [
    'Use this section to document the current state before implementation',
    'Include both technical and business context',
    'Document existing code, systems, and constraints',
    'Provide clear baseline for tracking implementation progress',
    'Update as needed if baseline changes during implementation',
  ],
  examples: [
    {
      context: 'New Feature Implementation',
      description: 'Initial situation for implementing a new logging feature',
      content: {
        initialSituation:
          'Current system has basic console logging only. No structured logging, no log levels, and no centralized log management. The codebase has 15 modules that currently use console.log() for debugging.',
      },
    },
    {
      context: 'System Refactoring',
      description: 'Initial situation for refactoring an existing system',
      content: {
        initialSituation:
          'Current system uses monolithic architecture with tightly coupled components. Database layer is directly embedded in business logic. No separation of concerns between data access and business rules.',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting the current state before implementation begins',
    'Include both technical and business context',
    'Provide clear baseline for understanding implementation starting point',
    'Document existing constraints and dependencies',
    'Be specific about current system state and limitations',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    initialSituation: {
      name: 'initialSituation',
      label: 'Initial Situation',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of the baseline state before implementation begins',
        applicability: {
          plan: 'omitted',
          task: 'required',
        },
      },
    },
    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_8_IMPLEMENTATION_GUIDANCE, SECTION_NAME),
  },
} as const;
