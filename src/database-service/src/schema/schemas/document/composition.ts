/**
 * Document Composition Configuration
 *
 * This file defines how documents compose from families and sections.
 * It serves as the single source of truth for:
 * - Which families each document type includes
 * - Which sections each document type includes
 * - Document-specific relationships and configurations
 *
 * This centralized approach makes it easy to:
 * - Add/remove families or sections from document types
 * - Change composition rules without touching individual document files
 * - Trigger regeneration when composition changes
 */

import { family_1_meta_governance } from './families/1-meta-governance/family-1-meta-governance.js';
import { section_1_1_status } from './families/1-meta-governance/sections/1.1-status.js';
import { section_1_2_priority_drivers } from './families/1-meta-governance/sections/1.2-priority-drivers.js';
import { section_1_3_history } from './families/1-meta-governance/sections/1.3-history.js';

import { family_2_business_scope } from './families/2-business-scope/family-2-business-scope.js';
import { section_2_1_overview } from './families/2-business-scope/sections/2.1-overview.js';
import { section_2_2_business_context } from './families/2-business-scope/sections/2.2-business-context.js';
import { section_2_2_1_user_personas } from './families/2-business-scope/sections/2.2.1-user-personas.js';
import { section_2_2_2_business_rules } from './families/2-business-scope/sections/2.2.2-business-rules.js';
import { section_2_2_3_user_stories } from './families/2-business-scope/sections/2.2.3-user-stories.js';
import { section_2_2_4_user_journeys } from './families/2-business-scope/sections/2.2.4-user-journeys.js';
import { section_2_3_success_criteria } from './families/2-business-scope/sections/2.3-success-criteria.js';
import { section_2_4_definition_of_done } from './families/2-business-scope/sections/2.4-definition-of-done.js';
import { section_2_5_boundaries_scope } from './families/2-business-scope/sections/2.5-boundaries-scope.js';
import { section_2_6_core_business_processes } from './families/2-business-scope/sections/2.6-core-business-processes.js';

export const DOCUMENT_COMPOSITION = {
  // =============================================================================
  // PLAN DOCUMENT COMPOSITION
  // =============================================================================

  Plan: [
    {
      name: 'metaGovernance',
      family: family_1_meta_governance,
      sections: [section_1_1_status, section_1_2_priority_drivers],
    },
    {
      name: 'businessScope',
      family: family_2_business_scope,
      sections: [
        section_2_1_overview,
        section_2_2_business_context,
        section_2_2_1_user_personas,
        section_2_2_2_business_rules,
        section_2_2_3_user_stories,
        section_2_2_4_user_journeys,
        section_2_3_success_criteria,
        section_2_5_boundaries_scope,
        section_2_6_core_business_processes,
      ],
    },
  ],

  // =============================================================================
  // TASK DOCUMENT COMPOSITION
  // =============================================================================

  Task: [
    {
      name: 'metaGovernance',
      family: family_1_meta_governance,
      sections: [section_1_2_priority_drivers],
    },
    {
      name: 'businessScope',
      family: family_2_business_scope,
      sections: [section_2_1_overview, section_2_4_definition_of_done],
    },
  ],

  // =============================================================================
  // PROJECT DOCUMENT COMPOSITION
  // =============================================================================

  Project: [
    {
      name: 'metaGovernance',
      family: family_1_meta_governance,
      sections: [section_1_3_history],
    },
  ],

  // =============================================================================
  // MODULE DOCUMENT COMPOSITION
  // =============================================================================

  Module: [
    {
      name: 'metaGovernance',
      family: family_1_meta_governance,
      sections: [section_1_3_history],
    },
  ],

  // =============================================================================
  // FEATURE DOCUMENT COMPOSITION
  // =============================================================================

  Feature: [
    {
      name: 'metaGovernance',
      family: family_1_meta_governance,
      sections: [section_1_3_history],
    },
  ],
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type DocumentType = keyof typeof DOCUMENT_COMPOSITION;
export type DocumentComposition = (typeof DOCUMENT_COMPOSITION)[DocumentType];
export type FamilyComposition = {
  name: string;
  family: any; // Reference to family data object
  sections: any[]; // Array of section data objects
};
