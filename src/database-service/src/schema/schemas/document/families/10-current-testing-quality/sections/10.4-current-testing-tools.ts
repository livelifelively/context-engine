import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 10.4: Current Testing Tools
export const SECTION_10_4_CURRENTTESTINGTOOLS = '10.4' as const;
export const SECTION_NAME = 'current testing tools' as const;

export const section_10_4_current_testing_tools = {
  id: SECTION_10_4_CURRENTTESTINGTOOLS,
  name: 'Current Testing Tools',
  description:
    'Documents the current testing tools and infrastructure. Captures what testing tools are currently in place.',
  interfaceName: '_Section_10_4_CurrentTestingTools_',
  businessPurpose:
    'Document the current current testing tools to understand existing current testing tools and identify areas for improvement.',
  questionsItAnswers: [
    'What current testing tools is currently implemented?',
    'What are the current current testing tools measurements?',
    'What current testing tools tools are currently in place?',
    'What are the current current testing tools limitations?',
  ],
  validationRules: [
    'Must document current current testing tools and measurements',
    'Should include current current testing tools tools and infrastructure',
    'Optional for Plans, Required for Tasks',
    'Must provide clear baseline for current current testing tools state',
  ],
  usageGuidelines: [
    'Use this section to document current current testing tools and measurements',
    'Focus on what current testing tools is currently implemented, not what should be',
    'Include current current testing tools tools, infrastructure, and measurements',
    'Document both positive aspects and limitations of current current testing tools',
    'Provide clear baseline for understanding current current testing tools state',
  ],
  examples: [
    {
      context: 'Current Current Testing Tools Implementation',
      description: 'Current current testing tools for a production system',
      content: {
        testingTools: 'Current testing tools and frameworks',
        infrastructure: 'Current testing infrastructure and setup',
        automation: 'Current test automation tools and capabilities',
        limitations: 'Current tool limitations and constraints',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current current testing tools and measurements',
    'Include current current testing tools tools, infrastructure, and measurements',
    'Document both positive aspects and limitations of current current testing tools',
    'Provide clear baseline for understanding current current testing tools state',
    'Include current current testing tools constraints and limitations',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    testingTools: {
      name: 'testingTools',
      label: 'Testing Tools',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current testing tools and frameworks',
        applicability: {
          plan: 'optional',
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
        description: 'Current testing infrastructure and setup',
        applicability: {
          plan: 'optional',
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
        description: 'Current test automation tools and capabilities',
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
        description: 'Current tool limitations and constraints',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    family: createFamilyReferenceField(SECTION_NAME, FAMILY_INTERFACES.FAMILY_10_CURRENT_TESTING_QUALITY),
  },
} as const;
