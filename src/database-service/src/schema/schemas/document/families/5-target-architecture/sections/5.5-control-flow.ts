import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 5.5: Control Flow
export const SECTION_5_5_CONTROL_FLOW = '5.5' as const;

export const section_5_5_control_flow = {
  id: SECTION_5_5_CONTROL_FLOW,
  name: 'Control Flow',
  description: 'Documentation of how control and execution flow should work in the target system, including target system interactions analysis.',
  interfaceName: '_Section_5_5_ControlFlow_',
  businessPurpose: 'Define the target state of control flow patterns to guide future system execution and interaction design.',
  questionsItAnswers: [
    'How should control flow through the target system?',
    'What should be the target system interaction patterns?',
    'How should target business processes be executed?',
    'What should be the target control flow optimizations and patterns?',
  ],
  validationRules: [
    'Must document target control flow if applicable',
    'Should include target design patterns and optimizations',
    'For all document types, define desired future state',
    'Include target constraints and performance characteristics',
  ],
  usageGuidelines: [
    'Document desired target control flow, not current reality',
    'Include both functional and non-functional target requirements',
    'Document target design patterns and architectural decisions',
    'Ensure target design aligns with business objectives',
    'Document rationale for target architectural choices',
  ],
  examples: [
    {
      context: 'Target Microservices Architecture',
      description: 'Target control flow in a microservices system',
      content: {
        controlFlow: 'Target description of target control flow patterns through the system',
        systemInteractions: 'Target target system interaction patterns and execution flows',
        businessProcesses: 'Target target business process execution flows and patterns',
      },
    },
    {
      context: 'Target Cloud-Native Architecture',
      description: 'Target control flow in a cloud-native system',
      content: {
        controlFlow: 'Target cloud-native description of target control flow patterns through the system',
        systemInteractions: 'Target cloud-native target system interaction patterns and execution flows',
        businessProcesses: 'Target cloud-native target business process execution flows and patterns',
      },
    },
  ],
  aiInstructions: [
    'Focus on defining target control flow reality, not current state',
    'Include both positive goals and constraints for target design',
    'Document target architectural decisions and their business justification',
    'Ensure target design supports overall system objectives',
    'Provide context for why target control flow decisions were made',
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
        description: 'Unique identifier for the control flow section',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
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
        description: 'Timestamp when the control flow section was created',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
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
        description: 'Timestamp when the control flow section was last updated',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    controlFlow: {
      name: 'controlFlow',
      label: 'Control Flow',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of target control flow patterns through the system',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    systemInteractions: {
      name: 'systemInteractions',
      label: 'System Interactions',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target system interaction patterns and execution flows',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    businessProcesses: {
      name: 'businessProcesses',
      label: 'Business Processes',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Target business process execution flows and patterns',
        applicability: {
          plan: 'required',
          task: 'required',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_5_TargetArchitecture_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent target architecture family',
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
