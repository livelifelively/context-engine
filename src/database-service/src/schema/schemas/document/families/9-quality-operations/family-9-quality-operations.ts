import {
  createFamilyIdField,
  createFamilyCreatedOnField,
  createFamilyLastUpdatedOnField,
  createDocumentReferenceField,
} from '../../field-factories.js';

// Family 9: Quality Standards & Operations
export const FAMILY_9_QUALITY_STANDARDS_OPERATIONS = '9-quality-standards-operations' as const;
export const FAMILY_NAME = 'quality standards & operations' as const;

export const family_9_quality_standards_operations = {
  id: FAMILY_9_QUALITY_STANDARDS_OPERATIONS,
  name: 'Quality Standards & Operations',
  version: '1.0.0',
  description:
    'Defines quality standards and operational procedures for system reliability and observability. Covers configuration, alerting, error recovery, and deployment procedures.',
  supportedBy: ['plan', 'task'],
  sections: [
    '9.1', // Configuration
    '9.2', // Alert Conditions
    '9.3', // Consumer Response Strategies
    '9.4', // Error Recovery
    '9.5', // Deployment Steps
  ],
  interfaceName: '_Family_9_QualityStandardsOperations_',
  businessPurpose:
    'Define quality standards and operational procedures for system reliability and observability through configuration management, monitoring, alerting, and deployment procedures.',
  questionsItAnswers: [
    'What quality standards and operational procedures are defined?',
    'How is the system configured in different environments?',
    'What monitoring and alerting strategies are in place?',
    'How do we handle errors and recovery scenarios?',
    'What deployment and operational procedures are required?',
  ],
  validationRules: [
    'All sections are required for both Plans and Tasks',
    'Configuration must cover all deployment environments',
    'Alert conditions must be comprehensive and actionable',
    'Error recovery strategies must be multi-level and robust',
    'Deployment procedures must be clear and validated',
  ],
  usageGuidelines: [
    'Use this family to define quality standards and operational procedures',
    'Focus on configuration, monitoring, alerting, and deployment procedures',
    'Include both technical standards and operational requirements',
    'For Plans, provide strategic approach and high-level standards',
    'For Tasks, provide specific implementation requirements and procedures',
    'Ensure all operational procedures and quality standards are clearly defined',
  ],
  examples: [
    {
      context: 'Comprehensive Quality Standards & Operations',
      description: 'Complete quality standards and operations strategy for a production system',
      content: {
        configuration: 'Environment-specific configuration with proper secrets management',
        alerting: 'Comprehensive alerting with multiple severity levels and escalation paths',
        errorRecovery: 'Multi-level error recovery with circuit breakers and fallbacks',
        deployment: 'Automated deployment pipeline with manual approval gates',
      },
    },
    {
      context: 'Event-Driven System Operations',
      description: 'Quality standards and operations for an event-driven system',
      content: {
        configuration: 'Event broker configuration with retry and dead letter queues',
        alerting: 'Event-based alerting with consumer health monitoring',
        errorRecovery: 'Multi-level error recovery with circuit breakers and fallbacks',
        deployment: 'Event-driven deployment with consumer coordination',
      },
    },
  ],
  aiInstructions: [
    'Focus on quality standards and operational excellence',
    'Include both technical standards and operational requirements',
    'Provide specific, actionable quality and operational procedures',
    'Ensure all configuration, monitoring, and operational procedures are clearly defined',
    'Include both preventive measures and reactive procedures',
  ],
  fields: {
    id: createFamilyIdField(FAMILY_NAME),

    familyCreatedOn: createFamilyCreatedOnField(FAMILY_NAME),

    familyLastUpdatedOn: createFamilyLastUpdatedOnField(FAMILY_NAME),

    document: createDocumentReferenceField(FAMILY_NAME),
  },
} as const;
