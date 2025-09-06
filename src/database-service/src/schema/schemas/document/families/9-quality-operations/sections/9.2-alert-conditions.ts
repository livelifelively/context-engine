import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 9.2: Alert Conditions
export const SECTION_9_2_ALERT_CONDITIONS = '9.2' as const;
export const SECTION_NAME = 'alert conditions' as const;

export const section_9_2_alert_conditions = {
  id: SECTION_9_2_ALERT_CONDITIONS,
  name: 'Alert Conditions',
  description:
    'Alert conditions and their corresponding event types for event-driven systems. Defines monitoring and alerting strategy.',
  interfaceName: '_Section_9_2_AlertConditions_',
  businessPurpose:
    'Define comprehensive alert conditions and monitoring strategy to ensure system reliability and operational excellence.',
  questionsItAnswers: [
    'What alert conditions need to be monitored?',
    'What event types trigger alerts and notifications?',
    'How are alerts categorized and prioritized?',
    'What response strategies are implemented for different alerts?',
  ],
  validationRules: [
    'Must define comprehensive alert conditions and monitoring strategy',
    'Should include alert conditions with clear event types',
    'Must specify alert categorization and prioritization',
    'Should cover response strategies for different alert types',
  ],
  usageGuidelines: [
    'Use this section to define comprehensive alert conditions and monitoring',
    'Include alert conditions with clear event types and triggers',
    'Specify alert categorization, prioritization, and escalation procedures',
    'Define response strategies for different alert types and severity levels',
    'Cover both system-level and business-level alert conditions',
  ],
  examples: [
    {
      context: 'Comprehensive Alerting Strategy',
      description: 'Complete alerting strategy for a production system',
      content: {
        alertConditions: 'System performance, error rates, resource utilization, and business metrics',
        eventTypes: 'Critical, warning, and info level events with appropriate triggers',
        categorization: 'Alert categorization by system component and business impact',
        responseStrategies: 'Automated responses, escalation procedures, and recovery actions',
      },
    },
    {
      context: 'Event-Driven System Alerting',
      description: 'Alerting strategy for event-driven system with multiple consumers',
      content: {
        alertConditions: 'Event processing failures, consumer health, and system integration issues',
        eventTypes: 'Event-driven alerts with consumer-specific conditions and triggers',
        categorization: 'Alert categorization by event type, consumer, and system impact',
        responseStrategies: 'Event-driven responses, consumer recovery, and system health monitoring',
      },
    },
  ],
  aiInstructions: [
    'Focus on comprehensive alert conditions and monitoring strategy',
    'Include alert conditions with clear event types and triggers',
    'Specify alert categorization, prioritization, and escalation procedures',
    'Define response strategies for different alert types and severity levels',
    'Cover both system-level and business-level alert conditions',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    alertConditions: {
      name: 'alertConditions',
      label: 'Alert Conditions',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Alert conditions and monitoring requirements',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    eventTypes: {
      name: 'eventTypes',
      label: 'Event Types',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Event types and triggers for alerts and notifications',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    categorization: {
      name: 'categorization',
      label: 'Categorization',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Alert categorization and prioritization approach',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    responseStrategies: {
      name: 'responseStrategies',
      label: 'Response Strategies',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Response strategies and procedures for different alert types',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_9_QUALITY_STANDARDS_OPERATIONS, SECTION_NAME),
  },
} as const;
