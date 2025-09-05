import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 5.6.1: Upstream Integrations
export const SECTION_5_6_1_UPSTREAM_INTEGRATIONS = '5.6.1' as const;

export const section_5_6_1_upstream_integrations = {
  id: SECTION_5_6_1_UPSTREAM_INTEGRATIONS,
  name: 'Upstream Integrations',
  description: 'Documentation of target systems that this scope should consume from, including target systems this scope should consume analysis.',
  interfaceName: '_Section_5_6_1_UpstreamIntegrations_',
  businessPurpose: 'Define the target state of upstream integrations to guide future data source and dependency design.',
  questionsItAnswers: [
    'What systems should the target scope consume from?',
    'What should be the target upstream data sources?',
    'How should the system receive data from upstream systems in the future?',
    'What should be the target upstream integration patterns and optimizations?',
  ],
  validationRules: [
    'Must document target upstream integrations if applicable',
    'Should include target design patterns and optimizations',
    'For all document types, define desired future state',
    'Include target constraints and performance characteristics',
  ],
  usageGuidelines: [
    'Document desired target upstream integrations, not current reality',
    'Include both functional and non-functional target requirements',
    'Document target design patterns and architectural decisions',
    'Ensure target design aligns with business objectives',
    'Document rationale for target architectural choices',
  ],
  examples: [
    {
      context: 'Target Microservices Architecture',
      description: 'Target upstream integrations in a microservices system',
      content: {
        upstreamSystems: 'Target target upstream systems that this scope should consume from',
        dataSources: 'Target target upstream data sources and their types',
        integrationPatterns: 'Target target upstream integration patterns and protocols',
        consumptionMethods: 'Target target methods to be used for consuming data from upstream systems',
      },
    },
    {
      context: 'Target Cloud-Native Architecture',
      description: 'Target upstream integrations in a cloud-native system',
      content: {
        upstreamSystems: 'Target cloud-native target upstream systems that this scope should consume from',
        dataSources: 'Target cloud-native target upstream data sources and their types',
        integrationPatterns: 'Target cloud-native target upstream integration patterns and protocols',
        consumptionMethods: 'Target cloud-native target methods to be used for consuming data from upstream systems',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target upstream integrations reality, not current state',
    'Include both positive goals and constraints for target design',
    'Document target architectural decisions and their business justification',
    'Ensure target design supports overall system objectives',
    'Provide context for why target upstream integrations decisions were made',
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
        description: 'Unique identifier for the upstream integrations section',
        applicability: {
          plan: 'required',
          task: 'required',
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
          task: 'required',
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
          task: 'required',
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
        description: 'Target upstream systems that this scope should consume from',
        applicability: {
          plan: 'required',
          task: 'required',
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
        description: 'Target upstream data sources and their types',
        applicability: {
          plan: 'required',
          task: 'required',
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
        description: 'Target upstream integration patterns and protocols',
        applicability: {
          plan: 'required',
          task: 'required',
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
        description: 'Target methods to be used for consuming data from upstream systems',
        applicability: {
          plan: 'required',
          task: 'required',
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
        type: '_Family_5_TargetArchitecture_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent target architecture family',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
  },
} as const;
