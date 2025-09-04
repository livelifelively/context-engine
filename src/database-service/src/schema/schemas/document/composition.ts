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

export const DOCUMENT_COMPOSITION = {
  // =============================================================================
  // PLAN DOCUMENT COMPOSITION
  // =============================================================================
  
  Plan: [
    {
      name: "metaGovernance",
      family: family_1_meta_governance,
      sections: [section_1_1_status, section_1_2_priority_drivers],
    }
  ],
  
  // =============================================================================
  // TASK DOCUMENT COMPOSITION
  // =============================================================================
  
  Task: [
    {
      name: "metaGovernance",
      family: family_1_meta_governance,
      sections: [section_1_2_priority_drivers],
    }
  ],
  
  // =============================================================================
  // PROJECT DOCUMENT COMPOSITION
  // =============================================================================
  
  Project: [
    {
      name: "metaGovernance",
      family: family_1_meta_governance,
      sections: [section_1_3_history],
    }
  ],
  
  // =============================================================================
  // MODULE DOCUMENT COMPOSITION
  // =============================================================================
  
  Module: [
    {
      name: "metaGovernance",
      family: family_1_meta_governance,
      sections: [section_1_3_history],
    }
  ],
  
  // =============================================================================
  // FEATURE DOCUMENT COMPOSITION
  // =============================================================================
  
  Feature: [
    {
      name: "metaGovernance",
      family: family_1_meta_governance,
      sections: [section_1_3_history],
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
  family: any; // Reference to family data object
  sections: any[]; // Array of section data objects
};
