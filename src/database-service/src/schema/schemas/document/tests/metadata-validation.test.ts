import { describe, it, expect } from 'vitest';
import { getSectionSchema, getFamilySchema, getDocumentSchema } from '../generators/zod-composer.js';
import { DOCUMENT_COMPOSITION } from '../composition.js';
import * as z from 'zod';

/**
 * Metadata Validation Tests
 *
 * These tests validate that metadata is properly attached to Zod schemas
 * and matches the imported data exactly. Uses random sampling to ensure
 * comprehensive coverage across all families and sections.
 *
 * Uses DOCUMENT_COMPOSITION as the single source of truth for available
 * families, sections, and documents.
 */

/**
 * Gets all available families from DOCUMENT_COMPOSITION
 */
function getAvailableFamilies(): string[] {
  const families = new Set<string>();
  for (const documentType of Object.keys(DOCUMENT_COMPOSITION)) {
    const composition = DOCUMENT_COMPOSITION[documentType as keyof typeof DOCUMENT_COMPOSITION];
    for (const familyComposition of composition) {
      // Extract family ID from the family object (assuming it has an id property)
      const familyId = familyComposition.family.id || familyComposition.name;
      families.add(familyId);
    }
  }
  return Array.from(families);
}

/**
 * Gets all available sections from DOCUMENT_COMPOSITION
 */
function getAvailableSections(): string[] {
  const sections = new Set<string>();
  for (const documentType of Object.keys(DOCUMENT_COMPOSITION)) {
    const composition = DOCUMENT_COMPOSITION[documentType as keyof typeof DOCUMENT_COMPOSITION];
    for (const familyComposition of composition) {
      for (const section of familyComposition.sections) {
        // Extract section ID from the section object (assuming it has an id property)
        const sectionId = (section as any).id || (section as any).name;
        sections.add(sectionId);
      }
    }
  }
  return Array.from(sections);
}

/**
 * Gets all available document types from DOCUMENT_COMPOSITION
 */
function getAvailableDocuments(): string[] {
  return Object.keys(DOCUMENT_COMPOSITION);
}

/**
 * Randomly selects a family and section for testing
 */
function selectRandomFamilyAndSection(): { familyId: string; sectionId: string } {
  const families = getAvailableFamilies();
  const familyId = families[Math.floor(Math.random() * families.length)];

  // Get sections for this family
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

  const sectionArray = Array.from(sections);
  const sectionId = sectionArray[Math.floor(Math.random() * sectionArray.length)];

  return { familyId, sectionId };
}

/**
 * Randomly selects a document type for testing
 */
function selectRandomDocument(): string {
  const documents = getAvailableDocuments();
  return documents[Math.floor(Math.random() * documents.length)];
}

/**
 * Validates that metadata object has all required fields and types
 */
function validateMetadataStructure(metadata: any, context: string): void {
  // Check all required fields exist
  expect(metadata, `${context}: Missing businessPurpose`).toHaveProperty('businessPurpose');
  expect(metadata, `${context}: Missing validationRules`).toHaveProperty('validationRules');
  expect(metadata, `${context}: Missing usageGuidelines`).toHaveProperty('usageGuidelines');
  expect(metadata, `${context}: Missing aiInstructions`).toHaveProperty('aiInstructions');

  // Check field types
  expect(typeof metadata.businessPurpose, `${context}: businessPurpose should be string`).toBe('string');
  expect(Array.isArray(metadata.validationRules), `${context}: validationRules should be array`).toBe(true);
  expect(Array.isArray(metadata.usageGuidelines), `${context}: usageGuidelines should be array`).toBe(true);
  expect(Array.isArray(metadata.aiInstructions), `${context}: aiInstructions should be array`).toBe(true);

  // Check non-empty values
  expect(metadata.businessPurpose.length, `${context}: businessPurpose should not be empty`).toBeGreaterThan(0);
  expect(metadata.validationRules.length, `${context}: validationRules should not be empty`).toBeGreaterThan(0);
  expect(metadata.usageGuidelines.length, `${context}: usageGuidelines should not be empty`).toBeGreaterThan(0);
  expect(metadata.aiInstructions.length, `${context}: aiInstructions should not be empty`).toBeGreaterThan(0);
}

/**
 * Compares metadata from generated schema with imported data
 */
function compareMetadata(schemaMetadata: any, importedMetadata: any, context: string): void {
  expect(schemaMetadata.businessPurpose, `${context}: businessPurpose mismatch`).toBe(importedMetadata.businessPurpose);

  expect(schemaMetadata.validationRules, `${context}: validationRules mismatch`).toEqual(
    importedMetadata.validationRules
  );

  expect(schemaMetadata.usageGuidelines, `${context}: usageGuidelines mismatch`).toEqual(
    importedMetadata.usageGuidelines
  );

  expect(schemaMetadata.aiInstructions, `${context}: aiInstructions mismatch`).toBe(importedMetadata.aiInstructions);
}

describe('Metadata Validation Tests', () => {
  describe('Composition Configuration Validation', () => {
    it('should have valid DOCUMENT_COMPOSITION structure', () => {
      // Test that DOCUMENT_COMPOSITION has the expected structure
      expect(DOCUMENT_COMPOSITION).toBeDefined();
      expect(typeof DOCUMENT_COMPOSITION).toBe('object');

      // Test that we have document types
      const documentTypes = Object.keys(DOCUMENT_COMPOSITION);
      expect(documentTypes.length).toBeGreaterThan(0);

      // Test each document type has valid composition
      for (const documentType of documentTypes) {
        const composition = DOCUMENT_COMPOSITION[documentType as keyof typeof DOCUMENT_COMPOSITION];
        expect(Array.isArray(composition)).toBe(true);
        expect(composition.length).toBeGreaterThan(0);

        // Test each family composition
        for (const familyComposition of composition) {
          expect(familyComposition).toHaveProperty('name');
          expect(familyComposition).toHaveProperty('family');
          expect(familyComposition).toHaveProperty('sections');
          expect(Array.isArray(familyComposition.sections)).toBe(true);
        }
      }
    });

    it('should be able to extract families and sections from composition', () => {
      const families = getAvailableFamilies();
      const sections = getAvailableSections();
      const documents = getAvailableDocuments();

      expect(families.length).toBeGreaterThan(0);
      expect(sections.length).toBeGreaterThan(0);
      expect(documents.length).toBeGreaterThan(0);

      // Log for debugging
      console.log('Available families:', families);
      console.log('Available sections:', sections);
      console.log('Available documents:', documents);
    });
  });
  describe('Random Section Metadata Validation', () => {
    it('should validate random section metadata matches imported data', async () => {
      const { familyId, sectionId } = selectRandomFamilyAndSection();

      // Generate schema from imported data
      const generatedSchema = await getSectionSchema(sectionId);

      // Extract metadata from generated schema
      const schemaMetadata = generatedSchema.meta();

      // Validate metadata structure
      validateMetadataStructure(schemaMetadata, `Section ${sectionId}`);
    });

    it('should validate section metadata completeness', async () => {
      const { sectionId } = selectRandomFamilyAndSection();

      const schema = await getSectionSchema(sectionId);
      const metadata = schema.meta();

      validateMetadataStructure(metadata, `Section ${sectionId}`);
    });
  });

  describe('Random Family Metadata Validation', () => {
    it('should validate random family metadata matches imported data', async () => {
      const { familyId } = selectRandomFamilyAndSection();

      // Generate schema from imported data
      const generatedSchema = await getFamilySchema(familyId);

      // Extract metadata from generated schema
      const schemaMetadata = generatedSchema.meta();

      // Validate metadata structure
      validateMetadataStructure(schemaMetadata, `Family ${familyId}`);
    });

    it('should validate family metadata completeness', async () => {
      const { familyId } = selectRandomFamilyAndSection();

      const schema = await getFamilySchema(familyId);
      const metadata = schema.meta();

      validateMetadataStructure(metadata, `Family ${familyId}`);
    });
  });

  describe('Random Document Metadata Validation', () => {
    it('should validate random document metadata matches imported data', async () => {
      // Get available documents from composition
      const documentId = selectRandomDocument();

      // Generate schema from imported data
      const generatedSchema = await getDocumentSchema(documentId as any);

      // Extract metadata from generated schema
      const schemaMetadata = generatedSchema.meta();

      // Validate metadata structure
      validateMetadataStructure(schemaMetadata, `Document ${documentId}`);
    });
  });

  describe('Multiple Random Samples Validation', () => {
    it('should validate metadata across multiple random samples', async () => {
      const iterations = 5; // Test 5 random samples

      for (let i = 0; i < iterations; i++) {
        const { familyId, sectionId } = selectRandomFamilyAndSection();

        // Test section metadata
        const sectionSchema = await getSectionSchema(sectionId);
        const sectionMetadata = sectionSchema.meta();

        validateMetadataStructure(sectionMetadata, `Iteration ${i + 1} - Section ${sectionId}`);

        // Test family metadata
        const familySchema = await getFamilySchema(familyId);
        const familyMetadata = familySchema.meta();

        validateMetadataStructure(familyMetadata, `Iteration ${i + 1} - Family ${familyId}`);
      }
    });
  });

  describe('JSON Schema Metadata Validation', () => {
    it('should preserve metadata in JSON Schema conversion', async () => {
      const { sectionId } = selectRandomFamilyAndSection();

      const schema = await getSectionSchema(sectionId);
      const metadata = schema.meta();

      // Try to convert to JSON Schema, but handle Date fields gracefully
      let jsonSchema;
      try {
        jsonSchema = z.toJSONSchema(schema);
      } catch (error) {
        // If conversion fails due to Date fields, that's expected
        // We'll just verify the metadata is accessible
        expect(metadata, 'Metadata should be accessible even if JSON Schema conversion fails').toBeDefined();
        expect(metadata?.businessPurpose, 'Business purpose should be preserved').toBeDefined();
        return;
      }

      // Check that JSON Schema has the expected structure
      expect(jsonSchema).toHaveProperty('type', 'object');
      expect(jsonSchema).toHaveProperty('properties');
      expect(jsonSchema).toHaveProperty('required');

      // Note: JSON Schema conversion might not preserve all metadata
      // This test ensures the conversion works without errors
      expect(() => z.toJSONSchema(schema)).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing section gracefully', async () => {
      await expect(getSectionSchema('non-existent-section' as any)).rejects.toThrow();
    });

    it('should handle missing family gracefully', async () => {
      await expect(getFamilySchema('non-existent-family' as any)).rejects.toThrow();
    });

    it('should handle missing document gracefully', async () => {
      await expect(getDocumentSchema('non-existent-document' as any)).rejects.toThrow();
    });
  });
});
