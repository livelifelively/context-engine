import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../constants.js';

// Family 6: Current Maintenance & Monitoring
export const FAMILY_6_CURRENT_MAINTENANCE_MONITORING = '6-current-maintenance-monitoring' as const;

export const family_6_current_maintenance_monitoring = {
  id: FAMILY_6_CURRENT_MAINTENANCE_MONITORING,
  name: 'Current Maintenance & Monitoring',
  version: '1.0.0',
  description:
    'Documents the existing maintenance procedures, error handling, and monitoring strategies currently in place. For green field projects, this family may be empty or contain placeholder content.',
  supportedBy: ['plan', 'task', 'project', 'module', 'feature'],
  sections: [
    '6.1', // Error Handling
    '6.2', // Logging & Monitoring
  ],
  interfaceName: '_Family_6_CurrentMaintenanceMonitoring_',
  businessPurpose:
    'Capture the current state of maintenance procedures, error handling, and monitoring to understand existing operational practices before planning improvements or new implementations.',
  questionsItAnswers: [
    'What maintenance procedures are currently in place?',
    'How are errors currently handled in the system?',
    'What monitoring and logging is currently implemented?',
    'What are the current operational practices and procedures?',
    'What maintenance tools and processes are currently used?',
  ],
  validationRules: [
    'All sections are optional to support green field projects',
    'If present, error handling must document current error scenarios',
    'If present, logging & monitoring must document current observability setup',
    'For green field projects, include placeholder text explaining absence of current practices',
  ],
  usageGuidelines: [
    'Use this family to document existing operational practices before planning changes',
    'For green field projects, include placeholder text in sections',
    'Focus on current reality, not desired future state',
    'Include both formal and informal maintenance practices',
    'Document current tools, processes, and procedures in use',
  ],
  examples: [
    {
      context: 'Legacy System with Basic Monitoring',
      description: 'Current maintenance and monitoring in an existing system',
      content: {
        errorHandling: 'Basic error logging to console, manual error investigation',
        loggingMonitoring: 'Console logging, no formal monitoring, manual health checks',
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing maintenance practices',
      content: {
        errorHandling: 'No current error handling exists - this is a new system being designed',
        loggingMonitoring: 'No current logging or monitoring exists - this is a new system being designed',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current operational reality, not future plans',
    'Include both positive aspects and limitations of current practices',
    'For green field projects, clearly indicate absence of current practices',
    'Document both formal procedures and informal practices',
    'Provide context for why current maintenance decisions were made',
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
        description: 'Unique identifier for the current maintenance & monitoring family',
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
        description: 'Timestamp when the current maintenance & monitoring family was created',
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
        description: 'Timestamp when the current maintenance & monitoring family was last updated',
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
        description: 'Reference to the parent document containing this current maintenance & monitoring family',
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
