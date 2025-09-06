import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 11.1: Target Testing Strategy
export const SECTION_11_1_TARGETTESTINGSTRATEGY = '11.1' as const;
export const SECTION_NAME = 'target testing strategy' as const;

export const section_11_1_target_testing_strategy = {
  id: SECTION_11_1_TARGETTESTINGSTRATEGY,
  name: 'Target Testing Strategy',
  description:
    'Defines the target testing strategy and approach that should be implemented. Specifies desired testing methodologies and practices.',
  interfaceName: '_Section_11_1_TargetTestingStrategy_',
  businessPurpose:
    'Define the target target testing strategy to guide testing implementation and quality improvements.',
  questionsItAnswers: [
    'What target testing strategy should be implemented?',
    'What are the target target testing strategy requirements?',
    'What target testing strategy standards should be in place?',
    'What are the target target testing strategy goals?',
  ],
  validationRules: [
    'Must define target target testing strategy and requirements',
    'Should include target target testing strategy standards and goals',
    'Required for both Plans and Tasks',
    'Must provide clear target standards for target testing strategy',
  ],
  usageGuidelines: [
    'Use this section to define target target testing strategy and requirements',
    'Focus on what target testing strategy should be implemented, not what currently exists',
    'Include target target testing strategy standards, requirements, and goals',
    'For Plans, provide strategic target standards and requirements',
    'For Tasks, provide specific target requirements for implementation',
    'Define clear, measurable target standards and requirements',
  ],
  examples: [
    {
      context: 'Target Target Testing Strategy Standards',
      description: 'Target target testing strategy for a production system',
      content: {
        targetStrategy: 'Target testing strategy and approach',
        methodologies: 'Target testing methodologies and practices',
        practices: 'Target testing practices and procedures',
        requirements: 'Target testing requirements and standards',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target target testing strategy and requirements',
    'Include target target testing strategy standards, requirements, and goals',
    'Provide clear, measurable target standards and requirements',
    'Define both strategic targets and specific implementation requirements',
    'Include rationale for target standards and requirements',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    targetStrategy: {
      name: 'targetStrategy',
      label: 'Target Strategy',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target testing strategy and approach',
        applicability: {
          plan: 'required',
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
        description: 'Target testing methodologies and practices',
        applicability: {
          plan: 'required',
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
        description: 'Target testing practices and procedures',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    requirements: {
      name: 'requirements',
      label: 'Requirements',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target testing requirements and standards',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    family: createFamilyReferenceField(SECTION_NAME, FAMILY_INTERFACES.FAMILY_11_TARGET_TESTING_QUALITY),
  },
} as const;
