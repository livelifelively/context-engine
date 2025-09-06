import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 6.1: Error Handling
export const SECTION_6_1_ERROR_HANDLING = '6.1' as const;
export const SECTION_NAME = 'error handling' as const;

export const section_6_1_error_handling = {
  id: SECTION_6_1_ERROR_HANDLING,
  name: 'Error Handling',
  description:
    'Documentation of current error handling analysis and existing error scenarios. This includes current error handling patterns and procedures.',
  interfaceName: '_Section_6_1_ErrorHandling_',
  businessPurpose:
    'Capture the current state of error handling to understand existing error management practices before planning improvements or new implementations.',
  questionsItAnswers: [
    'How are errors currently handled in the system?',
    'What error scenarios currently exist?',
    'What are the current error handling patterns and procedures?',
    'How are errors currently logged and reported?',
  ],
  validationRules: [
    'Must document current error handling patterns if they exist',
    'Should include current error scenarios and their handling',
    'For green field projects, indicate no current error handling exists',
    'Include current error logging and reporting mechanisms',
  ],
  usageGuidelines: [
    'Document actual current error handling practices, not planned future ones',
    'Include both formal error handling and informal practices',
    'Document current error scenarios and their resolution procedures',
    'For legacy systems, capture existing error handling patterns',
    'For green field projects, clearly indicate absence of current error handling',
  ],
  examples: [
    {
      context: 'Legacy System with Basic Error Handling',
      description: 'Current error handling in an existing system',
      content: {
        errorScenarios: 'Basic error logging to console, manual error investigation',
        errorHandling: 'Simple try-catch blocks, basic error messages',
        errorReporting: 'Console output, manual error tracking',
        errorRecovery: 'Manual restart procedures, basic error recovery',
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing error handling',
      content: {
        errorScenarios: 'No current error scenarios exist - this is a new system being designed',
        errorHandling: 'N/A - No existing error handling practices',
        errorReporting: 'N/A - No existing error reporting mechanisms',
        errorRecovery: 'N/A - No existing error recovery procedures',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current error handling reality, not future plans',
    'Include both positive aspects and limitations of current error handling',
    'For green field projects, clearly state the absence of current error handling',
    'Document current error handling constraints and limitations',
    'Provide context for why current error handling decisions were made',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    errorScenarios: {
      name: 'errorScenarios',
      label: 'Error Scenarios',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current error scenarios and their characteristics',
        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    errorHandling: {
      name: 'errorHandling',
      label: 'Error Handling',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current error handling patterns and procedures',
        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    errorReporting: {
      name: 'errorReporting',
      label: 'Error Reporting',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current error reporting mechanisms and procedures',
        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    errorRecovery: {
      name: 'errorRecovery',
      label: 'Error Recovery',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current error recovery procedures and mechanisms',
        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_6_CURRENT_MAINTENANCE_MONITORING, SECTION_NAME),
  },
} as const;
