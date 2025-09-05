import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 4.2: Data Models
export const SECTION_4_2_DATA_MODELS = '4.2' as const;

export const section_4_2_data_models = {
  id: SECTION_4_2_DATA_MODELS,
  name: 'Data Models',
  description:
    'Documentation of the current data models, entity relationships, and database schema that exist in the system. This includes current entity relationships analysis.',
  interfaceName: '_Section_4_2_DataModels_',
  businessPurpose:
    'Capture the current state of data models and entity relationships to understand existing data structures before making changes or planning new features.',
  questionsItAnswers: [
    'What data models currently exist in the system?',
    'How are entities currently related to each other?',
    'What is the current database schema structure?',
    'What data constraints and relationships are currently enforced?',
  ],
  validationRules: [
    'Must document current entity relationships if data models exist',
    'Should include current database schema if applicable',
    'For green field projects, indicate no current data models exist',
    'Include current data constraints and validation rules',
  ],
  usageGuidelines: [
    'Document actual current data models, not planned future ones',
    'Include both logical and physical data model aspects',
    'Document current data relationships and constraints',
    'For legacy systems, capture existing data model patterns',
    'For green field projects, clearly indicate absence of current models',
  ],
  examples: [
    {
      context: 'Legacy System with Database',
      description: 'Current data models in an existing system',
      content: {
        dataModels: 'Current ERD showing User, Order, Product entities with existing relationships',
        entityRelationships: 'User has many Orders, Order has many OrderItems, Product belongs to Category',
        databaseSchema: 'Current table structures with existing indexes and constraints',
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing data models',
      content: {
        dataModels: 'No current data models exist - this is a new system being designed',
        entityRelationships: 'N/A - No existing entity relationships',
        databaseSchema: 'N/A - No existing database schema',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current data model reality, not future plans',
    'Include both positive aspects and technical debt in current data models',
    'For green field projects, clearly state the absence of current data models',
    'Document current data constraints and validation rules',
    'Provide context for why current data model decisions were made',
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
        description: 'Timestamp when the data models section was created',
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
        description: 'Timestamp when the data models section was last updated',
        applicability: {
          plan: 'required',
          task: 'omitted',
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
        description: 'Description of current data models and entity relationships',
        applicability: {
          plan: 'required',
          task: 'omitted',
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
        description: 'Current entity relationships and their constraints',
        applicability: {
          plan: 'required',
          task: 'omitted',
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
        description: 'Current database schema structure and constraints',
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
