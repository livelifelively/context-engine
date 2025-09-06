import { z } from 'zod';
import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';
import {
  GlossaryItemSchema,
  AppendixItemSchema,
  GRAPHQL_GLOSSARY_ITEM_TYPE,
  GRAPHQL_APPENDIX_ITEM_TYPE,
} from '../shared-data-types.js';

// Section 12.1: Appendices/Glossary
export const SECTION_12_1_APPENDICES_GLOSSARY = '12.1' as const;
export const SECTION_NAME = 'appendices/glossary' as const;

export const section_12_1_appendices_glossary = {
  id: SECTION_12_1_APPENDICES_GLOSSARY,
  name: 'Appendices/Glossary',
  description:
    'A place for glossaries, appendices, or links to external resources. Contains supplementary information that supports the main document content.',
  interfaceName: '_Section_12_1_AppendicesGlossary_',
  businessPurpose:
    'Provide supplementary information, definitions, and reference materials that enhance understanding of the main document content.',
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
    "Use this section for supplementary information that doesn't fit elsewhere",
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
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),
    glossary: {
      name: 'glossary',
      label: 'Glossary',
      graphql: {
        type: `[${GRAPHQL_GLOSSARY_ITEM_TYPE}!]`,
        required: false,
      },
      zod: z.array(GlossaryItemSchema).optional(),
      metadata: {
        description: 'Glossary of terms and definitions relevant to the document',
        applicability: {
          plan: 'optional',
          task: 'optional',
        },
      },
    },
    appendices: {
      name: 'appendices',
      label: 'Appendices',
      graphql: {
        type: `[${GRAPHQL_APPENDIX_ITEM_TYPE}!]`,
        required: false,
      },
      zod: z.array(AppendixItemSchema).optional(),
      metadata: {
        description: 'Appendices containing additional reference materials and resources',
        applicability: {
          plan: 'optional',
          task: 'optional',
        },
      },
    },
    family: createFamilyReferenceField(SECTION_NAME, FAMILY_INTERFACES.FAMILY_12_REFERENCE),
  },
} as const;
