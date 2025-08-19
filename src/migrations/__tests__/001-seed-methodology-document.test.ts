import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DGraphService } from '../../services/dgraph.service';
import { seedMethodologyDocument } from '../001-seed-methodology-document';
import * as fs from 'fs';
import * as path from 'path';

describe('Seed Methodology Document Migration', () => {
  let dgraphService: DGraphService;
  let createdDocumentIds: string[] = [];

  beforeEach(async () => {
    dgraphService = new DGraphService();
    await dgraphService.initialize();
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
    
    // Additional cleanup: Remove any test documents that might have been created
    // This is a fallback in case the documentId tracking fails
    // Note: We can't use regexp in Dgraph GraphQL, so we'll rely on the documentId tracking
    // The primary cleanup mechanism above should handle most cases
    
    await dgraphService.close();
  });

  it('should create methodology document successfully', async () => {
    // Create test-specific data with unique ID
    const testData = {
      'dgraph.type': '_System_Document__Documentation_Driven_Development_Methodology_',
      name_id: `test-ddd-methodology-${Date.now()}`,
      document_type: 'methodology',
      title: 'Test Documentation Driven Development',
      version: '1.0.0',
      description: 'A test version of the Documentation Driven Development methodology',
      sections: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Create the document directly
    const documentId = await dgraphService.create(testData);
    expect(documentId).toBeDefined();
    
    // Track the created document for cleanup
    createdDocumentIds.push(documentId);

    // Verify the document was created
    const query = `
      query {
        documents: query_System_Document__Documentation_Driven_Development_Methodology_(filter: { name_id: { eq: "${testData.name_id}" } }) {
          id
          name_id
          title
          version
          description
        }
      }
    `;

    const result = await dgraphService.query(query);
    
    expect(result.data).toBeDefined();
    expect(result.data.documents).toBeDefined();
    expect(result.data.documents).toHaveLength(1);
    
    const document = result.data.documents[0];
    expect(document.name_id).toBe(testData.name_id);
    expect(document.title).toBe(testData.title);
    expect(document.version).toBe(testData.version);
    expect(document.description).toBe(testData.description);
  });

  it('should rollback methodology document successfully', async () => {
    // Create test-specific data with unique ID
    const testData = {
      'dgraph.type': '_System_Document__Documentation_Driven_Development_Methodology_',
      name_id: `test-rollback-${Date.now()}`,
      document_type: 'methodology',
      title: 'Test Rollback Document',
      version: '1.0.0',
      description: 'A test document for rollback testing',
      sections: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // First create the document
    const documentId = await dgraphService.create(testData);
    expect(documentId).toBeDefined();
    
    // Track the created document for cleanup
    createdDocumentIds.push(documentId);

    // Verify it was created
    let query = `
      query {
        documents: query_System_Document__Documentation_Driven_Development_Methodology_(filter: { name_id: { eq: "${testData.name_id}" } }) {
          id
          name_id
        }
      }
    `;

    let result = await dgraphService.query(query);
    expect(result.data.documents).toHaveLength(1);

    // Then delete it
    await dgraphService.delete(documentId);

    // Verify the document was deleted
    result = await dgraphService.query(query);
    
    expect(result.data).toBeDefined();
    expect(result.data.documents).toBeDefined();
    expect(result.data.documents).toHaveLength(0);
  });

  it('should load data from JSON file', async () => {
    // Verify the JSON file exists and has correct structure
    const dataPath = path.join(__dirname, '../data/methodology-document.json');
    expect(fs.existsSync(dataPath)).toBe(true);
    
    const dataContent = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(dataContent);
    
    expect(data['dgraph.type']).toBe('_System_Document__Documentation_Driven_Development_Methodology_');
    expect(data.name_id).toBe('ddd-methodology-v1');
    expect(data.title).toBe('Documentation Driven Development');
    expect(data.version).toBe('1.0.0');
  });
});
