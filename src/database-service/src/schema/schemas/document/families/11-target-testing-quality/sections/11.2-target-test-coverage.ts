import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 11.2: Target Test Coverage
export const SECTION_11_2_TARGETTESTCOVERAGE = '11.2' as const;

export const section_11_2_target_test_coverage = {
  id: SECTION_11_2_TARGETTESTCOVERAGE,
  name: 'Target Test Coverage',
  description: 'Defines the target test coverage requirements and standards. Specifies desired test coverage metrics and requirements.',
  interfaceName: '_Section_11_2_TargetTestCoverage_',
  businessPurpose: 'Define the target target test coverage to guide testing implementation and quality improvements.',
  questionsItAnswers: [
    'What target test coverage should be implemented?',
    'What are the target target test coverage requirements?',
    'What target test coverage standards should be in place?',
    'What are the target target test coverage goals?',
  ],
  validationRules: [
    'Must define target target test coverage and requirements',
    'Should include target target test coverage standards and goals',
    'Required for both Plans and Tasks',
    'Must provide clear target standards for target test coverage',
  ],
  usageGuidelines: [
    'Use this section to define target target test coverage and requirements',
    'Focus on what target test coverage should be implemented, not what currently exists',
    'Include target target test coverage standards, requirements, and goals',
    'For Plans, provide strategic target standards and requirements',
    'For Tasks, provide specific target requirements for implementation',
    'Define clear, measurable target standards and requirements',
  ],
  examples: [
    {
      context: 'Target Target Test Coverage Standards',
      description: 'Target target test coverage for a production system',
      content: {
        targetCoverage: 'Target test coverage requirements and percentages',
        coverageRequirements: 'Target coverage requirements by component and test type',
        coverageStandards: 'Target coverage standards and quality gates',
        coverageGoals: 'Target coverage goals and milestones'
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target target test coverage and requirements',
    'Include target target test coverage standards, requirements, and goals',
    'Provide clear, measurable target standards and requirements',
    'Define both strategic targets and specific implementation requirements',
    'Include rationale for target standards and requirements',
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
        description: 'Unique identifier for the target test coverage section',
        applicability: {
          plan: 'required',
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
        description: 'Timestamp when the target test coverage section was created',
        applicability: {
          plan: 'required',
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
        description: 'Timestamp when the target test coverage section was last updated',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    targetCoverage: {
      name: 'targetCoverage',
      label: 'Target Coverage',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target test coverage requirements and percentages',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    coverageRequirements: {
      name: 'coverageRequirements',
      label: 'Coverage Requirements',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target coverage requirements by component and test type',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    coverageStandards: {
      name: 'coverageStandards',
      label: 'Coverage Standards',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target coverage standards and quality gates',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    coverageGoals: {
      name: 'coverageGoals',
      label: 'Coverage Goals',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target coverage goals and milestones',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_11_TargetTestingQuality_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent target testing & quality family',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
  },
} as const;