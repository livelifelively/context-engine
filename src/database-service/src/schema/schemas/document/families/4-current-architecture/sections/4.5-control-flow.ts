import { z } from 'zod';
import { GRAPHQL_TYPES } from '../../../constants.js';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// Section 4.5: Control Flow
export const SECTION_4_5_CONTROL_FLOW = '4.5' as const;
export const SECTION_NAME = 'control flow' as const;

export const section_4_5_control_flow = {
  id: SECTION_4_5_CONTROL_FLOW,
  name: 'Control Flow',
  description:
    'Documentation of how control and execution flow currently works in the system, including current system interactions analysis.',
  interfaceName: '_Section_4_5_ControlFlow_',
  businessPurpose:
    'Capture the current state of control flow patterns to understand how system execution and interactions work in the existing system before making changes or planning new features.',
  questionsItAnswers: [
    'How does control currently flow through the system?',
    'What are the current system interaction patterns?',
    'How are current business processes executed?',
    'What are the current control flow constraints and limitations?',
  ],
  validationRules: [
    'Must document current system interactions if control flows exist',
    'Should include current execution patterns and business process flows',
    'For green field projects, indicate no current control flows exist',
    'Include current control flow constraints and limitations',
  ],
  usageGuidelines: [
    'Document actual current control flows, not planned future ones',
    'Include both synchronous and asynchronous control patterns',
    'Document current business process execution flows',
    'For legacy systems, capture existing control flow patterns',
    'For green field projects, clearly indicate absence of current control flows',
  ],
  examples: [
    {
      context: 'Legacy Monolithic System',
      description: 'Current control flows in an existing monolithic application',
      content: {
        controlFlow: 'Sequential execution: Request → Controller → Service → Repository → Database → Response',
        systemInteractions: 'Synchronous method calls between layers, exception handling at each layer',
        businessProcesses:
          'Order processing: Validate → Check inventory → Process payment → Update inventory → Send confirmation',
      },
    },
    {
      context: 'Event-Driven System',
      description: 'Current control flows in an existing event-driven architecture',
      content: {
        controlFlow: 'Event-driven execution: Event → Event Handler → Business Logic → New Events → Event Handlers',
        systemInteractions: 'Asynchronous event processing, event sourcing, saga patterns',
        businessProcesses:
          'Order processing: OrderCreated event → InventoryReserved event → PaymentProcessed event → OrderCompleted event',
      },
    },
    {
      context: 'Green Field Project',
      description: 'New project with no existing control flows',
      content: {
        controlFlow: 'No current control flows exist - this is a new system being designed',
        systemInteractions: 'N/A - No existing system interactions',
        businessProcesses: 'N/A - No existing business processes',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting current control flow reality, not future plans',
    'Include both positive aspects and technical debt in current control flows',
    'For green field projects, clearly state the absence of current control flows',
    'Document current control flow constraints and performance characteristics',
    'Provide context for why current control flow decisions were made',
  ],
  fields: {
    id: createIdField(SECTION_NAME),
    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),
    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    controlFlow: {
      name: 'controlFlow',
      label: 'Control Flow',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Description of current control flow patterns through the system',
        applicability: {
          plan: 'required',
          task: 'omitted',
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
        description: 'Current system interaction patterns and execution flows',
        applicability: {
          plan: 'required',
          task: 'omitted',
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
        description: 'Current business process execution flows and patterns',
        applicability: {
          plan: 'required',
          task: 'omitted',
          project: 'required',
          module: 'required',
          feature: 'required',
        },
      },
    },
    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_4_CURRENT_ARCHITECTURE, SECTION_NAME),
  },
} as const;
