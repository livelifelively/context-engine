import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 10.1: Current Testing Strategy
export const SECTION_10_1_CURRENT_TESTING_STRATEGY = '10.1' as const;

export const section_10_1_current_testing_strategy = {
  id: SECTION_10_1_CURRENT_TESTING_STRATEGY,
  name: 'Current Testing Strategy',
  description:
    'Documents the current testing approach and strategy that is currently implemented in the system. Captures what testing is currently in place.',
  interfaceName: '_Section_10_1_CurrentTestingStrategy_',
  businessPurpose:
    'Document the current testing strategy and approach to understand existing testing practices and identify areas for improvement.',
  questionsItAnswers: [
    'What testing strategy is currently implemented?',
    'What testing approaches are currently in place?',
    'What testing methodologies are currently being used?',
    'What are the current testing practices and procedures?',
  ],
  validationRules: [
    'Must document current testing strategy and approach',
    'Should include current testing methodologies and practices',
    'Optional for Plans, Required for Tasks',
    'Must provide clear baseline for current testing state',
  ],
  usageGuidelines: [
    'Use this section to document current testing strategy and approach',
    'Focus on what testing is currently implemented, not what should be',
    'Include current testing methodologies, practices, and procedures',
    'Document both positive aspects and limitations of current testing',
    'Provide clear baseline for understanding current testing state',
  ],
  examples: [
    {
      context: 'Current Testing Implementation',
      description: 'Current testing strategy for a production system',
      content: {
        currentStrategy: 'Unit testing with Jest, basic integration tests, manual E2E testing',
        methodologies: 'Test-driven development for new features, manual testing for legacy code',
        practices: 'Code reviews with testing requirements, CI/CD with basic test automation',
        limitations: 'Limited E2E automation, no performance testing, basic test coverage',
      },
    },
    {
      context: 'Legacy System Current Testing',
      description: 'Current testing strategy for a legacy system',
      content: {
        currentStrategy: 'Manual testing with basic unit tests for critical functions',
        methodologies: 'Manual validation and smoke testing, limited automated testing',
        practices: 'Manual test execution, basic logging for debugging',
        limitations: 'No automated testing infrastructure, limited test coverage, manual processes',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current testing strategy and approach',
    'Include current testing methodologies, practices, and procedures',
    'Document both positive aspects and limitations of current testing',
    'Provide clear baseline for understanding current testing state',
    'Include current testing constraints and limitations',
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
        description: 'Unique identifier for the current testing strategy section',
        applicability: {
          plan: 'optional',
          task: 'required',
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
        description: 'Timestamp when the current testing strategy section was created',
        applicability: {
          plan: 'optional',
          task: 'required',
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
        description: 'Timestamp when the current testing strategy section was last updated',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    currentStrategy: {
      name: 'currentStrategy',
      label: 'Current Strategy',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current testing strategy and approach',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    methodologies: {
      name: 'methodologies',
      label: 'Methodologies',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current testing methodologies and practices',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    practices: {
      name: 'practices',
      label: 'Practices',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current testing practices and procedures',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    limitations: {
      name: 'limitations',
      label: 'Limitations',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current testing limitations and constraints',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_10_CurrentTestingQuality_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent current testing & quality family',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
  },
} as const;
