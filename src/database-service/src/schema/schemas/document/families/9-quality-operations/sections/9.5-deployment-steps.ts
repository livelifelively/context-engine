import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 9.5: Deployment Steps
export const SECTION_9_5_DEPLOYMENT_STEPS = '9.5' as const;

export const section_9_5_deployment_steps = {
  id: SECTION_9_5_DEPLOYMENT_STEPS,
  name: 'Deployment Steps',
  description:
    'Any manual steps required to deploy the component. Defines deployment strategy and procedures for production deployment.',
  interfaceName: '_Section_9_5_DeploymentSteps_',
  businessPurpose: 'Define comprehensive deployment procedures and manual steps required for production deployment.',
  questionsItAnswers: [
    'What manual steps are required for deployment?',
    'What deployment procedures and processes are needed?',
    'How is the system deployed to different environments?',
    'What deployment validation and verification is required?',
  ],
  validationRules: [
    'Must define comprehensive deployment procedures and manual steps',
    'Should include deployment procedures for all environments',
    'Must specify deployment validation and verification procedures',
    'Required for Plans only (not applicable for Tasks)',
  ],
  usageGuidelines: [
    'Use this section to define comprehensive deployment procedures',
    'Include manual steps and automated deployment procedures',
    'Specify deployment validation and verification procedures',
    'Define deployment procedures for all target environments',
    'Cover both application and infrastructure deployment procedures',
  ],
  examples: [
    {
      context: 'Production Deployment Strategy',
      description: 'Complete deployment strategy for production system',
      content: {
        deploymentSteps: 'Database migrations, environment configuration, and application deployment',
        validation: 'Deployment validation and verification procedures',
        rollback: 'Rollback procedures and emergency deployment processes',
        monitoring: 'Post-deployment monitoring and health checks',
      },
    },
    {
      context: 'Multi-Environment Deployment',
      description: 'Deployment strategy for multiple environments',
      content: {
        deploymentSteps: 'Environment-specific deployment procedures and configurations',
        validation: 'Environment-specific validation and verification procedures',
        rollback: 'Environment-specific rollback and recovery procedures',
        monitoring: 'Environment-specific monitoring and health checks',
      },
    },
  ],
  aiInstructions: [
    'Focus on comprehensive deployment procedures and manual steps',
    'Include deployment procedures for all target environments',
    'Specify deployment validation and verification procedures',
    'Define rollback and emergency deployment procedures',
    'Cover both application and infrastructure deployment procedures',
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
        description: 'Unique identifier for the deployment steps section',
        applicability: {
          plan: 'required',
          task: 'omitted',
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
        description: 'Timestamp when the deployment steps section was created',
        applicability: {
          plan: 'required',
          task: 'omitted',
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
        description: 'Timestamp when the deployment steps section was last updated',
        applicability: {
          plan: 'required',
          task: 'omitted',
        },
      },
    },
    deploymentSteps: {
      name: 'deploymentSteps',
      label: 'Deployment Steps',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Manual steps and procedures required for deployment',
        applicability: {
          plan: 'required',
          task: 'omitted',
        },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Deployment validation and verification procedures',
        applicability: {
          plan: 'required',
          task: 'omitted',
        },
      },
    },
    rollback: {
      name: 'rollback',
      label: 'Rollback',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Rollback and emergency deployment procedures',
        applicability: {
          plan: 'required',
          task: 'omitted',
        },
      },
    },
    monitoring: {
      name: 'monitoring',
      label: 'Monitoring',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Post-deployment monitoring and health checks',
        applicability: {
          plan: 'required',
          task: 'omitted',
        },
      },
    },
    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_9_QualityStandardsOperations_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent quality standards & operations family',
        applicability: {
          plan: 'required',
          task: 'omitted',
        },
      },
    },
  },
} as const;
