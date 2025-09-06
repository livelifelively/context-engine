import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 9.1: Configuration
export const SECTION_9_1_CONFIGURATION = '9.1' as const;
export const SECTION_NAME = 'configuration' as const;

export const section_9_1_configuration = {
  id: SECTION_9_1_CONFIGURATION,
  name: 'Configuration',
  description:
    'How the system is configured in different environments (e.g., production, development). Defines configuration strategy and requirements.',
  interfaceName: '_Section_9_1_Configuration_',
  businessPurpose:
    'Define comprehensive configuration management strategy for different environments and deployment scenarios.',
  questionsItAnswers: [
    'How is the system configured in different environments?',
    'What configuration settings and parameters are needed?',
    'How are configuration values managed and secured?',
    'What configuration validation and management is required?',
  ],
  validationRules: [
    'Must define configuration strategy for all environments',
    'Should include configuration settings and parameters',
    'Must specify configuration management and security approach',
    'Should cover configuration validation and deployment procedures',
  ],
  usageGuidelines: [
    'Use this section to define comprehensive configuration management',
    'Include configuration settings for all deployment environments',
    'Specify configuration management tools and security approaches',
    'Define configuration validation and deployment procedures',
    'Cover both application and infrastructure configuration',
  ],
  examples: [
    {
      context: 'Multi-Environment Configuration',
      description: 'Configuration strategy for multiple deployment environments',
      content: {
        configurationStrategy: 'Environment-specific configuration with secure secrets management',
        settings: 'Database connections, API endpoints, feature flags, and security settings',
        management: 'Configuration management with validation and deployment automation',
        security: 'Secure secrets management with encryption and access controls',
      },
    },
    {
      context: 'Event-Driven System Configuration',
      description: 'Configuration for event-driven system with multiple components',
      content: {
        configurationStrategy: 'Event broker configuration with retry and dead letter queues',
        settings: 'Event broker settings, consumer configurations, and monitoring parameters',
        management: 'Configuration management with event-driven validation',
        security: 'Secure event broker configuration with authentication and authorization',
      },
    },
  ],
  aiInstructions: [
    'Focus on comprehensive configuration management strategy',
    'Include configuration settings for all deployment environments',
    'Specify configuration management tools and security approaches',
    'Define configuration validation and deployment procedures',
    'Cover both application and infrastructure configuration',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    configurationStrategy: {
      name: 'configurationStrategy',
      label: 'Configuration Strategy',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Overall configuration management strategy and approach',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    settings: {
      name: 'settings',
      label: 'Settings',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Configuration settings and parameters for all environments',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    management: {
      name: 'management',
      label: 'Management',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Configuration management tools and procedures',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    security: {
      name: 'security',
      label: 'Security',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Configuration security and secrets management approach',
        applicability: {
          plan: 'required',
          task: 'required',
        },
      },
    },
    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_9_QUALITY_STANDARDS_OPERATIONS, SECTION_NAME),
  },
} as const;
