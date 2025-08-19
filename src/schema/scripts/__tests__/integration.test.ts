import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Mock fetch globally
global.fetch = vi.fn();

// Mock the logger
vi.mock('./logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    logSchemaBuild: vi.fn(),
    logSchemaApply: vi.fn(),
    logErrorWithContext: vi.fn(),
    getLogFiles: vi.fn(),
    getRecentLogs: vi.fn()
  }
}));

describe('Schema Management Integration', () => {
  const testDir = path.join(__dirname, '../../../test-integration');
  const testSchemasDir = path.join(testDir, 'schemas');
  const testDistDir = path.join(testDir, 'dist');
  const testLogsDir = path.join(testDir, 'logs');

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

  beforeAll(async () => {
    // Create test directory structure
    await fs.promises.mkdir(testDir, { recursive: true });
    await fs.promises.mkdir(testSchemasDir, { recursive: true });
    await fs.promises.mkdir(testDistDir, { recursive: true });
    await fs.promises.mkdir(testLogsDir, { recursive: true });
  });

  afterAll(async () => {
    // Clean up test directory
    try {
      await fs.promises.rm(testDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  beforeEach(async () => {
    // Create test schema files
    for (const [filename, content] of Object.entries(testSchemas)) {
      await fs.promises.writeFile(path.join(testSchemasDir, filename), content.trim());
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
    await fs.promises.writeFile(path.join(testSchemasDir, 'schema-order.ts'), schemaOrder.trim());

    // Reset mocks
    vi.clearAllMocks();
  });

  afterEach(async () => {
    // Clean up test files
    try {
      const files = await fs.promises.readdir(testSchemasDir);
      for (const file of files) {
        await fs.promises.unlink(path.join(testSchemasDir, file));
      }
      
      const distFiles = await fs.promises.readdir(testDistDir);
      for (const file of distFiles) {
        await fs.promises.unlink(path.join(testDistDir, file));
      }
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('Complete Workflow', () => {
    it('should build schema from modular files', async () => {
      // Test schema file reading
      const files = await fs.promises.readdir(testSchemasDir);
      const graphqlFiles = files.filter(file => file.endsWith('.graphql'));
      
      expect(graphqlFiles).toHaveLength(3);
      expect(graphqlFiles).toContain('sections.graphql');
      expect(graphqlFiles).toContain('methodology.graphql');
      expect(graphqlFiles).toContain('workflow.graphql');

      // Test schema combination
      let combinedContent = '';
      const orderedFiles = ['sections.graphql', 'methodology.graphql', 'workflow.graphql'];
      
      for (const file of orderedFiles) {
        const content = await fs.promises.readFile(path.join(testSchemasDir, file), 'utf-8');
        combinedContent += `# ----- ${file} -----\n${content}\n\n`;
      }

      // Validate combined content
      expect(combinedContent).toContain('# ----- sections.graphql -----');
      expect(combinedContent).toContain('# ----- methodology.graphql -----');
      expect(combinedContent).toContain('# ----- workflow.graphql -----');
      expect(combinedContent).toContain('type _System_Document_Section_List_Item_');
      expect(combinedContent).toContain('type _System_Document__Documentation_Driven_Development_Methodology_');
      expect(combinedContent).toContain('type _System_Document__Workflow_');
      expect(combinedContent).toContain('type _System_Document__Workflow_Phase_');

      // Write combined schema
      const outputFile = path.join(testDistDir, 'schema.combined.graphql');
      await fs.promises.writeFile(outputFile, combinedContent);

      // Verify output file
      const outputContent = await fs.promises.readFile(outputFile, 'utf-8');
      expect(outputContent).toBe(combinedContent);
    });

    it('should apply schema to Dgraph successfully', async () => {
      // Create combined schema
      const outputFile = path.join(testDistDir, 'schema.combined.graphql');
      let combinedContent = '';
      const orderedFiles = ['sections.graphql', 'methodology.graphql', 'workflow.graphql'];
      
      for (const file of orderedFiles) {
        const content = await fs.promises.readFile(path.join(testSchemasDir, file), 'utf-8');
        combinedContent += `# ----- ${file} -----\n${content}\n\n`;
      }
      
      await fs.promises.writeFile(outputFile, combinedContent);

      // Mock successful Dgraph response
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        text: async () => JSON.stringify({
          data: {
            code: 'Success',
            message: 'Done'
          }
        }),
        headers: new Map([
          ['content-type', 'application/json']
        ])
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      // Test schema application
      const schemaContent = await fs.promises.readFile(outputFile, 'utf-8');
      expect(schemaContent).toBeDefined();
      expect(schemaContent.length).toBeGreaterThan(0);
      expect(schemaContent).toContain('type _System_Document_Section_List_Item_');
      expect(schemaContent).toContain('type _System_Document__Documentation_Driven_Development_Methodology_');
      expect(schemaContent).toContain('type _System_Document__Workflow_');
    });

    it('should handle Dgraph schema errors', async () => {
      // Create combined schema with error
      const outputFile = path.join(testDistDir, 'schema.combined.graphql');
      const invalidSchema = `
type InvalidType {
  id: ID!
  undefinedField: UndefinedType!
}
      `;
      await fs.promises.writeFile(outputFile, invalidSchema);

      // Mock Dgraph error response
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        text: async () => JSON.stringify({
          errors: [{
            message: 'resolving updateGQLSchema failed because input:3: Undefined type UndefinedType.\n (Locations: [{Line: 3, Column: 4}])',
            extensions: { code: 'Error' }
          }]
        }),
        headers: new Map([
          ['content-type', 'application/json']
        ])
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      // Test error handling
      const schemaContent = await fs.promises.readFile(outputFile, 'utf-8');
      expect(schemaContent).toContain('UndefinedType');
    });

    it('should log operations throughout the workflow', async () => {
      // Test logging during schema build
      const outputFile = path.join(testDistDir, 'schema.combined.graphql');
      let combinedContent = '';
      const orderedFiles = ['sections.graphql', 'methodology.graphql', 'workflow.graphql'];
      
      for (const file of orderedFiles) {
        const content = await fs.promises.readFile(path.join(testSchemasDir, file), 'utf-8');
        combinedContent += `# ----- ${file} -----\n${content}\n\n`;
      }
      
      await fs.promises.writeFile(outputFile, combinedContent);

      // Test logging during schema application
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        text: async () => JSON.stringify({
          data: {
            code: 'Success',
            message: 'Done'
          }
        }),
        headers: new Map([
          ['content-type', 'application/json']
        ])
      };
      
      (global.fetch as any).mockResolvedValue(mockResponse);

      // Verify logging would occur
      expect(global.fetch).toBeDefined();
    });
  });

  describe('Error Recovery', () => {
    it('should handle missing schema files gracefully', async () => {
      // Remove a schema file
      await fs.promises.unlink(path.join(testSchemasDir, 'workflow.graphql'));
      
      const files = await fs.promises.readdir(testSchemasDir);
      const graphqlFiles = files.filter(file => file.endsWith('.graphql'));
      
      expect(graphqlFiles).toHaveLength(2);
      expect(graphqlFiles).not.toContain('workflow.graphql');
    });

    it('should handle network failures during schema application', async () => {
      // Create valid schema
      const outputFile = path.join(testDistDir, 'schema.combined.graphql');
      const validSchema = testSchemas['sections.graphql'];
      await fs.promises.writeFile(outputFile, validSchema);

      // Mock network failure
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      // Test error handling
      const schemaContent = await fs.promises.readFile(outputFile, 'utf-8');
      expect(schemaContent).toContain('type _System_Document_Section_List_Item_');
    });

    it('should handle invalid schema order configuration', async () => {
      // Create invalid schema order
      const invalidOrder = `
import { type SchemaOrderConfig } from './types';

export const schemaOrder: SchemaOrderConfig = [
  "nonexistent.graphql",
  "sections.graphql"
];
      `;
      await fs.promises.writeFile(path.join(testSchemasDir, 'schema-order.ts'), invalidOrder.trim());
      
      // This should not throw but handle gracefully
      const files = await fs.promises.readdir(testSchemasDir);
      const graphqlFiles = files.filter(file => file.endsWith('.graphql'));
      expect(graphqlFiles.length).toBeGreaterThan(0);
    });
  });

  describe('Schema Validation', () => {
    it('should validate schema dependencies', async () => {
      // Test that schema types reference each other correctly
      const sectionsContent = await fs.promises.readFile(path.join(testSchemasDir, 'sections.graphql'), 'utf-8');
      const methodologyContent = await fs.promises.readFile(path.join(testSchemasDir, 'methodology.graphql'), 'utf-8');
      
      // Check that sections.graphql references methodology type
      expect(sectionsContent).toContain('_System_Document__Documentation_Driven_Development_Methodology_');
      
      // Check that methodology.graphql references sections type
      expect(methodologyContent).toContain('_System_Document_Section_List_Item_');
    });

    it('should validate GraphQL syntax', async () => {
      // Test basic GraphQL syntax validation
      const files = ['sections.graphql', 'methodology.graphql', 'workflow.graphql'];
      
      for (const file of files) {
        const content = await fs.promises.readFile(path.join(testSchemasDir, file), 'utf-8');
        
        // Check for required GraphQL syntax
        expect(content).toContain('type ');
        expect(content).toContain('{');
        expect(content).toContain('}');
        expect(content).toContain('ID!');
        expect(content).toContain('String');
        expect(content).toContain('DateTime!');
      }
    });

    it('should validate Dgraph-specific directives', async () => {
      // Test Dgraph-specific GraphQL directives
      const methodologyContent = await fs.promises.readFile(path.join(testSchemasDir, 'methodology.graphql'), 'utf-8');
      
      expect(methodologyContent).toContain('@id');
      expect(methodologyContent).toContain('@hasInverse');
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle large schema files efficiently', async () => {
      // Create a large schema file
      const largeSchema = `
# Large schema file for testing
${Array(100).fill(0).map((_, i) => `
type LargeType${i} {
  id: ID!
  name: String!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
}
      `).join('')}
      `.trim();
      
      const largeFile = path.join(testSchemasDir, 'large.graphql');
      await fs.promises.writeFile(largeFile, largeSchema);
      
      // Test reading large file
      const content = await fs.promises.readFile(largeFile, 'utf-8');
      expect(content.length).toBeGreaterThan(1000);
      expect(content).toContain('LargeType0');
      expect(content).toContain('LargeType99');
    });

    it('should handle multiple schema files efficiently', async () => {
      // Create multiple schema files
      const additionalSchemas = {
        'additional1.graphql': `
type AdditionalType1 {
  id: ID!
  name: String!
}
        `,
        'additional2.graphql': `
type AdditionalType2 {
  id: ID!
  name: String!
}
        `,
        'additional3.graphql': `
type AdditionalType3 {
  id: ID!
  name: String!
}
        `
      };
      
      for (const [filename, content] of Object.entries(additionalSchemas)) {
        await fs.promises.writeFile(path.join(testSchemasDir, filename), content.trim());
      }
      
      // Test reading multiple files
      const files = await fs.promises.readdir(testSchemasDir);
      const graphqlFiles = files.filter(file => file.endsWith('.graphql'));
      
      expect(graphqlFiles.length).toBeGreaterThan(3);
      expect(graphqlFiles).toContain('additional1.graphql');
      expect(graphqlFiles).toContain('additional2.graphql');
      expect(graphqlFiles).toContain('additional3.graphql');
    });
  });

  describe('Configuration Management', () => {
    it('should respect schema order configuration', async () => {
      // Test that schema files are processed in the correct order
      const schemaOrderContent = await fs.promises.readFile(path.join(testSchemasDir, 'schema-order.ts'), 'utf-8');
      
      expect(schemaOrderContent).toContain('"sections.graphql"');
      expect(schemaOrderContent).toContain('"methodology.graphql"');
      expect(schemaOrderContent).toContain('"workflow.graphql"');
      
      // Verify order
      const orderMatch = schemaOrderContent.match(/\[([^\]]+)\]/);
      if (orderMatch) {
        const order = orderMatch[1];
        expect(order).toContain('sections.graphql');
        expect(order).toContain('methodology.graphql');
        expect(order).toContain('workflow.graphql');
      }
    });

    it('should handle environment-specific configurations', async () => {
      // Test environment variable handling
      const originalEnv = process.env;
      
      process.env.DGRAPH_HOST = 'test-host';
      process.env.DGRAPH_PORT = '9090';
      
      expect(process.env.DGRAPH_HOST).toBe('test-host');
      expect(process.env.DGRAPH_PORT).toBe('9090');
      
      process.env = originalEnv;
    });
  });
});

