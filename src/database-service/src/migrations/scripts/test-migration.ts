import { config } from 'dotenv';
import { DGraphService } from '../../services/dgraph.service';
import { seedMethodologyDocument } from '../migrations/001-seed-methodology-document';

// Load environment variables
config();

async function testMigration() {
  const dgraphService = new DGraphService();
  
  try {
    console.log('🚀 Testing migration...');
    
    // Initialize DGraph connection
    await dgraphService.initialize();
    console.log('✅ DGraph connection established');
    
    // Run the migration
    console.log('🔄 Running methodology document migration...');
    await seedMethodologyDocument.up(dgraphService);
    
    // Verify the document was created with all fields
    console.log('🔍 Verifying data in database...');
    const query = `
      query {
        documents: query_System_Document__Documentation_Driven_Development_Methodology_(filter: { name_id: { eq: "ddd-methodology-v1" } }) {
          id
          name_id
          title
          version
          description
          createdAt
          updatedAt
        }
      }
    `;

    const result = await dgraphService.query(query);
    
    if (result.data && result.data.documents && result.data.documents.length > 0) {
      const document = result.data.documents[0];
      console.log('✅ Document found in database:');
      console.log('   ID:', document.id);
      console.log('   Name ID:', document.name_id);
      console.log('   Title:', document.title);
      console.log('   Version:', document.version);
      console.log('   Created At:', document.createdAt);
      console.log('   Updated At:', document.updatedAt);
      
      console.log('✅ Document successfully stored in database');
    } else {
      console.log('❌ Document not found in database');
    }
    
    // Clean up - delete the document
    console.log('🧹 Cleaning up...');
    await seedMethodologyDocument.down!(dgraphService);
    console.log('✅ Cleanup completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    await dgraphService.close();
  }
}

// Run test if this script is executed directly
if (require.main === module) {
  testMigration();
}

export { testMigration };
