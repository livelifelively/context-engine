import { config } from 'dotenv';
import { DGraphService } from './services/dgraph.service';
import { runMigrations } from './migrations/run-migrations';

// Load environment variables
config();

async function main() {
  try {
    console.log('🚀 Starting Context Engine Server...');
    
    // Initialize DGraph service
    const dgraphService = new DGraphService();
    await dgraphService.initialize();
    
    console.log('✅ DGraph connection established');
    
    // Run migrations if --migrate flag is provided
    if (process.argv.includes('--migrate')) {
      console.log('🔄 Running migrations...');
      await runMigrations();
      console.log('✅ Migrations completed');
    }
    
    console.log('📊 Server ready on port 8008');
    
    // Keep the process alive
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down gracefully...');
      await dgraphService.close();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

main();
