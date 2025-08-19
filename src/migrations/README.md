# Database Migrations

This directory contains database migrations for seeding and managing data in the Dgraph database using GraphQL operations.

## Structure

```
src/migrations/
├── README.md                           # This documentation
├── index.ts                           # Migration manager and interfaces
├── run-migrations.ts                  # Script to run all migrations
├── migrations/                        # Actual migration files
│   ├── 001-seed-methodology-document.ts
│   ├── 002-*.ts                       # Future migrations
│   └── ...
├── data/                             # Migration data files
│   ├── methodology-document.json
│   ├── workflows/                    # Grouped by domain
│   │   └── ...
│   └── sections/                     # Grouped by domain
│       └── ...
├── utils/                            # Migration utilities
│   ├── generic-migration.ts
│   ├── migration-helpers.ts          # Common helper functions
│   └── validation.ts                 # Data validation utilities
├── scripts/                          # Development/debug scripts
│   ├── debug-query.ts
│   ├── test-migration.ts
│   └── migration-status.ts           # Check migration status
└── __tests__/                        # Migration tests
    ├── 001-seed-methodology-document.test.ts
    └── ...
```

## Usage

### Run Migrations

```bash
# Run all migrations
npm run migrate

# Run migrations with server startup
npm run dev -- --migrate
```

### Development Scripts

```bash
# Test a specific migration
npm run migrate:test

# Debug database queries
npm run migrate:debug
```

### Create New Migration

#### Option 1: Generic Migration (Recommended for data seeding)

1. Create a JSON data file in `src/migrations/data/` with your document data
2. Create a migration file in `src/migrations/migrations/` using the generic utility:

```typescript
import { createGenericMigration } from '../utils/generic-migration';

export const yourMigration = createGenericMigration(
  'XXX',
  'Description of migration',
  {
    dataFile: 'your-data-file.json',
    queryFilter: {
      type: 'Your_Dgraph_Type',
      field: 'unique_field',
      value: 'unique_value'
    }
  }
);
```

3. Add the migration to the migrations array in `run-migrations.ts`

#### Option 2: Custom Migration

1. Create a new file in `src/migrations/migrations/` following the naming convention: `XXX-description.ts`
2. Export a migration object with the following structure:

```typescript
import { Migration } from '../index';
import { DGraphService } from '../../services/dgraph.service';

export const yourMigration: Migration = {
  id: 'XXX',
  name: 'Description of migration',
  
  async up(dgraphService: DGraphService): Promise<void> {
    // Migration logic here
  },

  async down(dgraphService: DGraphService): Promise<void> {
    // Rollback logic here (optional)
  }
};
```

3. Add the migration to the migrations array in `run-migrations.ts`

### Testing Migrations

```bash
# Run migration tests
npm run test src/migrations/__tests__/
```

## Current Migrations

### 001 - Seed Methodology Document

Creates the base Documentation Driven Development methodology document without sections.

**Data Created:**
- Document type: `_System_Document__Documentation_Driven_Development_Methodology_`
- Name ID: `ddd-methodology-v1`
- Version: `0.1.0`
- Title: `Documentation Driven Development`

**Data Source:** `src/migrations/data/methodology-document.json`

## Migration Interface

```typescript
interface Migration {
  id: string;           // Unique identifier (e.g., '001')
  name: string;         // Human-readable description
  up: (dgraphService: DGraphService) => Promise<void>;    // Migration logic
  down?: (dgraphService: DGraphService) => Promise<void>; // Rollback logic (optional)
}
```

## Best Practices

1. **Idempotent**: Migrations should be safe to run multiple times
2. **Rollback Support**: Include rollback logic when possible
3. **Testing**: Write tests for each migration
4. **Logging**: Use the logger for important operations
5. **Error Handling**: Properly handle and report errors
6. **Data Validation**: Verify data after creation
7. **Organization**: Keep related data files grouped by domain
8. **Naming**: Use clear, descriptive names for migrations and data files
