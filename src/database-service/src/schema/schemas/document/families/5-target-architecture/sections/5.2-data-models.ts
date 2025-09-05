import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 5.2: Data Models
export const SECTION_5_2_DATA_MODELS = '5.2' as const;

export const section_5_2_data_models = {
  id: SECTION_5_2_DATA_MODELS,
  name: 'Data Models',
  description: 'Documentation of the target data models, entity relationships, and database schema that should exist in the system. This includes target entity relationships analysis.',
  interfaceName: '_Section_5_2_DataModels_',
  businessPurpose: 'Define the target state of data models and entity relationships to guide future data structure design and database schema evolution.',
  questionsItAnswers: [
    'What data models should exist in the target system?',
    'How should entities be related to each other in the future?',
    'What should be the target database schema structure?',
    'What data constraints and relationships should be enforced?',
  ],
  validationRules: [
    'Must document target data models if applicable',
    'Should include target design patterns and optimizations',
    'For all document types, define desired future state',
    'Include target constraints and performance characteristics',
  ],
  usageGuidelines: [
    'Document desired target data models, not current reality',
    'Include both functional and non-functional target requirements',
    'Document target design patterns and architectural decisions',
    'Ensure target design aligns with business objectives',
    'Document rationale for target architectural choices',
  ],
  examples: [
    {
      context: 'Target Microservices Architecture',
      description: 'Target data models in a microservices system',
      content: {
        dataModels: 'Target description of target data models and entity relationships',
        entityRelationships: 'Target target entity relationships and their constraints',
        databaseSchema: 'Target target database schema structure and constraints',
      },
    },
    {
      context: 'Target Cloud-Native Architecture',
      description: 'Target data models in a cloud-native system',
      content: {
        dataModels: 'Target cloud-native description of target data models and entity relationships',
        entityRelationships: 'Target cloud-native target entity relationships and their constraints',
        databaseSchema: 'Target cloud-native target database schema structure and constraints',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target data models reality, not current state',
    'Include both positive goals and constraints for target design',
    'Document target architectural decisions and their business justification',
    'Ensure target design supports overall system objectives',
    'Provide context for why target data models decisions were made',
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
        description: 'Unique identifier for the data models section',
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
        description: 'Timestamp when the data models section was created',
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
        description: 'Timestamp when the data models section was last updated',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    dataModels: {
      name: 'dataModels',
      label: 'Data Models',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of target data models and entity relationships',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    entityRelationships: {
      name: 'entityRelationships',
      label: 'Entity Relationships',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target entity relationships and their constraints',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    databaseSchema: {
      name: 'databaseSchema',
      label: 'Database Schema',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target database schema structure and constraints',
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
