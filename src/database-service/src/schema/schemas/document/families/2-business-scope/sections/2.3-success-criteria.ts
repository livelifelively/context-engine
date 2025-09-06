/**
 * Section 2.3: Success Criteria
 *
 * This file contains the complete data object for the Success Criteria section,
 * serving as the single source of truth for generating:
 * - GraphQL schemas (interfaces and types)
 * - Zod validation schemas
 * - Rich metadata and documentation
 *
 * This section defines measurable or binary statements that define when
 * a Plan is considered complete for its current phase.
 */

import { z } from 'zod';

import {
  createIdField,
  createSectionCreatedOnField,
  createSectionLastUpdatedOnField,
  createFamilyReferenceField,
  FAMILY_INTERFACES,
} from '../../../field-factories.js';

// =============================================================================
// SECTION IDENTIFIER
// =============================================================================

export const SECTION_2_3_SUCCESS_CRITERIA = '2.3' as const;
export const SECTION_NAME = 'success criteria' as const;

// =============================================================================
// DATA TYPE DEFINITIONS
// =============================================================================

// Success Criterion data type - used within this section
export const SuccessCriterionSchema = z.object({
  description: z.string().min(1),
  measurable: z.boolean(),
  target: z.string().optional(),
});

export type SuccessCriterion = z.infer<typeof SuccessCriterionSchema>;

export const section_2_3_success_criteria = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================

  id: SECTION_2_3_SUCCESS_CRITERIA,
  name: 'Success Criteria',
  description: 'Measurable or binary statements that define when a Plan is considered complete',

  // =============================================================================
  // SECTION DEFINITION
  // =============================================================================

  // GraphQL interface name
  interfaceName: '_Section_2_3_SuccessCriteria_',

  // Section-level metadata
  businessPurpose: 'Defines measurable success criteria that determine when strategic objectives are achieved',

  questionsItAnswers: [
    'What are the success criteria for this task/plan/project/module/feature?',
    'How do we know this work is complete?',
    'What measurable outcomes define success?',
    'What are the specific targets to achieve?',
  ],

  validationRules: [
    'Must have at least one success criterion',
    'Each criterion must have a description',
    'Measurable criteria should have targets defined',
  ],

  usageGuidelines: [
    'Should be defined early in the planning process',
    'Must be specific and measurable where possible',
    'Should align with business objectives',
    'Targets should be realistic and achievable',
  ],

  examples: [
    {
      context: 'Logging system for document processing pipeline',
      data: {
        criteria: [
          {
            description: 'All pipeline stages emit structured logs for success, failure, and key business events',
            measurable: true,
            target: '100% of pipeline stages',
          },
          {
            description: 'The central dashboard can successfully ingest and display logs from all pipeline stages',
            measurable: true,
            target: 'All 5 pipeline stages integrated',
          },
          {
            description: 'A comprehensive set of alerts for critical failures is configured and tested',
            measurable: true,
            target: 'All critical failure scenarios covered',
          },
        ],
      },
    },
    {
      context: 'User authentication system',
      data: {
        criteria: [
          {
            description: 'Users can successfully authenticate using corporate SSO credentials',
            measurable: true,
            target: '99.9% authentication success rate',
          },
          {
            description: 'System supports integration with major identity providers (SAML, OAuth)',
            measurable: true,
            target: 'SAML and OAuth 2.0 support implemented',
          },
          {
            description: 'Authentication system meets enterprise security requirements',
            measurable: false,
            target: undefined,
          },
        ],
      },
    },
  ],

  aiInstructions: [
    'Help craft clear, measurable success criteria',
    'Ensure criteria are specific and testable',
    'Suggest appropriate targets for measurable criteria',
    'Help identify missing success criteria',
  ],

  // =============================================================================
  // FIELD DEFINITIONS
  // =============================================================================

  fields: {
    id: createIdField(SECTION_NAME),

    sectionCreatedOn: createSectionCreatedOnField(SECTION_NAME),

    sectionLastUpdatedOn: createSectionLastUpdatedOnField(SECTION_NAME),

    criteria: {
      name: 'criteria',
      label: 'Criteria',
      graphql: {
        type: '[_Section_2_3_1_SuccessCriterion_!]!',
        required: true,
      },
      zod: z.array(SuccessCriterionSchema).min(1),
      metadata: {
        description: 'Array of success criteria that define when the work is considered complete',
        businessPurpose: 'Defines measurable success criteria that determine when strategic objectives are achieved',
        questionsItAnswers: [
          'What are the success criteria for this work?',
          'How do we know this work is complete?',
          'What measurable outcomes define success?',
        ],
        validationRules: [
          'Must contain at least one success criterion',
          'Each criterion must have a description',
          'Measurable criteria should have targets defined',
        ],
        examples: [
          [
            {
              description: 'All pipeline stages emit structured logs for success, failure, and key business events',
              measurable: true,
              target: '100% of pipeline stages',
            },
            {
              description: 'The central dashboard can successfully ingest and display logs from all pipeline stages',
              measurable: true,
              target: 'All 5 pipeline stages integrated',
            },
          ],
        ],
      },
    },

    family: createFamilyReferenceField(FAMILY_INTERFACES.FAMILY_2_BUSINESS_SCOPE, SECTION_NAME),
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Section_2_3_SuccessCriteria_Type = typeof section_2_3_success_criteria;
