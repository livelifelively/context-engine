import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 10.3: Current Quality Metrics
export const SECTION_10_3_CURRENTQUALITYMETRICS = '10.3' as const;

export const section_10_3_current_quality_metrics = {
  id: SECTION_10_3_CURRENTQUALITYMETRICS,
  name: 'Current Quality Metrics',
  description: 'Documents the current quality metrics and measurements. Captures current quality KPIs and measurements.',
  interfaceName: '_Section_10_3_CurrentQualityMetrics_',
  businessPurpose: 'Document the current current quality metrics to understand existing current quality metrics and identify areas for improvement.',
  questionsItAnswers: [
    'What current quality metrics is currently implemented?',
    'What are the current current quality metrics measurements?',
    'What current quality metrics tools are currently in place?',
    'What are the current current quality metrics limitations?',
  ],
  validationRules: [
    'Must document current current quality metrics and measurements',
    'Should include current current quality metrics tools and infrastructure',
    'Optional for Plans, Required for Tasks',
    'Must provide clear baseline for current current quality metrics state',
  ],
  usageGuidelines: [
    'Use this section to document current current quality metrics and measurements',
    'Focus on what current quality metrics is currently implemented, not what should be',
    'Include current current quality metrics tools, infrastructure, and measurements',
    'Document both positive aspects and limitations of current current quality metrics',
    'Provide clear baseline for understanding current current quality metrics state',
  ],
  examples: [
    {
      context: 'Current Current Quality Metrics Implementation',
      description: 'Current current quality metrics for a production system',
      content: {
        qualityMetrics: 'Current quality metrics and KPIs',
        performanceMetrics: 'Current performance measurements and benchmarks',
        defectMetrics: 'Current defect rates and quality measurements',
        qualityTrends: 'Current quality trends and historical data'
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current current quality metrics and measurements',
    'Include current current quality metrics tools, infrastructure, and measurements',
    'Document both positive aspects and limitations of current current quality metrics',
    'Provide clear baseline for understanding current current quality metrics state',
    'Include current current quality metrics constraints and limitations',
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
        description: 'Unique identifier for the current quality metrics section',
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
        description: 'Timestamp when the current quality metrics section was created',
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
        description: 'Timestamp when the current quality metrics section was last updated',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    qualityMetrics: {
      name: 'qualityMetrics',
      label: 'Quality Metrics',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current quality metrics and KPIs',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    performanceMetrics: {
      name: 'performanceMetrics',
      label: 'Performance Metrics',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current performance measurements and benchmarks',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    defectMetrics: {
      name: 'defectMetrics',
      label: 'Defect Metrics',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current defect rates and quality measurements',
        applicability: {
          plan: 'optional',
          task: 'required',
        },
      },
    },
    qualityTrends: {
      name: 'qualityTrends',
      label: 'Quality Trends',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Current quality trends and historical data',
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