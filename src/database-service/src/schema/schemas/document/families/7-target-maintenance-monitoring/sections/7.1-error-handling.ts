import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 7.1: Error Handling
export const SECTION_7_1_ERROR_HANDLING = '7.1' as const;

export const section_7_1_error_handling = {
  id: SECTION_7_1_ERROR_HANDLING,
  name: 'Error Handling',
  description:
    'Documentation of target error handling strategy and implementation requirements. This includes target error scenarios and handling procedures.',
  interfaceName: '_Section_7_1_ErrorHandling_',
  businessPurpose:
    'Define the target state of error handling to guide future error management design and implementation.',
  questionsItAnswers: [
    'How should errors be handled in the target system?',
    'What error scenarios should be supported?',
    'What should be the target error handling patterns and procedures?',
    'How should errors be logged and reported in the future?',
  ],
  validationRules: [
    'Must define target error handling strategy and requirements',
    'Should include target error scenarios and their handling',
    'For all document types, define desired future error handling state',
    'Include target error logging and reporting mechanisms',
  ],
  usageGuidelines: [
    'Document desired target error handling practices, not current reality',
    'Include both functional and non-functional error handling requirements',
    'Document target error scenarios and their resolution procedures',
    'Ensure target error handling aligns with business objectives',
    'Document rationale for target error handling decisions',
  ],
  examples: [
    {
      context: 'Comprehensive Error Handling Strategy',
      description: 'Target error handling for a production system',
      content: {
        errorScenarios: 'Comprehensive error scenarios with structured handling',
        errorHandling: 'Structured error handling with automated recovery',
        errorReporting: 'Automated error reporting with detailed context',
        errorRecovery: 'Automated error recovery with fallback procedures',
      },
    },
    {
      context: 'Cloud-Native Error Handling',
      description: 'Target error handling for a cloud-native system',
      content: {
        errorScenarios: 'Cloud-native error scenarios with distributed handling',
        errorHandling: 'Cloud-native error handling with circuit breakers',
        errorReporting: 'Distributed error reporting with tracing',
        errorRecovery: 'Automated recovery with cloud-native patterns',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target error handling reality, not current state',
    'Include both positive goals and constraints for target error handling',
    'Document target error handling decisions and their business justification',
    'Ensure target error handling supports overall system objectives',
    'Provide context for why target error handling decisions were made',
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
        description: 'Unique identifier for the error handling section',
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
        description: 'Timestamp when the error handling section was created',
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
        description: 'Timestamp when the error handling section was last updated',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    errorScenarios: {
      name: 'errorScenarios',
      label: 'Error Scenarios',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target error scenarios and their characteristics',
        applicability: {
          plan: 'required',
          task: 'required',
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
        description: 'Target error handling patterns and procedures',
        applicability: {
          plan: 'required',
          task: 'required',
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
        description: 'Target error reporting mechanisms and procedures',
        applicability: {
          plan: 'required',
          task: 'required',
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
        description: 'Target error recovery procedures and mechanisms',
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
        type: '_Family_7_TargetMaintenanceMonitoring_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent target maintenance & monitoring family',
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
