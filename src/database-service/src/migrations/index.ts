import { DGraphService } from '../services/dgraph.service';
import { logger } from '../schema/scripts/logger';

export interface Migration {
  id: string;
  name: string;
  up: (dgraphService: DGraphService) => Promise<void>;
  down?: (dgraphService: DGraphService) => Promise<void>;
}

export class MigrationManager {
  private dgraphService: DGraphService;

  constructor(dgraphService: DGraphService) {
    this.dgraphService = dgraphService;
  }

  async runMigrations(migrations: Migration[]): Promise<void> {
    logger.info('Starting migrations...');
    
    for (const migration of migrations) {
      try {
        logger.info(`Running migration: ${migration.name}`);
        await migration.up(this.dgraphService);
        logger.info(`✅ Migration completed: ${migration.name}`);
      } catch (error) {
        logger.error(`❌ Migration failed: ${migration.name}`, error);
        throw error;
      }
    }
    
    logger.info('All migrations completed successfully');
  }

  async rollback(migrations: Migration[], count: number = 1): Promise<void> {
    logger.info(`Rolling back ${count} migrations...`);
    
    const migrationsToRollback = migrations.slice(-count).reverse();
    
    for (const migration of migrationsToRollback) {
      if (!migration.down) {
        logger.warn(`Migration ${migration.name} has no rollback function`);
        continue;
      }
      
      try {
        logger.info(`Rolling back migration: ${migration.name}`);
        await migration.down(this.dgraphService);
        logger.info(`✅ Rollback completed: ${migration.name}`);
      } catch (error) {
        logger.error(`❌ Rollback failed: ${migration.name}`, error);
        throw error;
      }
    }
    
    logger.info('Rollback completed successfully');
  }
}
