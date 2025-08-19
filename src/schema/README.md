# Schema Modularization System

This system allows you to organize GraphQL schema files into modular components and combine them into a single schema file for Dgraph.

## Structure

```
src/schema/
├── schemas/                    # Individual schema files
│   ├── sections.graphql       # Section and content types
│   ├── methodology.graphql    # DDD methodology types
│   └── workflow.graphql       # Workflow and phase types
├── scripts/                   # Build system
│   ├── index.ts              # Main build script
│   ├── schema-order.ts       # Schema ordering configuration
│   ├── types.ts              # TypeScript type definitions
│   └── schema-organization.md # Organization documentation
├── dist/                     # Generated output
│   └── schema.combined.graphql # Combined schema for Dgraph
└── README.md                 # This file
```

## Usage

### Building the Schema

```bash
# Build the combined schema
npm run schema:build

# This will generate src/schema/dist/schema.combined.graphql
```

### Adding New Schema Files

1. Create a new `.graphql` file in `src/schema/schemas/`
2. Add the filename to `src/schema/scripts/schema-order.ts` in the desired order
3. Run `npm run schema:build` to regenerate the combined schema

### Schema Order Configuration

The order of schema files is controlled by `src/schema/scripts/schema-order.ts`:

```typescript
export const schemaOrder: SchemaOrderConfig = [
  "sections.graphql",      // First
  "methodology.graphql",   // Second
  "workflow.graphql"       // Third
];
```

## Features

- **Modular Organization**: Split large schemas into domain-specific files
- **Configurable Ordering**: Control the order in which schema files are combined
- **Type Safety**: Full TypeScript support for configuration
- **Clear Output**: Generated schema includes clear section markers
- **Reusable**: Easy to adapt for different projects

## Integration with Dgraph

The generated `schema.combined.graphql` file can be applied to Dgraph using:

```bash
# Using Dgraph CLI
dgraph graphql schema --graphql-file src/schema/dist/schema.combined.graphql

# Or using HTTP API
curl -X POST localhost:8080/admin/schema \
  -H "Content-Type: application/graphql" \
  --data-binary @src/schema/dist/schema.combined.graphql
```

## Git Workflow

The `schema.combined.graphql` file should be committed to the repository because:

1. **Database Source of Truth**: It's the actual schema used by Dgraph
2. **Deployment Ready**: Contains the complete, validated schema for production
3. **Version Control**: Tracks schema changes through git history
4. **Team Collaboration**: All developers use the same schema version

### Workflow:
1. Modify individual schema files in `src/schema/schemas/`
2. Run `npm run schema:build` to regenerate the combined schema
3. Review the changes in `src/schema/dist/schema.combined.graphql`
4. Commit both the individual files AND the combined schema file
