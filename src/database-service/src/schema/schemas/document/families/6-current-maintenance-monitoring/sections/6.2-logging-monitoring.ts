import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 6.2: Logging & Monitoring
export const SECTION_6_2_LOGGING_MONITORING = '6.2' as const;
export const SECTION_NAME = 'logging & monitoring' as const;

export const section_6_2_logging_monitoring = {
  id: SECTION_6_2_LOGGING_MONITORING,
  name: 'Logging & Monitoring',
  description:
    'Documentation of current observability analysis and existing logging/monitoring setup. This includes current monitoring strategies and tools.',
  interfaceName: '_Section_6_2_LoggingMonitoring_',
  businessPurpose:
    'Capture the current state of logging and monitoring to understand existing observability practices before planning improvements or new implementations.',
  questionsItAnswers: [
    'What logging is currently implemented in the system?',
    'What monitoring tools and strategies are currently in place?',
    'What are the current observability practices and procedures?',
    'How is system health currently tracked and reported?',
  ],
  validationRules: [
    'Must document current logging and monitoring setup if they exist',
    'Should include current observability tools and strategies',
    'For green field projects, indicate no current logging/monitoring exists',
    'Include current health checking and alerting mechanisms',
  ],
  usageGuidelines: [
    'Document actual current logging and monitoring practices, not planned future ones',
    'Include both formal monitoring and informal practices',
    'Document current observability tools and their usage',
    'For legacy systems, capture existing monitoring patterns',
    'For green field projects, clearly indicate absence of current logging/monitoring',
  ],
  examples: [
    {
      context: 'Legacy System with Basic Logging',
      description: 'Current logging and monitoring in an existing system',
      content: {
        logging: 'Console logging, basic file logging, no structured logging',
        monitoring: 'Manual health checks, no automated monitoring',
        metrics: 'No metrics collection, basic performance tracking',
        alerting: 'No automated alerting, manual issue detection',
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing logging or monitoring',
      content: {
        logging: 'No current logging exists - this is a new system being designed',
        monitoring: 'N/A - No existing monitoring practices',
        metrics: 'N/A - No existing metrics collection',
        alerting: 'N/A - No existing alerting mechanisms',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current observability reality, not future plans',
    'Include both positive aspects and limitations of current practices',
    'For green field projects, clearly state the absence of current logging/monitoring',
    'Document current observability constraints and limitations',
    'Provide context for why current observability decisions were made',
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
        description: 'Current logging implementation and practices',
        applicability: {
          plan: 'required',
          task: 'omitted',
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
        description: 'Current monitoring tools and strategies',
        applicability: {
          plan: 'required',
          task: 'omitted',
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
        description: 'Current metrics collection and analysis practices',
        applicability: {
          plan: 'required',
          task: 'omitted',
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
        description: 'Current alerting mechanisms and procedures',
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
