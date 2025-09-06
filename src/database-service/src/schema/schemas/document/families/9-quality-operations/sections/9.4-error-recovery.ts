import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 9.4: Error Recovery
export const SECTION_9_4_ERROR_RECOVERY = '9.4' as const;
export const SECTION_NAME = 'error recovery' as const;

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
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
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
    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_9_QUALITY_STANDARDS_OPERATIONS, SECTION_NAME),
  },
} as const;
