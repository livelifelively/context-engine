import { config } from 'dotenv';
import { DGraphService } from '../services/dgraph.service';
import { MigrationManager } from './index';
import { seedMethodologyDocument } from './migrations/001-seed-methodology-document';

// Load environment variables
config();

async function runMigrations() {
  const dgraphService = new DGraphService();
  
  try {
    // Initialize DGraph connection
    await dgraphService.initialize();
    console.log('✅ DGraph connection established');
    
    // Create migration manager
    const migrationManager = new MigrationManager(dgraphService);
    
    // Define all migrations in order
    const migrations = [
      seedMethodologyDocument,
      // Add more migrations here as needed
    ];
    
    // Run migrations
    await migrationManager.runMigrations(migrations);
    
    console.log('🎉 All migrations completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await dgraphService.close();
  }
}

// Run migrations if this script is executed directly
if (require.main === module) {
  runMigrations();
}

export { runMigrations };
