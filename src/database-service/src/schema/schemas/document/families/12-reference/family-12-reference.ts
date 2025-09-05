import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../constants.js';

// Family 12: Reference
export const FAMILY_12_REFERENCE = '12-reference' as const;

export const family_12_reference = {
  id: FAMILY_12_REFERENCE,
  name: 'Reference',
  version: '1.0.0',
  description:
    "A catch-all for supplementary information that doesn't fit into the other categories but is still relevant to the document. Contains glossaries, appendices, and external resources.",
  supportedBy: ['plan', 'task'],
  sections: [
    '12.1', // Appendices/Glossary
  ],
  interfaceName: '_Family_12_Reference_',
  businessPurpose:
    "Provide supplementary information, definitions, and reference materials that support the main document content but don't fit into other specific families.",
  questionsItAnswers: [
    'What additional information or definitions are needed?',
    'What external resources or references should be included?',
    'What glossaries or appendices support the document?',
    'What supplementary materials enhance understanding?',
  ],
  validationRules: [
    'Optional for both Plans and Tasks',
    'Should contain relevant supplementary information',
    'Glossary items must have both term and definition',
    'Appendix items must have both title and content',
    'Must provide value beyond main document content',
  ],
  usageGuidelines: [
    "Use this family for supplementary information that doesn't fit elsewhere",
    'Include glossaries for technical terms and acronyms',
    'Add appendices for detailed reference materials',
    'Include links to external resources and documentation',
    'For Plans, provide comprehensive reference materials',
    'For Tasks, include task-specific references and definitions',
    'Ensure all reference materials are relevant and current',
  ],
  examples: [
    {
      context: 'Technical Glossary and References',
      description: 'Comprehensive reference materials for a technical system',
      content: {
        glossary: [
          { term: 'PII', definition: 'Personally Identifiable Information' },
          { term: 'SSO', definition: 'Single Sign-On' },
          { term: 'API', definition: 'Application Programming Interface' },
        ],
        appendices: [
          { title: 'API Documentation', content: 'Link to comprehensive API documentation' },
          { title: 'Security Standards', content: 'Reference to security compliance requirements' },
        ],
      },
    },
    {
      context: 'Business Process References',
      description: 'Reference materials for business process documentation',
      content: {
        glossary: [
          { term: 'SLA', definition: 'Service Level Agreement' },
          { term: 'KPI', definition: 'Key Performance Indicator' },
          { term: 'ROI', definition: 'Return on Investment' },
        ],
        appendices: [
          { title: 'Process Flow Diagrams', content: 'Detailed process flow documentation' },
          { title: 'Stakeholder Matrix', content: 'Complete stakeholder analysis and contact information' },
        ],
      },
    },
  ],
  aiInstructions: [
    'Focus on supplementary information that enhances document understanding',
    'Include relevant glossaries for technical terms and business concepts',
    'Add appendices for detailed reference materials and external resources',
    'Ensure all reference materials are current and relevant',
    'Provide clear definitions and explanations for complex terms',
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
        description: 'Unique identifier for the reference family',
        applicability: {
          plan: 'optional',
          task: 'optional',
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
        description: 'Timestamp when the reference family was created',
        applicability: {
          plan: 'optional',
          task: 'optional',
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
        description: 'Timestamp when the reference family was last updated',
        applicability: {
          plan: 'optional',
          task: 'optional',
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
        description: 'Reference to the parent document containing this reference family',
        applicability: {
          plan: 'optional',
          task: 'optional',
        },
      },
    },
  },
} as const;
