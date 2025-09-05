/**
 * Shared Type Definitions for Schema Generation
 * 
 * This file contains all the shared TypeScript interfaces and types
 * used across the schema generation system. This eliminates redundancy
 * and provides a single source of truth for type definitions.
 */

import { z } from 'zod';

// =============================================================================
// CORE DATA STRUCTURES
// =============================================================================

export interface FieldDefinition {
  name: string;
  label: string;
  graphql: {
    type: string;
    required: boolean;
  };
  zod: z.ZodTypeAny;
  metadata: {
    description: string;
    businessPurpose: string;
    validationRules: readonly string[];
    examples?: readonly any[];
  };
}

export interface SectionData {
  id: string;
  name: string;
  description: string;
  interfaceName: string;
  businessPurpose: string;
  validationRules: readonly string[];
  usageGuidelines: readonly string[];
  aiInstructions: readonly string[];
  fields: Record<string, FieldDefinition>;
}

export interface FamilyData {
  id: string;
  name: string;
  version: string;
  description: string;
  interfaceName: string;
  businessPurpose: string;
  validationRules: readonly string[];
  usageGuidelines: readonly string[];
  aiInstructions: readonly string[];
  questionsItAnswers: readonly string[];
  fields: Record<string, FieldDefinition>;
}

// =============================================================================
// COMPOSITION TYPES
// =============================================================================

export interface FamilyComposition {
  name: string;
  family: FamilyData;
  sections: SectionData[];
}

export interface DocumentComposition {
  [documentType: string]: FamilyComposition[];
}

// =============================================================================
// GENERATOR TYPES
// =============================================================================

export type DocumentType = 'Plan' | 'Task' | 'Project' | 'Module' | 'Feature';
export type SectionId = string;
export type FamilyId = string;

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type SectionMap = Map<SectionId, SectionData>;
export type FamilyMap = Map<FamilyId, FamilyData>;
