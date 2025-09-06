import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 5.3: Components
export const SECTION_5_3_COMPONENTS = '5.3' as const;
export const SECTION_NAME = 'components' as const;

export const section_5_3_components = {
  id: SECTION_5_3_COMPONENTS,
  name: 'Components',
  description:
    'Documentation of the target system components, their responsibilities, and how they should be organized. This includes target component relationships analysis.',
  interfaceName: '_Section_5_3_Components_',
  businessPurpose:
    'Define the target state of system components and their relationships to guide future system structure and component design.',
  questionsItAnswers: [
    'What components should exist in the target system?',
    'How should components be organized and structured in the future?',
    'What should be the target component responsibilities and boundaries?',
    'How should components interact with each other?',
  ],
  validationRules: [
    'Must document target components if applicable',
    'Should include target design patterns and optimizations',
    'For all document types, define desired future state',
    'Include target constraints and performance characteristics',
  ],
  usageGuidelines: [
    'Document desired target components, not current reality',
    'Include both functional and non-functional target requirements',
    'Document target design patterns and architectural decisions',
    'Ensure target design aligns with business objectives',
    'Document rationale for target architectural choices',
  ],
  examples: [
    {
      context: 'Target Microservices Architecture',
      description: 'Target components in a microservices system',
      content: {
        components: 'Target description of target system components and their organization',
        componentRelationships: 'Target target component relationships and interaction patterns',
        systemBoundaries: 'Target target system boundaries and component responsibilities',
      },
    },
    {
      context: 'Target Cloud-Native Architecture',
      description: 'Target components in a cloud-native system',
      content: {
        components: 'Target cloud-native description of target system components and their organization',
        componentRelationships: 'Target cloud-native target component relationships and interaction patterns',
        systemBoundaries: 'Target cloud-native target system boundaries and component responsibilities',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target components reality, not current state',
    'Include both positive goals and constraints for target design',
    'Document target architectural decisions and their business justification',
    'Ensure target design supports overall system objectives',
    'Provide context for why target components decisions were made',
  ],
  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    components: {
      name: 'components',
      label: 'Components',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of target system components and their organization',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    componentRelationships: {
      name: 'componentRelationships',
      label: 'Component Relationships',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target component relationships and interaction patterns',
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
        description: 'Target system boundaries and component responsibilities',
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
