/**
 * Section 3.4: Decomposition Graph
 *
 * This file contains the complete data object for the Decomposition Graph section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section defines a Mermaid diagram that visually represents the dependencies
 * and sequencing of the child Plans/Tasks listed in the roadmap.
 */

import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';

// =============================================================================
// SECTION IDENTIFIER
// =============================================================================

export const SECTION_3_4_DECOMPOSITION_GRAPH = '3.4' as const;

// =============================================================================
// DATA TYPE DEFINITIONS
// =============================================================================

// Decomposition Graph data type - used within this section
export const DecompositionGraphSchema = z.object({
  text: z.string().optional(), // Optional explanatory text
  diagram: z.string().min(1), // Mermaid diagram content
});

export type DecompositionGraph = z.infer<typeof DecompositionGraphSchema>;

export const section_3_4_decomposition_graph = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_3_4_DECOMPOSITION_GRAPH,
  name: 'Decomposition Graph',
  description:
    'A Mermaid diagram that visually represents the dependencies and sequencing of the child Plans/Tasks listed in the roadmap',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_3_4_DecompositionGraph_',

  // Section-level metadata
  businessPurpose:
    'Provides visual representation of work decomposition to clarify relationships between child Plans and Tasks, showing critical path and required implementation order',

  questionsItAnswers: [
    'How do the child Plans/Tasks relate to each other?',
    'What is the critical path for implementation?',
    'What is the required order of implementation?',
    'How is the work decomposed and sequenced?',
  ],

  validationRules: [
    'Must have a valid Mermaid diagram for Plans',
    'Diagram should represent roadmap items and their relationships',
    'Optional explanatory text may precede the diagram',
  ],

  usageGuidelines: [
    'Should be defined during planning process',
    'Must represent the roadmap items and their relationships',
    'Should show clear dependencies and sequencing',
    'Keep diagrams simple and understandable',
  ],

  examples: [
    {
      context: 'Authentication system development plan',
      data: {
        decompositionGraph: {
          text: 'This diagram shows the decomposition of our authentication system, with the backend plan as the foundation and UI tasks building upon it.',
          diagram:
            'subgraph Plan: User Authentication\n        P1["Plan: Backend Auth"]\n        T1["Task: Create UI form"]\n        T2["Task: Implement validation"]\n        T3["Task: Add API endpoint"]\n        T4["Task: Write integration tests"]\n    end\n    P1 --> T1\n    T1 --> T2\n    T2 --> T3\n    T3 --> T4',
        },
      },
    },
    {
      context: 'User management system',
      data: {
        decompositionGraph: {
          text: 'This diagram illustrates the user management system decomposition, showing how user profiles, authentication, and reporting components interact.',
          diagram:
            'subgraph Plan: User Management\n        P1["Plan: User Profiles"]\n        P2["Plan: Authentication"]\n        T1["Task: Database Schema"]\n        T2["Task: API Development"]\n        T3["Task: Frontend Integration"]\n        T4["Task: Testing & Validation"]\n    end\n    T1 --> P1\n    T1 --> P2\n    P1 --> T2\n    P2 --> T2\n    T2 --> T3\n    T3 --> T4',
        },
      },
    },
    {
      context: 'E-commerce platform',
      data: {
        decompositionGraph: {
          diagram:
            'subgraph Plan: E-commerce Platform\n        P1["Plan: Product Catalog"]\n        P2["Plan: Shopping Cart"]\n        P3["Plan: Payment Processing"]\n        T1["Task: Database Design"]\n        T2["Task: API Gateway"]\n        T3["Task: Frontend Components"]\n        T4["Task: Security Implementation"]\n    end\n    T1 --> P1\n    T1 --> P2\n    T1 --> P3\n    P1 --> T2\n    P2 --> T2\n    P3 --> T2\n    T2 --> T3\n    T4 --> T3',
        },
      },
    },
  ],

  aiInstructions: [
    'Help create clear and understandable decomposition diagrams',
    'Suggest appropriate relationships between Plans and Tasks',
    'Help identify critical path and dependencies',
    'Ensure diagrams are simple and focused',
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
        description: 'Unique identifier for the decomposition graph section',
        businessPurpose: 'Enables unique identification and referencing',
        questionsItAnswers: ['What is the id of the decomposition graph section in the database?'],
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
        description: 'Timestamp when the decomposition graph section was created',
        businessPurpose: 'Provides audit trail and creation tracking',
        questionsItAnswers: ['What is the created on date of the decomposition graph section?'],
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
        description: 'Timestamp when the decomposition graph section was last updated',
        businessPurpose: 'Enables change tracking and freshness monitoring',
        questionsItAnswers: ['What is the last updated on date of the decomposition graph section?'],
        validationRules: ['Must be a valid date'],
        examples: ['2024-01-15T14:30:00Z'],
      },
    },

    decompositionGraph: {
      name: 'decompositionGraph',
      label: 'Decomposition Graph',
      graphql: {
        type: '_SectionData_DecompositionGraph_!',
        required: true,
      },
      zod: DecompositionGraphSchema,
      metadata: {
        description: 'Mermaid diagram that visually represents the dependencies and sequencing of child Plans/Tasks',
        businessPurpose:
          'Provides visual representation of work decomposition to clarify relationships between child Plans and Tasks, showing critical path and required implementation order',
        questionsItAnswers: [
          'How do the child Plans/Tasks relate to each other?',
          'What is the critical path for implementation?',
          'What is the required order of implementation?',
        ],
        validationRules: [
          'Must have a valid Mermaid diagram for Plans',
          'Diagram should represent roadmap items and their relationships',
          'Optional explanatory text may precede the diagram',
        ],
        examples: [
          {
            text: 'This diagram shows the decomposition of our authentication system, with the backend plan as the foundation and UI tasks building upon it.',
            diagram:
              'subgraph Plan: User Authentication\n        P1["Plan: Backend Auth"]\n        T1["Task: Create UI form"]\n        T2["Task: Implement validation"]\n        T3["Task: Add API endpoint"]\n        T4["Task: Write integration tests"]\n    end\n    P1 --> T1\n    T1 --> T2\n    T2 --> T3\n    T3 --> T4',
          },
        ],
      },
    },

    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_3_PlanningDecomposition_',
        required: true,
      },
      zod: z.string(),
      metadata: {
        description: 'Reference to the parent family',
        businessPurpose: 'Establishes the relationship between section and family',
        questionsItAnswers: ['What is the family of the decomposition graph section?'],
        validationRules: ['Must be a valid family reference'],
      },
    },
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_3_4_DecompositionGraph_Type = typeof section_3_4_decomposition_graph;
