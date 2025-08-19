import { config } from 'dotenv';
import { DGraphService } from '../../services/dgraph.service';

// Load environment variables
config();

async function debugQuery() {
  const dgraphService = new DGraphService();
  
  try {
    console.log('🚀 Debugging database query...');
    
    // Initialize DGraph connection
    await dgraphService.initialize();
    console.log('✅ DGraph connection established');
    
    // Try different queries to see what's in the database
    
    console.log('\n🔍 Query 1: All methodology documents');
    const query1 = `
      query {
        all: query_System_Document__Documentation_Driven_Development_Methodology_ {
          id
        }
      }
    `;
    
    const result1 = await dgraphService.query(query1);
    console.log('Result 1:', JSON.stringify(result1, null, 2));
    
    console.log('\n🔍 Query 2: All methodology documents');
    const query2 = `
      query {
        docs: query_System_Document__Documentation_Driven_Development_Methodology_ {
          id
          name_id
          title
        }
      }
    `;
    
    const result2 = await dgraphService.query(query2);
    console.log('Result 2:', JSON.stringify(result2, null, 2));
    
    console.log('\n🔍 Query 3: Specific methodology document');
    const query3 = `
      query {
        docs: query_System_Document__Documentation_Driven_Development_Methodology_(filter: { name_id: { eq: "ddd-methodology-v1" } }) {
          id
          name_id
          title
        }
      }
    `;
    
    const result3 = await dgraphService.query(query3);
    console.log('Result 3:', JSON.stringify(result3, null, 2));
    
    console.log('\n🔍 Query 4: All methodology documents (alternative)');
    const query4 = `
      query {
        docs: query_System_Document__Documentation_Driven_Development_Methodology_ {
          id
          name_id
          title
        }
      }
    `;
    
    const result4 = await dgraphService.query(query4);
    console.log('Result 4:', JSON.stringify(result4, null, 2));

    console.log('\n🔍 Query 5: Detailed methodology document with all fields');
    const query5 = `
      query {
        docs: query_System_Document__Documentation_Driven_Development_Methodology_(filter: { name_id: { eq: "ddd-methodology-v1" } }) {
          id
          name_id
          document_type
          title
          version
          description
          createdAt
          updatedAt
          sections {
            id
          }
        }
      }
    `;
    
    const result5 = await dgraphService.query(query5);
    console.log('Result 5 (Detailed):', JSON.stringify(result5, null, 2));
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  } finally {
    await dgraphService.close();
  }
}

// Run debug if this script is executed directly
if (require.main === module) {
  debugQuery();
}

export { debugQuery };
