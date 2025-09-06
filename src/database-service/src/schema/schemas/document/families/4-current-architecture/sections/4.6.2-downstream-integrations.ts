import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 4.6.2: Downstream Integrations
export const SECTION_4_6_2_DOWNSTREAM_INTEGRATIONS = '4.6.2' as const;
export const SECTION_NAME = 'downstream integrations' as const;

export const section_4_6_2_downstream_integrations = {
  id: SECTION_4_6_2_DOWNSTREAM_INTEGRATIONS,
  name: 'Downstream Integrations',
  description:
    'Documentation of current systems that this scope serves, including current systems this scope serves analysis.',
  interfaceName: '_Section_4_6_2_DownstreamIntegrations_',
  businessPurpose:
    'Capture the current state of downstream integrations to understand existing systems and consumers that the system currently serves.',
  questionsItAnswers: [
    'What systems does the current scope serve?',
    'What are the current downstream consumers?',
    'How does the system currently provide data to downstream systems?',
    'What are the current downstream integration patterns and constraints?',
  ],
  validationRules: [
    'Must document current downstream systems if integrations exist',
    'Should include current downstream consumers and service patterns',
    'For green field projects, indicate no current downstream integrations exist',
    'Include current downstream integration constraints and limitations',
  ],
  usageGuidelines: [
    'Document actual current downstream integrations, not planned future ones',
    'Include both push and pull integration patterns to downstream systems',
    'Document current downstream data formats and protocols',
    'For legacy systems, capture existing downstream integration patterns',
    'For green field projects, clearly indicate absence of current downstream integrations',
  ],
  examples: [
    {
      context: 'Legacy System with External Consumers',
      description: 'Current downstream integrations in an existing system',
      content: {
        downstreamSystems: 'Analytics platform, reporting system, mobile application',
        dataConsumers: 'Business intelligence tools, customer dashboards, third-party APIs',
        integrationPatterns: 'REST API endpoints, file exports, webhook notifications',
        serviceMethods: 'Scheduled data exports, real-time API responses, event notifications',
      },
    },
    {
      context: 'Event-Driven System with Event Publishing',
      description: 'Current downstream integrations in an existing event-driven architecture',
      content: {
        downstreamSystems: 'Analytics service, notification service, audit service',
        dataConsumers: 'Event subscribers, stream processors, data warehouses',
        integrationPatterns: 'Event publishing, message queues, event streaming',
        serviceMethods: 'Event publishers, stream producers, notification senders',
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing downstream integrations',
      content: {
        downstreamSystems: 'No current downstream systems exist - this is a new system being designed',
        dataConsumers: 'N/A - No existing downstream data consumers',
        integrationPatterns: 'N/A - No existing downstream integration patterns',
        serviceMethods: 'N/A - No existing downstream service methods',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current downstream integration reality, not future plans',
    'Include both positive aspects and technical debt in current downstream integrations',
    'For green field projects, clearly state the absence of current downstream integrations',
    'Document current downstream integration constraints and performance characteristics',
    'Provide context for why current downstream integration decisions were made',
  ],
  fields: {
    id: createIdField(SECTION_NAME),
    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),
    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    downstreamSystems: {
      name: 'downstreamSystems',
      label: 'Downstream Systems',
      graphql: {
        type: GRAPHQL_TYPES.STRING,

        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current downstream systems that this scope serves',

        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    dataConsumers: {
      name: 'dataConsumers',
      label: 'Data Consumers',
      graphql: {
        type: GRAPHQL_TYPES.STRING,

        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current downstream data consumers and their types',

        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    integrationPatterns: {
      name: 'integrationPatterns',
      label: 'Integration Patterns',
      graphql: {
        type: GRAPHQL_TYPES.STRING,

        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current downstream integration patterns and protocols',

        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    serviceMethods: {
      name: 'serviceMethods',
      label: 'Service Methods',
      graphql: {
        type: GRAPHQL_TYPES.STRING,

        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current methods used to serve data to downstream systems',

        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_4_CURRENT_ARCHITECTURE, SECTION_NAME),
  },
} as const;
