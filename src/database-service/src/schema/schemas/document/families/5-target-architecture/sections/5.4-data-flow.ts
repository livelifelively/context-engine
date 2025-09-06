import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 5.4: Data Flow
export const SECTION_5_4_DATA_FLOW = '5.4' as const;
export const SECTION_NAME = 'data flow' as const;

export const section_5_4_data_flow = {
  id: SECTION_5_4_DATA_FLOW,
  name: 'Data Flow',
  description:
    'Documentation of how data should flow through the target system, including data sources, transformations, and destinations. This includes target data movement analysis.',
  interfaceName: '_Section_5_4_DataFlow_',
  businessPurpose: 'Define the target state of data flow patterns to guide future data processing and movement design.',
  questionsItAnswers: [
    'How should data flow through the target system?',
    'What should be the target data sources and destinations?',
    'What data transformations should occur?',
    'What should be the target data flow patterns and optimizations?',
  ],
  validationRules: [
    'Must document target data flow if applicable',
    'Should include target design patterns and optimizations',
    'For all document types, define desired future state',
    'Include target constraints and performance characteristics',
  ],
  usageGuidelines: [
    'Document desired target data flow, not current reality',
    'Include both functional and non-functional target requirements',
    'Document target design patterns and architectural decisions',
    'Ensure target design aligns with business objectives',
    'Document rationale for target architectural choices',
  ],
  examples: [
    {
      context: 'Target Microservices Architecture',
      description: 'Target data flow in a microservices system',
      content: {
        dataFlow: 'Target description of target data flow patterns through the system',
        dataSources: 'Target target data sources and entry points into the system',
        dataTransformations: 'Target target data transformations and processing steps',
        dataDestinations: 'Target target data destinations and output points from the system',
      },
    },
    {
      context: 'Target Cloud-Native Architecture',
      description: 'Target data flow in a cloud-native system',
      content: {
        dataFlow: 'Target cloud-native description of target data flow patterns through the system',
        dataSources: 'Target cloud-native target data sources and entry points into the system',
        dataTransformations: 'Target cloud-native target data transformations and processing steps',
        dataDestinations: 'Target cloud-native target data destinations and output points from the system',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target data flow reality, not current state',
    'Include both positive goals and constraints for target design',
    'Document target architectural decisions and their business justification',
    'Ensure target design supports overall system objectives',
    'Provide context for why target data flow decisions were made',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    dataFlow: {
      name: 'dataFlow',
      label: 'Data Flow',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of target data flow patterns through the system',
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
        description: 'Target data sources and entry points into the system',
        applicability: {
          plan: 'required',
          task: 'required',
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
        description: 'Target data transformations and processing steps',
        applicability: {
          plan: 'required',
          task: 'required',
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
        description: 'Target data destinations and output points from the system',
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
