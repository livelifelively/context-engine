import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 4.4: Data Flow
export const SECTION_4_4_DATA_FLOW = '4.4' as const;

export const section_4_4_data_flow = {
  id: SECTION_4_4_DATA_FLOW,
  name: 'Data Flow',
  description:
    'Documentation of how data currently moves through the system, including data sources, transformations, and destinations. This includes current data movement analysis.',
  interfaceName: '_Section_4_4_DataFlow_',
  businessPurpose:
    'Capture the current state of data flow patterns to understand how data moves through the existing system before making changes or planning new features.',
  questionsItAnswers: [
    'How does data currently flow through the system?',
    'What are the current data sources and destinations?',
    'What data transformations currently occur?',
    'What are the current data flow patterns and bottlenecks?',
  ],
  validationRules: [
    'Must document current data movement patterns if data flows exist',
    'Should include current data sources, transformations, and destinations',
    'For green field projects, indicate no current data flows exist',
    'Include current data flow constraints and limitations',
  ],
  usageGuidelines: [
    'Document actual current data flows, not planned future ones',
    'Include both batch and real-time data flow patterns',
    'Document current data transformation and processing steps',
    'For legacy systems, capture existing data flow patterns',
    'For green field projects, clearly indicate absence of current data flows',
  ],
  examples: [
    {
      context: 'Legacy System with Database',
      description: 'Current data flows in an existing system',
      content: {
        dataFlow: 'User input → Web UI → Application Server → Database → Response back to UI',
        dataSources: 'User forms, external APIs, file uploads',
        dataTransformations: 'Input validation, business logic processing, data formatting',
        dataDestinations: 'Database storage, external system APIs, file exports',
      },
    },
    {
      context: 'Event-Driven System',
      description: 'Current data flows in an existing event-driven architecture',
      content: {
        dataFlow: 'Events → Message Queue → Event Processors → Database Updates → New Events',
        dataSources: 'User actions, system events, external system notifications',
        dataTransformations: 'Event processing, business rule application, data aggregation',
        dataDestinations: 'Database updates, external system notifications, analytics storage',
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing data flows',
      content: {
        dataFlow: 'No current data flows exist - this is a new system being designed',
        dataSources: 'N/A - No existing data sources',
        dataTransformations: 'N/A - No existing data transformations',
        dataDestinations: 'N/A - No existing data destinations',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current data flow reality, not future plans',
    'Include both positive aspects and technical debt in current data flows',
    'For green field projects, clearly state the absence of current data flows',
    'Document current data flow constraints and performance characteristics',
    'Provide context for why current data flow decisions were made',
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

        description: 'Unique identifier for the data flow section',

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

        description: 'Timestamp when the data flow section was created',

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

        description: 'Timestamp when the data flow section was last updated',

        applicability: {
        plan: 'required',
        task: 'omitted',
        project: 'required',
        module: 'required',
        feature: 'required',
      

        },

      },

    },
    dataFlow: {

      name: 'dataFlow',

      label: 'Data Flow',

      graphql: {

        type: GRAPHQL_TYPES.STRING,

        required: true,

      },

      zod: z.string().min(1),

      metadata: {

        description: 'Description of current data flow patterns through the system',

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

        description: 'Current data sources and entry points into the system',

        applicability: {
        plan: 'required',
        task: 'omitted',
        project: 'required',
        module: 'required',
        feature: 'required',
      

        },

      },

    },
    dataTransformations: {

      name: 'dataTransformations',

      label: 'Data Transformations',

      graphql: {

        type: GRAPHQL_TYPES.STRING,

        required: true,

      },

      zod: z.string().min(1),

      metadata: {

        description: 'Current data transformations and processing steps',

        applicability: {
        plan: 'required',
        task: 'omitted',
        project: 'required',
        module: 'required',
        feature: 'required',
      

        },

      },

    },
    dataDestinations: {

      name: 'dataDestinations',

      label: 'Data Destinations',

      graphql: {

        type: GRAPHQL_TYPES.STRING,

        required: true,

      },

      zod: z.string().min(1),

      metadata: {

        description: 'Current data destinations and output points from the system',

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
