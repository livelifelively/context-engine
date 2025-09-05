import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../constants.js';

// Family 4: Current Architecture
export const FAMILY_4_CURRENT_ARCHITECTURE = '4-current-architecture' as const;

export const family_4_current_architecture = {
  id: FAMILY_4_CURRENT_ARCHITECTURE,
  name: 'Current Architecture',
  version: '1.0.0',
  description:
    'Documents the existing system architecture, components, and integration points. For green field projects, this family may be empty or contain placeholder content.',
  supportedBy: ['plan', 'task', 'project', 'module', 'feature'],
  sections: [
    '4.1', // Guiding Principles
    '4.2', // Data Models
    '4.3', // Components
    '4.4', // Data Flow
    '4.5', // Control Flow
    '4.6', // Integration Points
    '4.6.1', // Upstream Integrations
    '4.6.2', // Downstream Integrations
  ],
  interfaceName: '_Family_4_CurrentArchitecture_',
  businessPurpose:
    'Capture and document the current state of the system architecture to understand existing components, data flows, and integration points before making changes or planning new features.',
  questionsItAnswers: [
    'What is the current system architecture?',
    'How are components currently organized and connected?',
    'What data models and flows exist in the current system?',
    'What are the current integration points and dependencies?',
    'What architectural principles govern the current system?',
  ],
  validationRules: [
    'All sections are optional to support green field projects',
    'If present, guiding principles must contain at least one principle',
    'Data models should be documented with current entity relationships',
    'Components should include current system boundaries and responsibilities',
    'Integration points must specify current external system connections',
  ],
  usageGuidelines: [
    'Use this family to document existing system state before planning changes',
    'For green field projects, include placeholder text in guiding principles',
    'Focus on current reality, not desired future state',
    'Include technical debt and constraints in the documentation',
    'Document both functional and non-functional aspects of current architecture',
  ],
  examples: [
    {
      context: 'Legacy System Analysis',
      description: 'Documenting existing monolithic application before microservices migration',
      content: {
        guidingPrinciples: ['Monolithic deployment', 'Shared database', 'Synchronous communication'],
        dataModels: 'Current ERD showing all entities in single database',
        components: 'Single application server with multiple modules',
        integrationPoints: 'Direct database connections to external systems',
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing architecture',
      content: {
        guidingPrinciples: ['No current architecture exists - this is a new system'],
        dataModels: 'N/A - No existing data models',
        components: 'N/A - No existing components',
        integrationPoints: 'N/A - No existing integrations',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current reality, not future plans',
    'Include technical constraints and limitations in current architecture',
    'For green field projects, clearly indicate absence of current architecture',
    'Document both positive aspects and technical debt of current system',
    'Provide context for why current architecture decisions were made',
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
        description: 'Unique identifier for the current architecture family',
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
        description: 'Timestamp when the current architecture family was created',
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
        description: 'Timestamp when the current architecture family was last updated',
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
        description: 'Reference to the parent document containing this current architecture family',
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
