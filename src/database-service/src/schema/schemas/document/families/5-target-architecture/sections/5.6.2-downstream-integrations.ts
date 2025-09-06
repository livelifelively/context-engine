import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 5.6.2: Downstream Integrations
export const SECTION_5_6_2_DOWNSTREAM_INTEGRATIONS = '5.6.2' as const;
export const SECTION_NAME = 'downstream integrations' as const;

export const section_5_6_2_downstream_integrations = {
  id: SECTION_5_6_2_DOWNSTREAM_INTEGRATIONS,
  name: 'Downstream Integrations',
  description:
    'Documentation of target systems that this scope should serve, including target systems this scope should serve analysis.',
  interfaceName: '_Section_5_6_2_DownstreamIntegrations_',
  businessPurpose: 'Define the target state of downstream integrations to guide future service and consumer design.',
  questionsItAnswers: [
    'What systems should the target scope serve?',
    'What should be the target downstream consumers?',
    'How should the system provide data to downstream systems in the future?',
    'What should be the target downstream integration patterns and optimizations?',
  ],
  validationRules: [
    'Must document target downstream integrations if applicable',
    'Should include target design patterns and optimizations',
    'For all document types, define desired future state',
    'Include target constraints and performance characteristics',
  ],
  usageGuidelines: [
    'Document desired target downstream integrations, not current reality',
    'Include both functional and non-functional target requirements',
    'Document target design patterns and architectural decisions',
    'Ensure target design aligns with business objectives',
    'Document rationale for target architectural choices',
  ],
  examples: [
    {
      context: 'Target Microservices Architecture',
      description: 'Target downstream integrations in a microservices system',
      content: {
        downstreamSystems: 'Target target downstream systems that this scope should serve',
        dataConsumers: 'Target target downstream data consumers and their types',
        integrationPatterns: 'Target target downstream integration patterns and protocols',
        serviceMethods: 'Target target methods to be used for serving data to downstream systems',
      },
    },
    {
      context: 'Target Cloud-Native Architecture',
      description: 'Target downstream integrations in a cloud-native system',
      content: {
        downstreamSystems: 'Target cloud-native target downstream systems that this scope should serve',
        dataConsumers: 'Target cloud-native target downstream data consumers and their types',
        integrationPatterns: 'Target cloud-native target downstream integration patterns and protocols',
        serviceMethods: 'Target cloud-native target methods to be used for serving data to downstream systems',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target downstream integrations reality, not current state',
    'Include both positive goals and constraints for target design',
    'Document target architectural decisions and their business justification',
    'Ensure target design supports overall system objectives',
    'Provide context for why target downstream integrations decisions were made',
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
        description: 'Target downstream systems that this scope should serve',
        applicability: {
          plan: 'required',
          task: 'required',
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
        description: 'Target downstream data consumers and their types',
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
        description: 'Target downstream integration patterns and protocols',
        applicability: {
          plan: 'required',
          task: 'required',
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
        description: 'Target methods to be used for serving data to downstream systems',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_5_TARGET_ARCHITECTURE, SECTION_NAME),
  },
} as const;
