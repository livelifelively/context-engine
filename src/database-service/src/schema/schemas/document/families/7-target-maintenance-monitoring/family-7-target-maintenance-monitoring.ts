import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../constants.js';

// Family 7: Target Maintenance & Monitoring
export const FAMILY_7_TARGET_MAINTENANCE_MONITORING = '7-target-maintenance-monitoring' as const;

export const family_7_target_maintenance_monitoring = {
  id: FAMILY_7_TARGET_MAINTENANCE_MONITORING,
  name: 'Target Maintenance & Monitoring',
  version: '1.0.0',
  description:
    'Documents the desired future state of maintenance procedures, error handling, and monitoring strategies. This defines what the operational practices should become.',
  supportedBy: ['plan', 'task', 'project', 'module', 'feature'],
  sections: [
    '7.1', // Error Handling
    '7.2', // Logging & Monitoring
  ],
  interfaceName: '_Family_7_TargetMaintenanceMonitoring_',
  businessPurpose:
    'Define the desired future state of maintenance procedures, error handling, and monitoring to guide operational improvements and new implementations.',
  questionsItAnswers: [
    'What maintenance procedures should be implemented?',
    'How should errors be handled in the target system?',
    'What monitoring and logging should be implemented?',
    'What should be the target operational practices and procedures?',
    'What maintenance tools and processes should be used?',
  ],
  validationRules: [
    'All sections are required for planning and task documents',
    'Error handling must define target error scenarios and handling strategies',
    'Logging & monitoring must define target observability requirements',
    'Should align with business objectives and technical constraints',
  ],
  usageGuidelines: [
    'Use this family to define the desired future state of operational practices',
    'Focus on target maintenance and monitoring, not current reality',
    'Include both functional and non-functional operational requirements',
    'Document operational decisions and their rationale',
    'Ensure consistency with business goals and technical constraints',
  ],
  examples: [
    {
      context: 'Comprehensive Observability Strategy',
      description: 'Target maintenance and monitoring for a production system',
      content: {
        errorHandling: 'Structured error handling, automated error recovery, comprehensive error reporting',
        loggingMonitoring: 'Structured logging, comprehensive monitoring, automated alerting, metrics collection',
      },
    },
    {
      context: 'Cloud-Native Observability',
      description: 'Target maintenance and monitoring for a cloud-native system',
      content: {
        errorHandling: 'Cloud-native error handling, distributed tracing, automated recovery',
        loggingMonitoring: 'Cloud-native logging, service mesh observability, automated scaling',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining the desired future state, not current reality',
    'Include operational decisions and their business justification',
    'Document both positive goals and constraints for target practices',
    'Provide clear rationale for operational choices',
    'Ensure target practices align with business objectives',
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
        description: 'Unique identifier for the target maintenance & monitoring family',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    familyCreatedOn: {
      name: 'familyCreatedOn',
      label: 'Family Created On',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().datetime(),
      metadata: {
        description: 'Timestamp when the target maintenance & monitoring family was created',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    familyLastUpdatedOn: {
      name: 'familyLastUpdatedOn',
      label: 'Family Last Updated On',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().datetime(),
      metadata: {
        description: 'Timestamp when the target maintenance & monitoring family was last updated',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    document: {
      name: 'document',
      label: 'Document',
      graphql: {
        type: '_Document_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent document containing this target maintenance & monitoring family',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
  },
} as const;
