/**
 * Section 2.6: Core Business Processes
 *
 * This file contains the complete data object for the Core Business Processes section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section details the key, step-by-step business workflows that the work
 * implements or affects.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';

// =============================================================================
// SECTION IDENTIFIER
// =============================================================================

export const SECTION_2_6_CORE_BUSINESS_PROCESSES = '2.6' as const;

// =============================================================================
// DATA TYPE DEFINITIONS
// =============================================================================

// Business Process data type - used within this section
export const BusinessProcessSchema = z.object({
  name: z.string().min(1),
  participants: z.string().min(1),
  goal: z.string().min(1),
  workflow: z.array(z.string().min(1)).min(1),
});

export type BusinessProcess = z.infer<typeof BusinessProcessSchema>;

export const section_2_6_core_business_processes = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_2_6_CORE_BUSINESS_PROCESSES,
  name: 'Core Business Processes',
  description: 'Key, step-by-step business workflows that the work implements or affects',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_2_6_CoreBusinessProcesses_',

  // Section-level metadata
  businessPurpose: 'Defines the key business processes and workflows that the work implements or affects',

  questionsItAnswers: [
    'What are the core business processes for this task/plan/project/module/feature?',
    'What workflows does this work implement or affect?',
    'Who are the participants in these processes?',
    'What are the goals of each business process?',
  ],

  validationRules: [
    'Must have at least one business process',
    'Each process must have a name, participants, goal, and workflow',
    'Workflow must have at least one step',
  ],

  usageGuidelines: [
    'Should be defined early in the planning process',
    'Must be specific to the work being done',
    'Should detail participants, goals, and step-by-step workflows',
    'Processes should be clear and actionable',
  ],

  examples: [
    {
      context: 'Document processing pipeline',
      data: {
        processes: [
          {
            name: 'Manual Review',
            participants: 'Data Scientist',
            goal: 'To validate the accuracy of automated text extraction from a source PDF',
            workflow: [
              'Analyst selects a document in the "Pending Review" state',
              'The UI displays the source PDF alongside the extracted text',
              'Analyst compares the two and makes corrections to the text',
              'Analyst approves the corrected text, advancing the document to the "Chunking" state',
            ],
          },
          {
            name: 'Document Ingestion',
            participants: 'System Administrator, Data Analyst',
            goal: 'To ingest and prepare documents for processing',
            workflow: [
              'System Administrator uploads PDF documents to the system',
              'System validates document format and structure',
              'Documents are queued for processing',
              'Data Analyst reviews and approves documents for processing',
            ],
          },
        ],
      },
    },
    {
      context: 'User authentication system',
      data: {
        processes: [
          {
            name: 'User Authentication',
            participants: 'End User, Identity Provider, Application',
            goal: 'To securely authenticate users using corporate credentials',
            workflow: [
              'User attempts to access the application',
              'Application redirects user to corporate identity provider',
              'User enters corporate credentials',
              'Identity provider validates credentials and returns authentication token',
              'Application validates token and grants access',
            ],
          },
          {
            name: 'Session Management',
            participants: 'End User, Application',
            goal: 'To manage user sessions and ensure security',
            workflow: [
              'User is authenticated and session is created',
              'Application tracks session activity and timeout',
              'Session expires after configured timeout period',
              'User is redirected to re-authenticate when session expires',
            ],
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help define clear business processes and workflows',
    'Ensure processes include participants, goals, and step-by-step workflows',
    'Suggest additional processes that might be relevant',
    'Help identify missing workflow steps or participants',
  ],

  // =============================================================================
  // FIELD DEFINITIONS
  // =============================================================================

  fields: {
    id: {
      name: 'id',
      label: 'ID',
      graphql: {
        type: GRAPHQL_TYPES.ID,
        required: true,
      },
      zod: z.string().optional(),
      metadata: {
        description: 'Unique identifier for the core business processes section',
        businessPurpose: 'Enables unique identification and referencing',
        questionsItAnswers: ['What is the id of the core business processes section in the database?'],
        validationRules: ['Must be a valid string'],
      },
    },

    sectionCreatedOn: {
      name: 'sectionCreatedOn',
      label: 'Section Created On',
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false,
      },
      zod: z.date().optional(),
      metadata: {
        description: 'Timestamp when the core business processes section was created',
        businessPurpose: 'Provides audit trail and creation tracking',
        questionsItAnswers: ['What is the created on date of the core business processes section?'],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T09:00:00Z'],
      },
    },

    sectionLastUpdatedOn: {
      name: 'sectionLastUpdatedOn',
      label: 'Section Last Updated On',
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false,
      },
      zod: z.date().optional(),
      metadata: {
        description: 'Timestamp when the core business processes section was last updated',
        businessPurpose: 'Enables change tracking and freshness monitoring',
        questionsItAnswers: ['What is the last updated on date of the core business processes section?'],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T14:30:00Z'],
      },
    },

    processes: {
      name: 'processes',
      label: 'Processes',
      graphql: {
        type: '[_SectionData_BusinessProcess_!]!',
        required: true,
      },
      zod: z.array(BusinessProcessSchema).min(1),
      metadata: {
        description: 'Array of business processes with participants, goals, and step-by-step workflows',
        businessPurpose: 'Defines the key business processes and workflows that the work implements or affects',
        questionsItAnswers: [
          'What are the core business processes for this work?',
          'What workflows does this work implement or affect?',
          'Who are the participants in these processes?',
        ],
        validationRules: [
          'Must contain at least one business process',
          'Each process must have a name, participants, goal, and workflow',
          'Workflow must have at least one step',
        ],
        examples: [
          [
            {
              name: 'Manual Review',
              participants: 'Data Scientist',
              goal: 'To validate the accuracy of automated text extraction from a source PDF',
              workflow: [
                'Analyst selects a document in the "Pending Review" state',
                'The UI displays the source PDF alongside the extracted text',
                'Analyst compares the two and makes corrections to the text',
                'Analyst approves the corrected text, advancing the document to the "Chunking" state',
              ],
            },
          ],
        ],
      },
    },

    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_2_BusinessScope_',
        required: true,
      },
      zod: z.string(),
      metadata: {
        description: 'Reference to the parent family',
        businessPurpose: 'Establishes the relationship between section and family',
        questionsItAnswers: ['What is the family of the core business processes section?'],
        validationRules: ['Must be a valid family reference'],
      },
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_2_6_CoreBusinessProcesses_Type = typeof section_2_6_core_business_processes;
