import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 4.6: Integration Points
export const SECTION_4_6_INTEGRATION_POINTS = '4.6' as const;

export const section_4_6_integration_points = {
  id: SECTION_4_6_INTEGRATION_POINTS,
  name: 'Integration Points',
  description:
    'Documentation of current external system boundaries and integration points. This includes current external system boundaries analysis.',
  interfaceName: '_Section_4_6_IntegrationPoints_',
  businessPurpose:
    'Capture the current state of integration points to understand existing external system connections and boundaries before making changes or planning new features.',
  questionsItAnswers: [
    'What are the current external system boundaries?',
    'How does the system currently integrate with external systems?',
    'What are the current integration patterns and protocols?',
    'What are the current integration constraints and limitations?',
  ],
  validationRules: [
    'Must document current external system boundaries if integrations exist',
    'Should include current integration patterns and protocols',
    'For green field projects, indicate no current integrations exist',
    'Include current integration constraints and limitations',
  ],
  usageGuidelines: [
    'Document actual current integration points, not planned future ones',
    'Include both inbound and outbound integration patterns',
    'Document current integration protocols and data formats',
    'For legacy systems, capture existing integration patterns',
    'For green field projects, clearly indicate absence of current integrations',
  ],
  examples: [
    {
      context: 'Legacy System with External APIs',
      description: 'Current integration points in an existing system',
      content: {
        integrationPoints: 'REST API endpoints, SOAP services, file-based integrations',
        externalSystems: 'Payment gateway, CRM system, inventory management system',
        integrationPatterns: 'Synchronous REST calls, batch file processing, webhook notifications',
        systemBoundaries: 'API gateway, message queues, shared databases',
      },
    },
    {
      context: 'Microservices with Event Streaming',
      description: 'Current integration points in an existing microservices architecture',
      content: {
        integrationPoints: 'Event streams, API gateways, service mesh',
        externalSystems: 'Third-party APIs, legacy systems, cloud services',
        integrationPatterns: 'Event-driven integration, API composition, circuit breakers',
        systemBoundaries: 'Service boundaries, event boundaries, data boundaries',
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing integrations',
      content: {
        integrationPoints: 'No current integration points exist - this is a new system being designed',
        externalSystems: 'N/A - No existing external system connections',
        integrationPatterns: 'N/A - No existing integration patterns',
        systemBoundaries: 'N/A - No existing system boundaries',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current integration reality, not future plans',
    'Include both positive aspects and technical debt in current integrations',
    'For green field projects, clearly state the absence of current integrations',
    'Document current integration constraints and performance characteristics',
    'Provide context for why current integration decisions were made',
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

        description: 'Unique identifier for the integration points section',

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

        description: 'Timestamp when the integration points section was created',

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

        description: 'Timestamp when the integration points section was last updated',

        applicability: {
        plan: 'required',
        task: 'omitted',
        project: 'required',
        module: 'required',
        feature: 'required',
      

        },

      },

    },
    integrationPoints: {

      name: 'integrationPoints',

      label: 'Integration Points',

      graphql: {

        type: GRAPHQL_TYPES.STRING,

        required: true,

      },

      zod: z.string().min(1),

      metadata: {

        description: 'Description of current integration points and external system connections',

        applicability: {
        plan: 'required',
        task: 'omitted',
        project: 'required',
        module: 'required',
        feature: 'required',
      

        },

      },

    },
    externalSystems: {

      name: 'externalSystems',

      label: 'External Systems',

      graphql: {

        type: GRAPHQL_TYPES.STRING,

        required: true,

      },

      zod: z.string().min(1),

      metadata: {

        description: 'Current external systems and their connection points',

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

        description: 'Current integration patterns and protocols used',

        applicability: {
        plan: 'required',
        task: 'omitted',
        project: 'required',
        module: 'required',
        feature: 'required',
      

        },

      },

    },
    systemBoundaries: {

      name: 'systemBoundaries',

      label: 'System Boundaries',

      graphql: {

        type: GRAPHQL_TYPES.STRING,

        required: true,

      },

      zod: z.string().min(1),

      metadata: {

        description: 'Current system boundaries and integration constraints',

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
