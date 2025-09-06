import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 7.2: Logging & Monitoring
export const SECTION_7_2_LOGGING_MONITORING = '7.2' as const;
export const SECTION_NAME = 'logging & monitoring' as const;

export const section_7_2_logging_monitoring = {
  id: SECTION_7_2_LOGGING_MONITORING,
  name: 'Logging & Monitoring',
  description:
    'Documentation of target observability strategy and monitoring requirements. This includes target logging, monitoring, and observability practices.',
  interfaceName: '_Section_7_2_LoggingMonitoring_',
  businessPurpose:
    'Define the target state of logging and monitoring to guide future observability design and implementation.',
  questionsItAnswers: [
    'What logging should be implemented in the target system?',
    'What monitoring tools and strategies should be in place?',
    'What should be the target observability practices and procedures?',
    'How should system health be tracked and reported in the future?',
  ],
  validationRules: [
    'Must define target logging and monitoring strategy and requirements',
    'Should include target observability tools and strategies',
    'For all document types, define desired future observability state',
    'Include target health checking and alerting mechanisms',
  ],
  usageGuidelines: [
    'Document desired target logging and monitoring practices, not current reality',
    'Include both functional and non-functional observability requirements',
    'Document target observability tools and their usage',
    'Ensure target observability aligns with business objectives',
    'Document rationale for target observability decisions',
  ],
  examples: [
    {
      context: 'Comprehensive Observability Strategy',
      description: 'Target logging and monitoring for a production system',
      content: {
        logging: 'Structured logging with centralized collection and analysis',
        monitoring: 'Comprehensive monitoring with automated health checks',
        metrics: 'Detailed metrics collection with performance analysis',
        alerting: 'Automated alerting with intelligent notification routing',
      },
    },
    {
      context: 'Cloud-Native Observability',
      description: 'Target logging and monitoring for a cloud-native system',
      content: {
        logging: 'Cloud-native logging with distributed tracing',
        monitoring: 'Service mesh observability with automated scaling',
        metrics: 'Cloud-native metrics with real-time analysis',
        alerting: 'Cloud-native alerting with intelligent automation',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target observability reality, not current state',
    'Include both positive goals and constraints for target observability',
    'Document target observability decisions and their business justification',
    'Ensure target observability supports overall system objectives',
    'Provide context for why target observability decisions were made',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    logging: {
      name: 'logging',
      label: 'Logging',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target logging implementation and practices',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    monitoring: {
      name: 'monitoring',
      label: 'Monitoring',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target monitoring tools and strategies',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    metrics: {
      name: 'metrics',
      label: 'Metrics',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target metrics collection and analysis practices',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    alerting: {
      name: 'alerting',
      label: 'Alerting',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target alerting mechanisms and procedures',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_7_TARGET_MAINTENANCE_MONITORING, SECTION_NAME),
  },
} as const;
