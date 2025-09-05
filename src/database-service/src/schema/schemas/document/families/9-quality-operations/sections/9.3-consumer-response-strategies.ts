import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 9.3: Consumer Response Strategies
export const SECTION_9_3_CONSUMER_RESPONSE_STRATEGIES = '9.3' as const;

export const section_9_3_consumer_response_strategies = {
  id: SECTION_9_3_CONSUMER_RESPONSE_STRATEGIES,
  name: 'Consumer Response Strategies',
  description:
    'Different response strategies implemented by various event consumers. Defines consumer response approaches and procedures.',
  interfaceName: '_Section_9_3_ConsumerResponseStrategies_',
  businessPurpose:
    'Define comprehensive consumer response strategies to ensure proper handling of events and system interactions.',
  questionsItAnswers: [
    'What response strategies are implemented by event consumers?',
    'How do different consumers handle events and errors?',
    'What consumer-specific response procedures are needed?',
    'How are consumer responses coordinated and managed?',
  ],
  validationRules: [
    'Must define comprehensive consumer response strategies',
    'Should include consumer-specific response procedures',
    'Must specify error handling and recovery approaches',
    'Should cover coordination and management of consumer responses',
  ],
  usageGuidelines: [
    'Use this section to define comprehensive consumer response strategies',
    'Include consumer-specific response procedures and error handling',
    'Specify coordination and management of consumer responses',
    'Define error handling, retry logic, and recovery procedures',
    'Cover both individual consumer responses and system-wide coordination',
  ],
  examples: [
    {
      context: 'Multi-Consumer Response Strategy',
      description: 'Response strategies for multiple event consumers',
      content: {
        consumerStrategies: 'CLI tools, Git hooks, reporting systems, and integration systems',
        responseProcedures: 'Error handling, retry logic, and graceful degradation',
        coordination: 'Consumer coordination and system-wide response management',
        errorHandling: 'Consumer-specific error handling and recovery procedures',
      },
    },
    {
      context: 'Event-Driven System Consumer Responses',
      description: 'Consumer response strategies for event-driven system',
      content: {
        consumerStrategies: 'Event consumers with different response patterns and requirements',
        responseProcedures: 'Event-driven response procedures with proper error handling',
        coordination: 'Event-driven coordination and consumer health monitoring',
        errorHandling: 'Event-driven error handling with consumer recovery and fallback',
      },
    },
  ],
  aiInstructions: [
    'Focus on comprehensive consumer response strategies and procedures',
    'Include consumer-specific response procedures and error handling',
    'Specify coordination and management of consumer responses',
    'Define error handling, retry logic, and recovery procedures',
    'Cover both individual consumer responses and system-wide coordination',
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
        description: 'Unique identifier for the consumer response strategies section',
        applicability: {
          plan: 'required',
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
        description: 'Timestamp when the consumer response strategies section was created',
        applicability: {
          plan: 'required',
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
        description: 'Timestamp when the consumer response strategies section was last updated',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    consumerStrategies: {
      name: 'consumerStrategies',
      label: 'Consumer Strategies',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Consumer response strategies and approaches',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    responseProcedures: {
      name: 'responseProcedures',
      label: 'Response Procedures',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Consumer response procedures and error handling',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    coordination: {
      name: 'coordination',
      label: 'Coordination',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Consumer coordination and system-wide response management',
        applicability: {
          plan: 'required',
          task: 'required',
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
        description: 'Consumer error handling and recovery procedures',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_9_QualityStandardsOperations_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent quality standards & operations family',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
  },
} as const;
