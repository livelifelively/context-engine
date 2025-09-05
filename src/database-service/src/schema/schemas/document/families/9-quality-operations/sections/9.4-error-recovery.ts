import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 9.4: Error Recovery
export const SECTION_9_4_ERROR_RECOVERY = '9.4' as const;

export const section_9_4_error_recovery = {
  id: SECTION_9_4_ERROR_RECOVERY,
  name: 'Error Recovery',
  description:
    'Multi-level error recovery strategies for event-driven systems. Defines comprehensive error recovery approaches and procedures.',
  interfaceName: '_Section_9_4_ErrorRecovery_',
  businessPurpose:
    'Define comprehensive multi-level error recovery strategies to ensure system resilience and operational continuity.',
  questionsItAnswers: [
    'What multi-level error recovery strategies are implemented?',
    'How are errors handled at different system levels?',
    'What recovery procedures and fallback mechanisms are in place?',
    'How is system resilience and continuity ensured?',
  ],
  validationRules: [
    'Must define comprehensive multi-level error recovery strategies',
    'Should include error handling at different system levels',
    'Must specify recovery procedures and fallback mechanisms',
    'Should cover system resilience and continuity procedures',
  ],
  usageGuidelines: [
    'Use this section to define comprehensive error recovery strategies',
    'Include multi-level error handling and recovery procedures',
    'Specify fallback mechanisms and system resilience approaches',
    'Define recovery procedures for different error types and severity levels',
    'Cover both automated recovery and manual intervention procedures',
  ],
  examples: [
    {
      context: 'Multi-Level Error Recovery',
      description: 'Comprehensive error recovery strategy for production system',
      content: {
        recoveryLevels: 'Parser level, consumer level, and system level error recovery',
        recoveryProcedures: 'Automated recovery, fallback mechanisms, and manual intervention',
        fallbackMechanisms: 'Circuit breakers, retry logic, and graceful degradation',
        systemResilience: 'System health monitoring and continuity procedures',
      },
    },
    {
      context: 'Event-Driven System Error Recovery',
      description: 'Error recovery for event-driven system with multiple components',
      content: {
        recoveryLevels: 'Event level, consumer level, and system level error recovery',
        recoveryProcedures: 'Event-driven recovery with consumer health monitoring',
        fallbackMechanisms: 'Event-driven fallbacks, dead letter queues, and consumer recovery',
        systemResilience: 'Event-driven system health monitoring and continuity',
      },
    },
  ],
  aiInstructions: [
    'Focus on comprehensive multi-level error recovery strategies',
    'Include error handling at different system levels',
    'Specify recovery procedures and fallback mechanisms',
    'Define system resilience and continuity procedures',
    'Cover both automated recovery and manual intervention procedures',
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
        description: 'Unique identifier for the error recovery section',
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
        description: 'Timestamp when the error recovery section was created',
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
        description: 'Timestamp when the error recovery section was last updated',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    recoveryLevels: {
      name: 'recoveryLevels',
      label: 'Recovery Levels',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Multi-level error recovery strategies and approaches',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    recoveryProcedures: {
      name: 'recoveryProcedures',
      label: 'Recovery Procedures',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Error recovery procedures and fallback mechanisms',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    fallbackMechanisms: {
      name: 'fallbackMechanisms',
      label: 'Fallback Mechanisms',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Fallback mechanisms and system resilience approaches',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    systemResilience: {
      name: 'systemResilience',
      label: 'System Resilience',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'System resilience and continuity procedures',
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
