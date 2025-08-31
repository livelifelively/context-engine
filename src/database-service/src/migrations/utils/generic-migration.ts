import * as fs from 'fs';
import * as path from 'path';
import { Migration } from '../index';
import { DGraphService } from '../../services/dgraph.service';

export interface DataMigrationConfig {
  dataFile: string;
  queryFilter: {
    type: string;
    field: string;
    value: string;
  };
}

export function createGenericMigration(
  id: string,
  name: string,
  config: DataMigrationConfig
): Migration {
  return {
    id,
    name,
    
    async up(dgraphService: DGraphService): Promise<void> {
      // Load data from JSON file
      const dataPath = path.join(__dirname, '../data', config.dataFile);
      const dataContent = fs.readFileSync(dataPath, 'utf8');
      const data = JSON.parse(dataContent);
      
      // Check if document already exists
      const checkQuery = `
        query {
          documents: query${config.queryFilter.type}(filter: { ${config.queryFilter.field}: { eq: "${config.queryFilter.value}" } }) {
            id
            ${config.queryFilter.field}
          }
        }
      `;

      const checkResult = await dgraphService.query(checkQuery);
      
      if (checkResult.data && checkResult.data.documents && checkResult.data.documents.length > 0) {
        console.log(`⚠️ ${name} already exists, skipping creation`);
        return;
      }
      
      // Update timestamps
      const now = new Date().toISOString();
      data.createdAt = now;
      data.updatedAt = now;
      
      // Create the document
      const documentUid = await dgraphService.create(data);
      console.log(`✅ Created ${name} with UID: ${documentUid}`);
    },

    async down(dgraphService: DGraphService): Promise<void> {
      // Query to find the document using GraphQL
      const query = `
        query {
          documents: query${config.queryFilter.type}(filter: { ${config.queryFilter.field}: { eq: "${config.queryFilter.value}" } }) {
            id
            ${config.queryFilter.field}
          }
        }
      `;

      const result = await dgraphService.query(query);
      
      if (result.data && result.data.documents && result.data.documents.length > 0) {
        const documentId = result.data.documents[0].id;
        await dgraphService.delete(documentId);
        console.log(`✅ Deleted ${name} with ID: ${documentId}`);
      } else {
        console.log(`⚠️ No ${name} found to delete`);
      }
    }
  };
}
