import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { DGraphService } from '../dgraph.service';

describe('DGraphService', () => {
  let dgraphService: DGraphService;
  let createdDocumentIds: string[] = [];

  beforeAll(async () => {
    dgraphService = new DGraphService();
    await dgraphService.initialize();
  });

  afterAll(async () => {
    // Clean up any documents created during the tests
    for (const documentId of createdDocumentIds) {
      try {
        await dgraphService.delete(documentId);
      } catch (error) {
        // Ignore cleanup errors - document might already be deleted
        console.log(`Cleanup warning: Could not delete document ${documentId}:`, error);
      }
    }
    
    await dgraphService.close();
  });

  beforeEach(() => {
    createdDocumentIds = []; // Reset the list for each test
  });

  afterEach(async () => {
    // Clean up any documents created during the test
    for (const documentId of createdDocumentIds) {
      try {
        await dgraphService.delete(documentId);
      } catch (error) {
        // Ignore cleanup errors - document might already be deleted
        console.log(`Cleanup warning: Could not delete document ${documentId}:`, error);
      }
    }
  });

  describe('Connection', () => {
    it('should initialize successfully', async () => {
      await expect(dgraphService.initialize()).resolves.not.toThrow();
    });
  });

  describe('GraphQL Operations', () => {
    it('should create a methodology document', async () => {
      const uniqueId = `test-dgraph-service-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const testData = {
        'dgraph.type': '_System_Document__Documentation_Driven_Development_Methodology_',
        name_id: uniqueId,
        document_type: 'methodology',
        title: 'Test DGraphService Methodology',
        version: '1.0.0',
        description: 'A test methodology document for DGraphService testing',
        sections: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const documentId = await dgraphService.create(testData);
      
      // Track the created document for cleanup
      createdDocumentIds.push(documentId);
      
      expect(documentId).toBeDefined();
      expect(typeof documentId).toBe('string');
      expect(documentId.length).toBeGreaterThan(0);
    });

    it('should query methodology documents', async () => {
      // First create a test document
      const uniqueId = `test-query-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const testData = {
        'dgraph.type': '_System_Document__Documentation_Driven_Development_Methodology_',
        name_id: uniqueId,
        document_type: 'methodology',
        title: 'Test Query Document',
        version: '1.0.0',
        description: 'A test document for query testing',
        sections: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const documentId = await dgraphService.create(testData);
      createdDocumentIds.push(documentId);

      // Now query documents
      const query = `
        query {
          docs: query_System_Document__Documentation_Driven_Development_Methodology_ {
            id
            name_id
            title
          }
        }
      `;

      const result = await dgraphService.query(query);
      
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(result.data.docs).toBeDefined();
      expect(Array.isArray(result.data.docs)).toBe(true);
      expect(result.data.docs.length).toBeGreaterThan(0);
      
      // Verify our test document is in the results
      const testDoc = result.data.docs.find((doc: any) => doc.name_id === uniqueId);
      expect(testDoc).toBeDefined();
      expect(testDoc.title).toBe(testData.title);
    });
  });

  describe('Schema Operations', () => {
    it('should handle schema operations gracefully', async () => {
      const testSchema = `
        type TestType {
          name: String
          email: String
        }
      `;

      // These operations log warnings since they're not implemented yet
      await expect(dgraphService.setSchema(testSchema)).resolves.not.toThrow();
      
      const schema = await dgraphService.getSchema();
      expect(schema).toBeDefined();
      expect(typeof schema).toBe('string');
    });
  });
});