import {
  createFamilyIdField,
  createFamilyCreatedOnField,
  createFamilyLastUpdatedOnField,
  createDocumentReferenceField,
} from '../../field-factories.js';

// Family 10: Current Testing & Quality
export const FAMILY_10_CURRENT_TESTING_QUALITY = '10-current-testing-quality' as const;
export const FAMILY_NAME = 'current testing & quality' as const;

export const family_10_current_testing_quality = {
  id: FAMILY_10_CURRENT_TESTING_QUALITY,
  name: 'Current Testing & Quality',
  version: '1.0.0',
  description:
    'Documents the current state of testing implementation and quality metrics. Captures what testing is currently in place and current quality measurements.',
  supportedBy: ['plan', 'task'],
  sections: [
    '10.1', // Current Testing Strategy
    '10.2', // Current Test Coverage
    '10.3', // Current Quality Metrics
    '10.4', // Current Testing Tools
  ],
  interfaceName: '_Family_10_CurrentTestingQuality_',
  businessPurpose:
    'Document the current state of testing implementation and quality metrics to understand existing testing practices and quality measurements.',
  questionsItAnswers: [
    'What testing is currently implemented in the system?',
    'What is the current test coverage and quality metrics?',
    'What testing tools and infrastructure are currently in place?',
    'What are the current quality measurements and KPIs?',
  ],
  validationRules: [
    'Must document current testing implementation and quality state',
    'Should include current test coverage metrics and quality measurements',
    'Optional for Plans, Required for Tasks',
    'Must provide clear baseline for current testing and quality state',
  ],
  usageGuidelines: [
    'Use this family to document current testing and quality reality',
    'Focus on what testing is currently implemented, not what should be',
    'Include current test coverage, quality metrics, and testing tools',
    'For Plans, provide current state analysis for planning improvements',
    'For Tasks, provide current baseline for implementation tracking',
    'Document both positive aspects and limitations of current practices',
  ],
  examples: [
    {
      context: 'Current Testing State Analysis',
      description: 'Current testing implementation and quality metrics',
      content: {
        testingStrategy: 'Current unit testing with 60% coverage, basic integration tests',
        testCoverage: 'Unit tests: 60%, Integration tests: 30%, E2E tests: 10%',
        qualityMetrics: 'Current bug rate: 5 per sprint, Code quality score: 7/10',
        testingTools: 'Jest for unit tests, basic CI/CD pipeline, manual testing',
      },
    },
    {
      context: 'Legacy System Current State',
      description: 'Current testing state for a legacy system',
      content: {
        testingStrategy: 'Limited testing with manual validation and basic smoke tests',
        testCoverage: 'Unit tests: 20%, Integration tests: 5%, E2E tests: 0%',
        qualityMetrics: 'Current bug rate: 15 per sprint, Code quality score: 4/10',
        testingTools: 'Manual testing, basic logging, no automated testing infrastructure',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current testing and quality reality, not future plans',
    'Include current test coverage, quality metrics, and testing tools',
    'Document both positive aspects and limitations of current practices',
    'Provide clear baseline for understanding current testing and quality state',
    'Include current testing constraints and limitations',
  ],
  fields: {
    id: createFamilyIdField(FAMILY_NAME),

    familyCreatedOn: createFamilyCreatedOnField(FAMILY_NAME),

    familyLastUpdatedOn: createFamilyLastUpdatedOnField(FAMILY_NAME),

    document: createDocumentReferenceField(FAMILY_NAME),
  },
} as const;
