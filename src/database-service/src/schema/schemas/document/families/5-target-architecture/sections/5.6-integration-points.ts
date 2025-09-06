import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 5.6: Integration Points
export const SECTION_5_6_INTEGRATION_POINTS = '5.6' as const;
export const SECTION_NAME = 'integration points' as const;

export const section_5_6_integration_points = {
  id: SECTION_5_6_INTEGRATION_POINTS,
  name: 'Integration Points',
  description:
    'Documentation of target external system boundaries and integration points. This includes target external system boundaries analysis.',
  interfaceName: '_Section_5_6_IntegrationPoints_',
  businessPurpose:
    'Define the target state of integration points to guide future external system connections and boundary design.',
  questionsItAnswers: [
    'What should be the target external system boundaries?',
    'How should the system integrate with external systems in the future?',
    'What should be the target integration patterns and protocols?',
    'What should be the target integration optimizations and constraints?',
  ],
  validationRules: [
    'Must document target integration points if applicable',
    'Should include target design patterns and optimizations',
    'For all document types, define desired future state',
    'Include target constraints and performance characteristics',
  ],
  usageGuidelines: [
    'Document desired target integration points, not current reality',
    'Include both functional and non-functional target requirements',
    'Document target design patterns and architectural decisions',
    'Ensure target design aligns with business objectives',
    'Document rationale for target architectural choices',
  ],
  examples: [
    {
      context: 'Target Microservices Architecture',
      description: 'Target integration points in a microservices system',
      content: {
        integrationPoints: 'Target description of target integration points and external system connections',
        externalSystems: 'Target target external systems and their connection points',
        integrationPatterns: 'Target target integration patterns and protocols to be used',
        systemBoundaries: 'Target target system boundaries and integration constraints',
      },
    },
    {
      context: 'Target Cloud-Native Architecture',
      description: 'Target integration points in a cloud-native system',
      content: {
        integrationPoints:
          'Target cloud-native description of target integration points and external system connections',
        externalSystems: 'Target cloud-native target external systems and their connection points',
        integrationPatterns: 'Target cloud-native target integration patterns and protocols to be used',
        systemBoundaries: 'Target cloud-native target system boundaries and integration constraints',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target integration points reality, not current state',
    'Include both positive goals and constraints for target design',
    'Document target architectural decisions and their business justification',
    'Ensure target design supports overall system objectives',
    'Provide context for why target integration points decisions were made',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    integrationPoints: {
      name: 'integrationPoints',
      label: 'Integration Points',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of target integration points and external system connections',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    externalSystems: {
      name: 'externalSystems',
      label: 'External Systems',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target external systems and their connection points',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    integrationPatterns: {
      name: 'integrationPatterns',
      label: 'Integration Patterns',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target integration patterns and protocols to be used',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    systemBoundaries: {
      name: 'systemBoundaries',
      label: 'System Boundaries',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target system boundaries and integration constraints',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_5_TARGET_ARCHITECTURE, SECTION_NAME),
  },
} as const;
