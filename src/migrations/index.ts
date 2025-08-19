import { DGraphService } from '../services/dgraph.service';
import { logger } from '../schema/scripts/logger';

export interface Migration {
  id: string;
  name: string;
  dependencies?: string[];  // Array of migration IDs this migration depends on
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
    
    // Validate dependencies
    this.validateDependencies(migrations);
    
    // Sort migrations by dependencies (topological sort)
    const sortedMigrations = this.sortMigrationsByDependencies(migrations);
    
    logger.info(`Running ${sortedMigrations.length} migrations in dependency order...`);
    
    for (const migration of sortedMigrations) {
      try {
        logger.info(`Running migration: ${migration.name} (${migration.id})`);
        await migration.up(this.dgraphService);
        logger.info(`✅ Migration completed: ${migration.name}`);
      } catch (error) {
        logger.error(`❌ Migration failed: ${migration.name}`, error);
        throw error;
      }
    }
    
    logger.info('All migrations completed successfully');
  }

  private validateDependencies(migrations: Migration[]): void {
    const migrationIds = new Set(migrations.map(m => m.id));
    
    for (const migration of migrations) {
      if (migration.dependencies) {
        for (const depId of migration.dependencies) {
          if (!migrationIds.has(depId)) {
            throw new Error(`Migration ${migration.id} depends on ${depId}, but that migration is not defined`);
          }
        }
      }
    }
  }

  private sortMigrationsByDependencies(migrations: Migration[]): Migration[] {
    const migrationMap = new Map(migrations.map(m => [m.id, m]));
    const visited = new Set<string>();
    const sorted: Migration[] = [];
    
    const visit = (migrationId: string) => {
      if (visited.has(migrationId)) return;
      
      const migration = migrationMap.get(migrationId);
      if (!migration) return;
      
      // Visit dependencies first
      if (migration.dependencies) {
        for (const depId of migration.dependencies) {
          visit(depId);
        }
      }
      
      visited.add(migrationId);
      sorted.push(migration);
    };
    
    // Visit all migrations
    for (const migration of migrations) {
      visit(migration.id);
    }
    
    return sorted;
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

  // Helper method to check if a migration has been run
  async checkMigrationStatus(migrationId: string): Promise<boolean> {
    // This could check a migrations table in the database
    // For now, we'll assume all migrations need to run
    return false;
  }
}
