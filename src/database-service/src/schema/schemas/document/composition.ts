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

import { FAMILY_1_META_GOVERNANCE } from './families/1-meta-governance/family-1-meta-governance.js';
import { SECTION_1_1_STATUS } from './families/1-meta-governance/sections/1.1-status.js';

export const DOCUMENT_COMPOSITION = {
  // =============================================================================
  // PLAN DOCUMENT COMPOSITION
  // =============================================================================
  
  Plan: [
    {
      name: "metaGovernance",
      familyId: FAMILY_1_META_GOVERNANCE,
      sections: [],
    }
  ],
  
  // =============================================================================
  // TASK DOCUMENT COMPOSITION
  // =============================================================================
  
  Task: [
    {
      name: "metaGovernance",
      familyId: FAMILY_1_META_GOVERNANCE,
      sections: [SECTION_1_1_STATUS],
    }
  ],
  
  // =============================================================================
  // PROJECT DOCUMENT COMPOSITION
  // =============================================================================
  
  Project: [
    {
      name: "metaGovernance",
      familyId: FAMILY_1_META_GOVERNANCE,
      sections: [],
    }
  ],
  
  // =============================================================================
  // MODULE DOCUMENT COMPOSITION
  // =============================================================================
  
  Module: [
    {
      name: "metaGovernance",
      familyId: FAMILY_1_META_GOVERNANCE,
      sections: [],
    }
  ],
  
  // =============================================================================
  // FEATURE DOCUMENT COMPOSITION
  // =============================================================================
  
  Feature: [
    {
      name: "metaGovernance",
      familyId: FAMILY_1_META_GOVERNANCE,
      sections: [],
    }
  ]
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type DocumentType = keyof typeof DOCUMENT_COMPOSITION;
export type DocumentComposition = typeof DOCUMENT_COMPOSITION[DocumentType];
export type FamilyComposition = {
  name: string;
  familyId: string;
  sections: string[];
};
