import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 10.2: Current Test Coverage
export const SECTION_10_2_CURRENTTESTCOVERAGE = '10.2' as const;
export const SECTION_NAME = 'current test coverage' as const;

export const section_10_2_current_test_coverage = {
  id: SECTION_10_2_CURRENTTESTCOVERAGE,
  name: 'Current Test Coverage',
  description:
    'Documents the current test coverage metrics and status. Captures what test coverage is currently achieved.',
  interfaceName: '_Section_10_2_CurrentTestCoverage_',
  businessPurpose:
    'Document the current current test coverage to understand existing current test coverage and identify areas for improvement.',
  questionsItAnswers: [
    'What current test coverage is currently implemented?',
    'What are the current current test coverage measurements?',
    'What current test coverage tools are currently in place?',
    'What are the current current test coverage limitations?',
  ],
  validationRules: [
    'Must document current current test coverage and measurements',
    'Should include current current test coverage tools and infrastructure',
    'Optional for Plans, Required for Tasks',
    'Must provide clear baseline for current current test coverage state',
  ],
  usageGuidelines: [
    'Use this section to document current current test coverage and measurements',
    'Focus on what current test coverage is currently implemented, not what should be',
    'Include current current test coverage tools, infrastructure, and measurements',
    'Document both positive aspects and limitations of current current test coverage',
    'Provide clear baseline for understanding current current test coverage state',
  ],
  examples: [
    {
      context: 'Current Current Test Coverage Implementation',
      description: 'Current current test coverage for a production system',
      content: {
        currentCoverage: 'Current test coverage metrics and percentages',
        coverageBreakdown: 'Breakdown of coverage by component and test type',
        coverageGaps: 'Current coverage gaps and areas with low coverage',
        coverageTrends: 'Current coverage trends and historical data',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current current test coverage and measurements',
    'Include current current test coverage tools, infrastructure, and measurements',
    'Document both positive aspects and limitations of current current test coverage',
    'Provide clear baseline for understanding current current test coverage state',
    'Include current current test coverage constraints and limitations',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    currentCoverage: {
      name: 'currentCoverage',
      label: 'Current Coverage',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current test coverage metrics and percentages',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    coverageBreakdown: {
      name: 'coverageBreakdown',
      label: 'Coverage Breakdown',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Breakdown of coverage by component and test type',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    coverageGaps: {
      name: 'coverageGaps',
      label: 'Coverage Gaps',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current coverage gaps and areas with low coverage',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    coverageTrends: {
      name: 'coverageTrends',
      label: 'Coverage Trends',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current coverage trends and historical data',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    family: createFamilyReferenceField(SECTION_NAME, FAMILY_INTERFACES.FAMILY_10_CURRENT_TESTING_QUALITY),
  },
} as const;
