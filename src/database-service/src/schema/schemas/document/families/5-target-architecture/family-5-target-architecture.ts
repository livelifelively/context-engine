import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../constants.js';

// Family 5: Target Architecture
export const FAMILY_5_TARGET_ARCHITECTURE = '5-target-architecture' as const;

export const family_5_target_architecture = {
  id: FAMILY_5_TARGET_ARCHITECTURE,
  name: 'Target Architecture',
  version: '1.0.0',
  description:
    'Documents the desired future state of the system architecture, components, and integration points. This defines what the system should become.',
  supportedBy: ['plan', 'task', 'project', 'module', 'feature'],
  sections: [
    '5.1', // Guiding Principles
    '5.2', // Data Models
    '5.3', // Components
    '5.4', // Data Flow
    '5.5', // Control Flow
    '5.6', // Integration Points
    '5.6.1', // Upstream Integrations
    '5.6.2', // Downstream Integrations
  ],
  interfaceName: '_Family_5_TargetArchitecture_',
  businessPurpose:
    'Define the desired future state of the system architecture to guide development decisions and architectural evolution.',
  questionsItAnswers: [
    'What should the target system architecture look like?',
    'How should components be organized and connected in the future?',
    'What data models and flows should exist in the target system?',
    'What should be the target integration points and dependencies?',
    'What architectural principles should govern the target system?',
  ],
  validationRules: [
    'All sections are required for planning and task documents',
    'Guiding principles must contain at least one principle',
    'Data models should define target entity relationships',
    'Components should include target system boundaries and responsibilities',
    'Integration points must specify target external system connections',
  ],
  usageGuidelines: [
    'Use this family to define the desired future state of the system',
    'Focus on target architecture, not current reality',
    'Include both functional and non-functional requirements',
    'Document architectural decisions and their rationale',
    'Ensure consistency with business goals and technical constraints',
  ],
  examples: [
    {
      context: 'Microservices Migration',
      description: 'Target architecture for migrating from monolithic to microservices',
      content: {
        guidingPrinciples: ['Service independence', 'Event-driven communication', 'Domain-driven design'],
        dataModels: 'Target data models with service-specific databases',
        components: 'Target microservices architecture with clear service boundaries',
        integrationPoints: 'Target API-first integration patterns',
      },
    },
    {
      context: 'Cloud-Native Transformation',
      description: 'Target architecture for cloud-native system design',
      content: {
        guidingPrinciples: ['Cloud-first design', 'Containerization', 'Infrastructure as code'],
        dataModels: 'Target cloud-native data storage patterns',
        components: 'Target containerized services with auto-scaling',
        integrationPoints: 'Target cloud-native integration services',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining the desired future state, not current reality',
    'Include architectural decisions and their business justification',
    'Document both positive goals and constraints for the target architecture',
    'Provide clear rationale for architectural choices',
    'Ensure target architecture aligns with business objectives',
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
        description: 'Unique identifier for the target architecture family',
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
        description: 'Timestamp when the target architecture family was created',
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
        description: 'Timestamp when the target architecture family was last updated',
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
        description: 'Reference to the parent document containing this target architecture family',
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
