import { z } from 'zod';
import { getGlobalFieldMetadata } from './shared.metadata';

// =============================================================================
// DOCUMENT TYPE SYSTEM
// =============================================================================

// Document type enum for the new version
export const DocumentType = z.enum(['plan', 'task', 'project', 'module', 'feature']);
export type DocumentType = z.infer<typeof DocumentType>;

// Section ID enum for all document sections - matches GraphQL section interfaces
export const SectionSchemaId = z.enum(['1.1', '1.2', '1.3']);
export type SectionSchemaId = z.infer<typeof SectionSchemaId>;

// Legacy document types for backward compatibility
export const LegacyDocumentType = z.enum(['plan', 'task']);
export type LegacyDocumentType = z.infer<typeof LegacyDocumentType>;

// =============================================================================
// STATUS AND PRIORITY SYSTEM
// =============================================================================

// Status keys for task-level documents - matches GraphQL enum
export const StatusKey = z.enum(['NOT_STARTED', 'IN_PROGRESS', 'UNDER_REVIEW', 'COMPLETE', 'BLOCKED']);
export type StatusKey = z.infer<typeof StatusKey>;

// Priority levels - matches GraphQL enum
export const PriorityLevel = z.enum(['HIGH', 'MEDIUM', 'LOW']);
export type PriorityLevel = z.infer<typeof PriorityLevel>;

// =============================================================================
// PRIORITY DRIVERS SYSTEM
// =============================================================================

// Priority driver enum values - matches GraphQL enum format (underscores)
export const PriorityDriver = z.enum([
  // Core-Business Process (CBP)
  'CBP_BREAK_BLOCK_REVENUE_LEGAL',
  'CBP_SLA_BREACH',
  'CBP_PARTIAL_DEGRADATION_KPI',
  'CBP_INCREMENTAL_IMPROVEMENT',

  // Security / Compliance (SEC)
  'SEC_CRITICAL_VULNERABILITY',
  'SEC_DATA_LEAK',
  'SEC_UPCOMING_COMPLIANCE',
  'SEC_HARDENING_LOW_RISK',

  // User Experience (UX)
  'UX_TASK_ABANDONMENT',
  'UX_SEVERE_USABILITY',
  'UX_NOTICEABLE_FRICTION',
  'UX_COSMETIC_POLISH',

  // Marketing / Growth (MKT)
  'MKT_LAUNCH_CRITICAL',
  'MKT_BRAND_RISK',
  'MKT_CAMPAIGN_OPTIMISATION',
  'MKT_LONG_TAIL_SEO',

  // Technical Foundation / Infrastructure (TEC)
  'TEC_PROD_STABILITY_BLOCKER',
  'TEC_DEV_PRODUCTIVITY_BLOCKER',
  'TEC_DEV_PRODUCTIVITY_ENHANCEMENT',
  'TEC_FLAKY_TEST',
  'TEC_TECH_DEBT_REFACTOR',
]);
export type PriorityDriver = z.infer<typeof PriorityDriver>;

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

// Shared validation helpers
export const NonEmptyString = z.string().min(1);
export const NonEmptyStringArray = z.array(NonEmptyString).min(1);

// Reusable date-time string schema for YYYY-MM-DD HH:MM format
export const DateTimeString = z.string().refine(
  (val) => {
    // Check format: YYYY-MM-DD HH:MM
    const parts = val.split(' ');
    if (parts.length !== 2) return false;

    const datePart = parts[0];
    const timePart = parts[1];

    // Date part: YYYY-MM-DD
    const dateParts = datePart.split('-');
    if (dateParts.length !== 3) return false;

    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
    if (year < 1900 || year > 2100) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    // Time part: HH:MM
    const timeParts = timePart.split(':');
    if (timeParts.length !== 2) return false;

    const hour = parseInt(timeParts[0]);
    const minute = parseInt(timeParts[1]);

    if (isNaN(hour) || isNaN(minute)) return false;
    if (hour < 0 || hour > 23) return false;
    if (minute < 0 || minute > 59) return false;

    return true;
  },
  {
    message: "Date must be in format 'YYYY-MM-DD HH:MM'",
  }
);

// =============================================================================
// FAMILY CONFIGURATION
// =============================================================================

// Configuration for schema family definitions
export interface SchemaFamilyConfig {
  id: number;
  name: string;
  version: string;
  description: string;
}

// Document reference type for document ID references
export const DocumentDatabaseId = z.string().min(1).optional().meta(getGlobalFieldMetadata('documentDatabaseId'));
export type DocumentDatabaseId = z.infer<typeof DocumentDatabaseId>;

// Section reference type for section ID references
export const SectionDatabaseId = z.string().min(1).optional().meta(getGlobalFieldMetadata('sectionDatabaseId'));
export type SectionDatabaseId = z.infer<typeof SectionDatabaseId>;

// Family reference type for family ID references
export const FamilyDatabaseId = z.string().min(1).optional().meta(getGlobalFieldMetadata('familyDatabaseId'));
export type FamilyDatabaseId = z.infer<typeof FamilyDatabaseId>;

// =============================================================================
// BASE SCHEMAS (Common schemas used across all families)
// =============================================================================

// Base schema for all sections - contains common fields
export const BaseSectionSchema = z.object({
  id: SectionDatabaseId,
  sectionCreatedOn: DateTimeString.meta(getGlobalFieldMetadata('sectionCreatedOn')),
  sectionLastUpdatedOn: DateTimeString.meta(getGlobalFieldMetadata('sectionLastUpdatedOn')),
  family: FamilyDatabaseId,
});

// Base Family schema (shared fields)
export const BaseFamilySchema = z
  .object({
    id: FamilyDatabaseId,
    familyCreatedOn: DateTimeString.meta(getGlobalFieldMetadata('familyCreatedOn')),
    familyLastUpdatedOn: DateTimeString.meta(getGlobalFieldMetadata('familyLastUpdatedOn')),
    document: DocumentDatabaseId,
  });

export type BaseSection = z.infer<typeof BaseSectionSchema>;
export type BaseFamily = z.infer<typeof BaseFamilySchema>;

// =============================================================================
// METADATA TYPE INTERFACES
// =============================================================================
