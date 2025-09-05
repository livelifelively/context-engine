/**
 * Test Utilities for Metadata Validation
 *
 * Helper functions and utilities for testing metadata validation
 * across families, sections, and documents.
 */

import { expect } from 'vitest';
import { getSectionSchema, getFamilySchema, getDocumentSchema } from '../generators/zod-composer.js';
import { DOCUMENT_COMPOSITION } from '../composition.js';

/**
 * Validates that metadata object has all required fields and types
 */
export function validateMetadataStructure(metadata: any, context: string): void {
  // Check all required fields exist
  expect(metadata, `${context}: Missing businessPurpose`).toHaveProperty('businessPurpose');
  expect(metadata, `${context}: Missing validationRules`).toHaveProperty('validationRules');
  expect(metadata, `${context}: Missing usageGuidelines`).toHaveProperty('usageGuidelines');
  expect(metadata, `${context}: Missing aiInstructions`).toHaveProperty('aiInstructions');

  // Check field types
  expect(typeof metadata.businessPurpose, `${context}: businessPurpose should be string`).toBe('string');
  expect(Array.isArray(metadata.validationRules), `${context}: validationRules should be array`).toBe(true);
  expect(Array.isArray(metadata.usageGuidelines), `${context}: usageGuidelines should be array`).toBe(true);
  expect(typeof metadata.aiInstructions, `${context}: aiInstructions should be string`).toBe('string');

  // Check non-empty values
  expect(metadata.businessPurpose.length, `${context}: businessPurpose should not be empty`).toBeGreaterThan(0);
  expect(metadata.validationRules.length, `${context}: validationRules should not be empty`).toBeGreaterThan(0);
  expect(metadata.usageGuidelines.length, `${context}: usageGuidelines should not be empty`).toBeGreaterThan(0);
  expect(metadata.aiInstructions.length, `${context}: aiInstructions should not be empty`).toBeGreaterThan(0);
}

/**
 * Compares metadata from generated schema with imported data
 */
export function compareMetadata(schemaMetadata: any, importedMetadata: any, context: string): void {
  expect(schemaMetadata.businessPurpose, `${context}: businessPurpose mismatch`).toBe(importedMetadata.businessPurpose);

  expect(schemaMetadata.validationRules, `${context}: validationRules mismatch`).toEqual(
    importedMetadata.validationRules
  );

  expect(schemaMetadata.usageGuidelines, `${context}: usageGuidelines mismatch`).toEqual(
    importedMetadata.usageGuidelines
  );

  expect(schemaMetadata.aiInstructions, `${context}: aiInstructions mismatch`).toBe(importedMetadata.aiInstructions);
}

/**
 * Tests a single section's metadata validation
 */
export async function testSectionMetadata(sectionId: string): Promise<void> {
  const generatedSchema = await getSectionSchema(sectionId);
  const schemaMetadata = generatedSchema.meta();

  validateMetadataStructure(schemaMetadata, `Section ${sectionId}`);
}

/**
 * Tests a single family's metadata validation
 */
export async function testFamilyMetadata(familyId: string): Promise<void> {
  const generatedSchema = await getFamilySchema(familyId);
  const schemaMetadata = generatedSchema.meta();

  validateMetadataStructure(schemaMetadata, `Family ${familyId}`);
}

/**
 * Tests a single document's metadata validation
 */
export async function testDocumentMetadata(documentId: string): Promise<void> {
  const generatedSchema = await getDocumentSchema(documentId as any);
  const schemaMetadata = generatedSchema.meta();

  validateMetadataStructure(schemaMetadata, `Document ${documentId}`);
}

/**
 * Runs metadata validation on multiple random samples
 */
export async function runRandomSamplingValidation(iterations: number = 5): Promise<void> {
  for (let i = 0; i < iterations; i++) {
    const families = getAllFamilies();
    const familyId = families[Math.floor(Math.random() * families.length)];

    const sections = getFamilySections(familyId);
    const sectionId = sections[Math.floor(Math.random() * sections.length)];

    // Test section metadata
    await testSectionMetadata(sectionId);

    // Test family metadata
    await testFamilyMetadata(familyId);
  }
}

/**
 * Gets all available families from DOCUMENT_COMPOSITION
 */
export function getAllFamilies(): string[] {
  const families = new Set<string>();
  for (const documentType of Object.keys(DOCUMENT_COMPOSITION)) {
    const composition = DOCUMENT_COMPOSITION[documentType as keyof typeof DOCUMENT_COMPOSITION];
    for (const familyComposition of composition) {
      const familyId = familyComposition.family.id || familyComposition.name;
      families.add(familyId);
    }
  }
  return Array.from(families);
}

/**
 * Gets all sections for a specific family from DOCUMENT_COMPOSITION
 */
export function getFamilySections(familyId: string): string[] {
  const sections = new Set<string>();
  for (const documentType of Object.keys(DOCUMENT_COMPOSITION)) {
    const composition = DOCUMENT_COMPOSITION[documentType as keyof typeof DOCUMENT_COMPOSITION];
    for (const familyComposition of composition) {
      const currentFamilyId = familyComposition.family.id || familyComposition.name;
      if (currentFamilyId === familyId) {
        for (const section of familyComposition.sections) {
          const sectionId = (section as any).id || (section as any).name;
          sections.add(sectionId);
        }
      }
    }
  }
  return Array.from(sections);
}

/**
 * Gets all available documents from DOCUMENT_COMPOSITION
 */
export function getAllDocuments(): string[] {
  return Object.keys(DOCUMENT_COMPOSITION);
}
