import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 11.4: Target Testing Tools
export const SECTION_11_4_TARGETTESTINGTOOLS = '11.4' as const;

export const section_11_4_target_testing_tools = {
  id: SECTION_11_4_TARGETTESTINGTOOLS,
  name: 'Target Testing Tools',
  description: 'Defines the target testing tools and infrastructure. Specifies desired testing tools and capabilities.',
  interfaceName: '_Section_11_4_TargetTestingTools_',
  businessPurpose: 'Define the target target testing tools to guide testing implementation and quality improvements.',
  questionsItAnswers: [
    'What target testing tools should be implemented?',
    'What are the target target testing tools requirements?',
    'What target testing tools standards should be in place?',
    'What are the target target testing tools goals?',
  ],
  validationRules: [
    'Must define target target testing tools and requirements',
    'Should include target target testing tools standards and goals',
    'Required for both Plans and Tasks',
    'Must provide clear target standards for target testing tools',
  ],
  usageGuidelines: [
    'Use this section to define target target testing tools and requirements',
    'Focus on what target testing tools should be implemented, not what currently exists',
    'Include target target testing tools standards, requirements, and goals',
    'For Plans, provide strategic target standards and requirements',
    'For Tasks, provide specific target requirements for implementation',
    'Define clear, measurable target standards and requirements',
  ],
  examples: [
    {
      context: 'Target Target Testing Tools Standards',
      description: 'Target target testing tools for a production system',
      content: {
        testingTools: 'Target testing tools and frameworks',
        infrastructure: 'Target testing infrastructure and setup',
        automation: 'Target test automation tools and capabilities',
        capabilities: 'Target testing capabilities and features'
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target target testing tools and requirements',
    'Include target target testing tools standards, requirements, and goals',
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
        description: 'Unique identifier for the target testing tools section',
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
        description: 'Timestamp when the target testing tools section was created',
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
        description: 'Timestamp when the target testing tools section was last updated',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    testingTools: {
      name: 'testingTools',
      label: 'Testing Tools',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target testing tools and frameworks',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    infrastructure: {
      name: 'infrastructure',
      label: 'Infrastructure',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target testing infrastructure and setup',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    automation: {
      name: 'automation',
      label: 'Automation',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target test automation tools and capabilities',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    capabilities: {
      name: 'capabilities',
      label: 'Capabilities',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target testing capabilities and features',
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