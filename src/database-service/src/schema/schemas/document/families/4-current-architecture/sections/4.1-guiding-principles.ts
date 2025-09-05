import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 4.1: Guiding Principles
export const SECTION_4_1_GUIDING_PRINCIPLES = '4.1' as const;

export const section_4_1_guiding_principles = {
  id: SECTION_4_1_GUIDING_PRINCIPLES,
  name: 'Guiding Principles',
  description:
    'A list of high-level architectural rules, patterns, or constraints that apply to the current system. These principles guide the existing architecture and help understand current design decisions.',
  interfaceName: '_Section_4_1_GuidingPrinciples_',
  businessPurpose:
    'Document the architectural principles that govern the current system to understand existing design decisions and constraints.',
  questionsItAnswers: [
    'What architectural principles govern the current system?',
    'What design patterns are currently enforced?',
    'What constraints exist in the current architecture?',
    'What rules guide current system development?',
  ],
  validationRules: [
    'Must contain at least one guiding principle',
    'Each principle should be a clear, actionable statement',
    'Principles should reflect current system reality, not future aspirations',
    'For green field projects, include placeholder text explaining absence of current principles',
  ],
  usageGuidelines: [
    'Document actual principles that govern the current system',
    'Include both positive principles and constraints/limitations',
    'Focus on architectural decisions that affect system design',
    'For legacy systems, document implicit principles that have emerged',
    'For green field projects, clearly indicate no current principles exist',
  ],
  examples: [
    {
      context: 'Legacy Monolithic System',
      description: 'Current principles governing an existing monolithic application',
      content: {
        principles: [
          'All business logic must be contained within the main application',
          'Database access is centralized through a single data access layer',
          'User interface components are tightly coupled to business logic',
          'Deployment is done as a single unit to all environments',
        ],
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing architecture',
      content: {
        principles: [
          'No current architecture exists - this is a new system being designed',
          'Current principles will be established as the system is built',
        ],
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting actual current principles, not desired future ones',
    'Include both explicit and implicit architectural rules',
    'For green field projects, clearly state the absence of current principles',
    'Document constraints and limitations as well as positive principles',
    'Provide context for why these principles exist in the current system',
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
        description: 'Unique identifier for the guiding principles section',
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
        description: 'Timestamp when the guiding principles section was created',
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
        description: 'Timestamp when the guiding principles section was last updated',
        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    principles: {
      name: 'principles',
      label: 'Principles',
      graphql: {
        type: '[String!]!',
        required: true,
      },
      zod: z.array(z.string().min(1)).min(1),
      metadata: {
        description: 'List of architectural principles that govern the current system',
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
