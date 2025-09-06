import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 11.3: Target Quality Metrics
export const SECTION_11_3_TARGETQUALITYMETRICS = '11.3' as const;
export const SECTION_NAME = 'target quality metrics' as const;

export const section_11_3_target_quality_metrics = {
  id: SECTION_11_3_TARGETQUALITYMETRICS,
  name: 'Target Quality Metrics',
  description: 'Defines the target quality metrics and standards. Specifies desired quality KPIs and requirements.',
  interfaceName: '_Section_11_3_TargetQualityMetrics_',
  businessPurpose: 'Define the target target quality metrics to guide testing implementation and quality improvements.',
  questionsItAnswers: [
    'What target quality metrics should be implemented?',
    'What are the target target quality metrics requirements?',
    'What target quality metrics standards should be in place?',
    'What are the target target quality metrics goals?',
  ],
  validationRules: [
    'Must define target target quality metrics and requirements',
    'Should include target target quality metrics standards and goals',
    'Required for both Plans and Tasks',
    'Must provide clear target standards for target quality metrics',
  ],
  usageGuidelines: [
    'Use this section to define target target quality metrics and requirements',
    'Focus on what target quality metrics should be implemented, not what currently exists',
    'Include target target quality metrics standards, requirements, and goals',
    'For Plans, provide strategic target standards and requirements',
    'For Tasks, provide specific target requirements for implementation',
    'Define clear, measurable target standards and requirements',
  ],
  examples: [
    {
      context: 'Target Target Quality Metrics Standards',
      description: 'Target target quality metrics for a production system',
      content: {
        qualityStandards: 'Target quality standards and requirements',
        performanceTargets: 'Target performance metrics and benchmarks',
        defectTargets: 'Target defect rates and quality requirements',
        qualityGoals: 'Target quality goals and success criteria',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target target quality metrics and requirements',
    'Include target target quality metrics standards, requirements, and goals',
    'Provide clear, measurable target standards and requirements',
    'Define both strategic targets and specific implementation requirements',
    'Include rationale for target standards and requirements',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    qualityStandards: {
      name: 'qualityStandards',
      label: 'Quality Standards',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target quality standards and requirements',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    performanceTargets: {
      name: 'performanceTargets',
      label: 'Performance Targets',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target performance metrics and benchmarks',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    defectTargets: {
      name: 'defectTargets',
      label: 'Defect Targets',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target defect rates and quality requirements',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    qualityGoals: {
      name: 'qualityGoals',
      label: 'Quality Goals',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target quality goals and success criteria',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    family: createFamilyReferenceField(SECTION_NAME, FAMILY_INTERFACES.FAMILY_11_TARGET_TESTING_QUALITY),
  },
} as const;
