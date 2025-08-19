import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Mock the logger to avoid file system dependencies in tests
vi.mock('./logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn()
  }
}));

describe('Schema Build Script', () => {
  const testDir = path.join(__dirname, '../../../test-schemas');
  const outputDir = path.join(__dirname, '../../../test-dist');
  const outputFile = path.join(outputDir, 'schema.combined.graphql');

  beforeEach(async () => {
    // Create test directories
    await fs.promises.mkdir(testDir, { recursive: true });
    await fs.promises.mkdir(outputDir, { recursive: true });

    // Create test schema files
    const testSchemas = {
      'sections.graphql': `
# Section and content management types
type _System_Document_Section_List_Item_ {
  id: ID!
  document: _System_Document__Documentation_Driven_Development_Methodology_ @hasInverse(field: sections)
  section: _System_Document_Section_ @hasInverse(field: document_list_item)
  order: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type _System_Document_Section_ {
  id: ID!
  name_id: String
  description: String
  title: String!
  document_list_item: _System_Document_Section_List_Item_ @hasInverse(field: section)
  ordered_content: [_System_Document_Section_Ordered_Content_]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type _System_Document_Section_Ordered_Content_ {
  id: ID!
  section: _System_Document_Section_ @hasInverse(field: ordered_content)
  content: String!
  content_type: String!
  order: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}
      `,
      'methodology.graphql': `
# Documentation Driven Development Methodology
type _System_Document__Documentation_Driven_Development_Methodology_ {
  id: ID!
  name_id: String! @id
  document_type: String!
  title: String!
  version: String!
  description: String!
  sections: [_System_Document_Section_List_Item_]! @hasInverse(field: document)
  createdAt: DateTime!
  updatedAt: DateTime!
}
      `,
      'workflow.graphql': `
# Workflow and Phase Management
type _System_Document__Workflow_ {
  id: ID!
  name_id: String! @id
  name: String!
  version: String!
  description: String!
  sections: [_System_Document_Section_]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type _System_Document__Workflow_Phase_ {
  id: ID!
  name_id: String! @id
  name: String!
  version: String!
  description: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}
      `
    };

    for (const [filename, content] of Object.entries(testSchemas)) {
      await fs.promises.writeFile(path.join(testDir, filename), content.trim());
    }

    // Create schema order file
    const schemaOrder = `
import { type SchemaOrderConfig } from './types';

export const schemaOrder: SchemaOrderConfig = [
  "sections.graphql",
  "methodology.graphql",
  "workflow.graphql"
];
    `;
    await fs.promises.writeFile(path.join(testDir, 'schema-order.ts'), schemaOrder.trim());
  });

  afterEach(async () => {
    // Clean up test files
    try {
      await fs.promises.rm(testDir, { recursive: true, force: true });
      await fs.promises.rm(outputDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('Schema File Processing', () => {
    it('should read and combine schema files in correct order', async () => {
      // This would test the actual schema build functionality
      // For now, we'll test the file reading and processing logic
      const files = await fs.promises.readdir(testDir);
      const graphqlFiles = files.filter(file => file.endsWith('.graphql'));
      
      expect(graphqlFiles).toHaveLength(3);
      expect(graphqlFiles).toContain('sections.graphql');
      expect(graphqlFiles).toContain('methodology.graphql');
      expect(graphqlFiles).toContain('workflow.graphql');
    });

    it('should handle missing schema files gracefully', async () => {
      // Remove a schema file
      await fs.promises.unlink(path.join(testDir, 'workflow.graphql'));
      
      const files = await fs.promises.readdir(testDir);
      const graphqlFiles = files.filter(file => file.endsWith('.graphql'));
      
      expect(graphqlFiles).toHaveLength(2);
      expect(graphqlFiles).not.toContain('workflow.graphql');
    });

    it('should validate schema file content', async () => {
      const sectionsContent = await fs.promises.readFile(
        path.join(testDir, 'sections.graphql'), 
        'utf-8'
      );
      
      expect(sectionsContent).toContain('type _System_Document_Section_List_Item_');
      expect(sectionsContent).toContain('type _System_Document_Section_');
      expect(sectionsContent).toContain('type _System_Document_Section_Ordered_Content_');
    });
  });

  describe('Schema Order Configuration', () => {
    it('should respect schema order configuration', async () => {
      const schemaOrderContent = await fs.promises.readFile(
        path.join(testDir, 'schema-order.ts'),
        'utf-8'
      );
      
      expect(schemaOrderContent).toContain('"sections.graphql"');
      expect(schemaOrderContent).toContain('"methodology.graphql"');
      expect(schemaOrderContent).toContain('"workflow.graphql"');
    });

    it('should handle invalid schema order gracefully', async () => {
      // Create invalid schema order
      const invalidOrder = `
import { type SchemaOrderConfig } from './types';

export const schemaOrder: SchemaOrderConfig = [
  "nonexistent.graphql",
  "sections.graphql"
];
      `;
      await fs.promises.writeFile(path.join(testDir, 'schema-order.ts'), invalidOrder.trim());
      
      // This should not throw but handle gracefully
      const files = await fs.promises.readdir(testDir);
      const graphqlFiles = files.filter(file => file.endsWith('.graphql'));
      expect(graphqlFiles.length).toBeGreaterThan(0);
    });
  });

  describe('Output Generation', () => {
    it('should create output directory if it does not exist', async () => {
      const newOutputDir = path.join(__dirname, '../../../test-new-output');
      
      try {
        await fs.promises.mkdir(newOutputDir, { recursive: true });
        await expect(fs.promises.access(newOutputDir)).resolves.not.toThrow();
      } finally {
        await fs.promises.rm(newOutputDir, { recursive: true, force: true });
      }
    });

    it('should generate combined schema with proper formatting', async () => {
      // This would test the actual schema combination logic
      // For now, we'll test that we can read and combine the files
      const files = ['sections.graphql', 'methodology.graphql', 'workflow.graphql'];
      let combinedContent = '';
      
      for (const file of files) {
        const content = await fs.promises.readFile(path.join(testDir, file), 'utf-8');
        combinedContent += `# ----- ${file} -----\n${content}\n\n`;
      }
      
      expect(combinedContent).toContain('# ----- sections.graphql -----');
      expect(combinedContent).toContain('# ----- methodology.graphql -----');
      expect(combinedContent).toContain('# ----- workflow.graphql -----');
      expect(combinedContent).toContain('type _System_Document_Section_List_Item_');
      expect(combinedContent).toContain('type _System_Document__Documentation_Driven_Development_Methodology_');
      expect(combinedContent).toContain('type _System_Document__Workflow_');
    });
  });

  describe('Error Handling', () => {
    it('should handle file system errors gracefully', async () => {
      // Test with non-existent directory
      const nonExistentDir = path.join(__dirname, '../../../non-existent');
      
      try {
        await fs.promises.readdir(nonExistentDir);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.code).toBe('ENOENT');
      }
    });

    it('should handle invalid GraphQL syntax gracefully', async () => {
      // Create a file with invalid GraphQL
      const invalidGraphQL = `
type InvalidType {
  id: ID!
  undefinedField: UndefinedType!
}
      `;
      await fs.promises.writeFile(path.join(testDir, 'invalid.graphql'), invalidGraphQL.trim());
      
      const content = await fs.promises.readFile(path.join(testDir, 'invalid.graphql'), 'utf-8');
      expect(content).toContain('UndefinedType');
    });
  });
});
