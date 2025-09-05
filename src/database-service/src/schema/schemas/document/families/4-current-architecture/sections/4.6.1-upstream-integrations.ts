import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 4.6.1: Upstream Integrations
export const SECTION_4_6_1_UPSTREAM_INTEGRATIONS = '4.6.1' as const;

export const section_4_6_1_upstream_integrations = {
  id: SECTION_4_6_1_UPSTREAM_INTEGRATIONS,
  name: 'Upstream Integrations',
  description:
    'Documentation of current systems that this scope consumes from, including current systems this scope consumes analysis.',
  interfaceName: '_Section_4_6_1_UpstreamIntegrations_',
  businessPurpose:
    'Capture the current state of upstream integrations to understand existing data sources and dependencies that the system currently consumes from.',
  questionsItAnswers: [
    'What systems does the current scope consume from?',
    'What are the current upstream data sources?',
    'How does the system currently receive data from upstream systems?',
    'What are the current upstream integration patterns and constraints?',
  ],
  validationRules: [
    'Must document current upstream systems if integrations exist',
    'Should include current upstream data sources and consumption patterns',
    'For green field projects, indicate no current upstream integrations exist',
    'Include current upstream integration constraints and limitations',
  ],
  usageGuidelines: [
    'Document actual current upstream integrations, not planned future ones',
    'Include both push and pull integration patterns from upstream systems',
    'Document current upstream data formats and protocols',
    'For legacy systems, capture existing upstream integration patterns',
    'For green field projects, clearly indicate absence of current upstream integrations',
  ],
  examples: [
    {
      context: 'Legacy System with External Data Sources',
      description: 'Current upstream integrations in an existing system',
      content: {
        upstreamSystems: 'CRM system, inventory management system, payment gateway',
        dataSources: 'Customer data, product catalog, transaction data',
        integrationPatterns: 'REST API calls, file imports, webhook notifications',
        consumptionMethods: 'Scheduled batch imports, real-time API calls, event-driven updates',
      },
    },
    {
      context: 'Event-Driven System with Message Queues',
      description: 'Current upstream integrations in an existing event-driven architecture',
      content: {
        upstreamSystems: 'User service, order service, payment service',
        dataSources: 'User events, order events, payment events',
        integrationPatterns: 'Event streaming, message queues, event sourcing',
        consumptionMethods: 'Event consumers, stream processors, event handlers',
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing upstream integrations',
      content: {
        upstreamSystems: 'No current upstream systems exist - this is a new system being designed',
        dataSources: 'N/A - No existing upstream data sources',
        integrationPatterns: 'N/A - No existing upstream integration patterns',
        consumptionMethods: 'N/A - No existing upstream consumption methods',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current upstream integration reality, not future plans',
    'Include both positive aspects and technical debt in current upstream integrations',
    'For green field projects, clearly state the absence of current upstream integrations',
    'Document current upstream integration constraints and performance characteristics',
    'Provide context for why current upstream integration decisions were made',
  ],
  fields: {
    id: {

      name: 'id',

      label: 'Id',

      graphql: {

        type: GRAPHQL_TYPES.STRING,

        required: true,

      },

      zod: z.string().min(1),

      metadata: {

        description: 'Unique identifier for the upstream integrations section',

        applicability: {
        plan: 'required',
        task: 'omitted',
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

        description: 'Timestamp when the upstream integrations section was created',

        applicability: {
        plan: 'required',
        task: 'omitted',
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

        description: 'Timestamp when the upstream integrations section was last updated',

        applicability: {
        plan: 'required',
        task: 'omitted',
        project: 'required',
        module: 'required',
        feature: 'required',
      

        },

      },

    },
    upstreamSystems: {

      name: 'upstreamSystems',

      label: 'Upstream Systems',

      graphql: {

        type: GRAPHQL_TYPES.STRING,

        required: true,

      },

      zod: z.string().min(1),

      metadata: {

        description: 'Current upstream systems that this scope consumes from',

        applicability: {
        plan: 'required',
        task: 'omitted',
        project: 'required',
        module: 'required',
        feature: 'required',
      

        },

      },

    },
    dataSources: {

      name: 'dataSources',

      label: 'Data Sources',

      graphql: {

        type: GRAPHQL_TYPES.STRING,

        required: true,

      },

      zod: z.string().min(1),

      metadata: {

        description: 'Current upstream data sources and their types',

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

        description: 'Current upstream integration patterns and protocols',

        applicability: {
        plan: 'required',
        task: 'omitted',
        project: 'required',
        module: 'required',
        feature: 'required',
      

        },

      },

    },
    consumptionMethods: {

      name: 'consumptionMethods',

      label: 'Consumption Methods',

      graphql: {

        type: GRAPHQL_TYPES.STRING,

        required: true,

      },

      zod: z.string().min(1),

      metadata: {

        description: 'Current methods used to consume data from upstream systems',

        applicability: {
        plan: 'required',
        task: 'omitted',
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

        type: '_Family_4_CurrentArchitecture_',

        required: true,

      },

      zod: z.object({}).passthrough(),

      metadata: {

        description: 'Reference to the parent current architecture family',

        applicability: {
        plan: 'required',
        task: 'omitted',
        project: 'required',
        module: 'required',
        feature: 'required',
      

        },

      },

    },
  },
} as const;
