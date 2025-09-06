import {
  createFamilyIdField,
  createFamilyCreatedOnField,
  createFamilyLastUpdatedOnField,
  createDocumentReferenceField,
} from '../../field-factories.js';

// Family 11: Target Testing & Quality
export const FAMILY_11_TARGET_TESTING_QUALITY = '11-target-testing-quality' as const;
export const FAMILY_NAME = 'target testing & quality' as const;

export const family_11_target_testing_quality = {
  id: FAMILY_11_TARGET_TESTING_QUALITY,
  name: 'Target Testing & Quality',
  version: '1.0.0',
  description:
    'Defines the target testing strategy and quality standards that should be implemented. Specifies desired testing approach and quality requirements.',
  supportedBy: ['plan', 'task'],
  sections: [
    '11.1', // Target Testing Strategy
    '11.2', // Target Test Coverage
    '11.3', // Target Quality Metrics
    '11.4', // Target Testing Tools
  ],
  interfaceName: '_Family_11_TargetTestingQuality_',
  businessPurpose:
    'Define the target testing strategy and quality standards to guide testing implementation and quality improvements.',
  questionsItAnswers: [
    'What testing strategy should be implemented?',
    'What are the target test coverage and quality requirements?',
    'What testing tools and infrastructure should be in place?',
    'What are the target quality standards and KPIs?',
  ],
  validationRules: [
    'Must define target testing strategy and quality standards',
    'Should include target test coverage requirements and quality metrics',
    'Required for both Plans and Tasks',
    'Must provide clear target standards for testing and quality',
  ],
  usageGuidelines: [
    'Use this family to define target testing strategy and quality standards',
    'Focus on what testing should be implemented, not what currently exists',
    'Include target test coverage, quality metrics, and testing tools',
    'For Plans, provide strategic target standards and requirements',
    'For Tasks, provide specific target requirements for implementation',
    'Define clear, measurable target standards and requirements',
  ],
  examples: [
    {
      context: 'Target Testing & Quality Standards',
      description: 'Target testing strategy and quality standards for a production system',
      content: {
        testingStrategy: 'Comprehensive testing with unit, integration, and E2E tests',
        testCoverage: 'Unit tests: 90%, Integration tests: 80%, E2E tests: 70%',
        qualityMetrics: 'Target bug rate: 1 per sprint, Code quality score: 9/10',
        testingTools: 'Vitest for unit tests, Playwright for E2E, comprehensive CI/CD',
      },
    },
    {
      context: 'Event-Driven System Target Standards',
      description: 'Target testing and quality standards for an event-driven system',
      content: {
        testingStrategy: 'Event-driven testing with comprehensive consumer testing',
        testCoverage: 'Event tests: 95%, Consumer tests: 90%, Integration tests: 85%',
        qualityMetrics: 'Target event processing reliability: 99.9%, Consumer health: 100%',
        testingTools: 'Event-driven testing framework, consumer health monitoring, automated testing',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target testing strategy and quality standards',
    'Include target test coverage, quality metrics, and testing tools',
    'Provide clear, measurable target standards and requirements',
    'Define both strategic targets and specific implementation requirements',
    'Include rationale for target standards and quality requirements',
  ],
  fields: {
    id: createFamilyIdField(FAMILY_NAME),

    familyCreatedOn: createFamilyCreatedOnField(FAMILY_NAME),

    familyLastUpdatedOn: createFamilyLastUpdatedOnField(FAMILY_NAME),

    document: createDocumentReferenceField(FAMILY_NAME),
  },
} as const;
