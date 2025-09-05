import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 4.3: Components
export const SECTION_4_3_COMPONENTS = '4.3' as const;

export const section_4_3_components = {
  id: SECTION_4_3_COMPONENTS,
  name: 'Components',
  description:
    'Documentation of the current system components, their responsibilities, and how they are organized. This includes current component relationships analysis.',
  interfaceName: '_Section_4_3_Components_',
  businessPurpose:
    'Capture the current state of system components and their relationships to understand existing system structure before making changes or planning new features.',
  questionsItAnswers: [
    'What components currently exist in the system?',
    'How are components currently organized and structured?',
    'What are the current component responsibilities and boundaries?',
    'How do components currently interact with each other?',
  ],
  validationRules: [
    'Must document current component relationships if components exist',
    'Should include current system boundaries and responsibilities',
    'For green field projects, indicate no current components exist',
    'Include current component interaction patterns',
  ],
  usageGuidelines: [
    'Document actual current components, not planned future ones',
    'Include both logical and physical component aspects',
    'Document current component boundaries and responsibilities',
    'For legacy systems, capture existing component patterns',
    'For green field projects, clearly indicate absence of current components',
  ],
  examples: [
    {
      context: 'Legacy Monolithic System',
      description: 'Current components in an existing monolithic application',
      content: {
        components: 'Single monolithic application with modules: UserManagement, OrderProcessing, InventoryManagement',
        componentRelationships: 'All modules share the same database and are deployed together',
        systemBoundaries: 'Single application boundary with external API endpoints',
      },
    },
    {
      context: 'Microservices System',
      description: 'Current components in an existing microservices architecture',
      content: {
        components: 'User Service, Order Service, Payment Service, Notification Service',
        componentRelationships: 'Services communicate via REST APIs and message queues',
        systemBoundaries: 'Each service has its own database and deployment boundary',
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing components',
      content: {
        components: 'No current components exist - this is a new system being designed',
        componentRelationships: 'N/A - No existing component relationships',
        systemBoundaries: 'N/A - No existing system boundaries',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current component reality, not future plans',
    'Include both positive aspects and technical debt in current components',
    'For green field projects, clearly state the absence of current components',
    'Document current component interaction patterns and dependencies',
    'Provide context for why current component decisions were made',
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
        description: 'Unique identifier for the components section',
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
        description: 'Timestamp when the components section was created',
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
        description: 'Timestamp when the components section was last updated',
        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    components: {
      name: 'components',
      label: 'Components',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of current system components and their organization',
        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    componentRelationships: {
      name: 'componentRelationships',
      label: 'Component Relationships',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current component relationships and interaction patterns',
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
        description: 'Current system boundaries and component responsibilities',
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
