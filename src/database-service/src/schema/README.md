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
├── dist/                     # Other generated output
├── schema.combined.graphql   # Combined schema for Dgraph (committed to git)
└── README.md                 # This file
```

## Usage

### Available NPM Scripts

```bash
# Build the combined schema
npm run schema:build

# Build and apply schema to Dgraph
npm run schema:apply

# Build and apply schema (dry run - no changes)
npm run schema:apply:dry-run

# Initialize database (build + apply schema)
npm run db:init

# Initialize database (dry run)
npm run db:init:dry-run

# View recent logs
npm run logs:view

# View only error logs
npm run logs:errors
```

### Building the Schema

```bash
# Build the combined schema
npm run schema:build

# This will generate src/schema/schema.combined.graphql
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
- **Comprehensive Logging**: Track all operations and errors with detailed logs
- **Enhanced Error Logging**: Actionable error details with troubleshooting tips
- **Error Tracking**: Separate error logs for easy debugging
- **Log Viewer**: Built-in tools to view and filter logs

## Integration with Dgraph

The generated schema can be applied to Dgraph using our automated script:

```bash
# Apply schema to Dgraph (default: localhost:8080)
npm run schema:apply

# Dry run - see what would be applied without applying
npm run schema:apply:dry-run

# Apply with custom host/port
node -r ts-node/register src/schema/scripts/apply-schema.ts --host 192.168.1.100 --port 8080

# Verbose output
node -r ts-node/register src/schema/scripts/apply-schema.ts --verbose
```

### Dgraph Error Handling

The system provides detailed error information when schema application fails:

- **Line Numbers**: Exact location of schema errors
- **Type Names**: Specific types causing issues
- **Error Context**: Schema content around the error
- **Troubleshooting Tips**: Actionable steps to fix the error

Example error output:
```
Dgraph Error Details:
  HTTP Status: 200 OK
  Dgraph Errors:
    1. resolving updateGQLSchema failed because input:24: Undefined type UndefinedType.
       (Locations: [{Line: 3, Column: 4}])
  Schema Context:
    (First 1000 chars)
    # COMBINED SCHEMA
    type InvalidType {
      id: ID!
      undefinedField: UndefinedType!  # ← Error here
    }
```

### Manual Application

You can also apply the schema manually:

```bash
# Using Dgraph CLI
dgraph graphql schema --graphql-file src/schema/schema.combined.graphql

# Or using HTTP API
curl -X POST localhost:8080/admin/schema \
  -H "Content-Type: application/graphql" \
  --data-binary @src/schema/schema.combined.graphql
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
3. Review the changes in `src/schema/schema.combined.graphql`
4. Commit both the individual files AND the combined schema file

## Logging System

The schema management system includes comprehensive logging to track all operations and errors.

### Log Files:
- `logs/schema-YYYY-MM-DD.log` - All log entries for the day
- `logs/schema-errors-YYYY-MM-DD.log` - Error-only logs for the day

### Log Levels:
- **ERROR**: Critical errors that prevent operations
- **WARN**: Warning messages for potential issues
- **INFO**: General information about operations
- **DEBUG**: Detailed debugging information

### Viewing Logs:
```bash
# View recent logs (last 50 entries, formatted)
npm run logs:view

# View only error logs (formatted)
npm run logs:errors

# View raw logs (unformatted JSON)
npm run logs:raw

# View raw error logs (unformatted JSON)
npm run logs:raw-errors

# View more log entries
npm run logs:view -- --lines 100

# View logs for specific level
npm run logs:view -- --level ERROR
```

### Log Format:
Each log entry includes:
- Timestamp (ISO format)
- Log level
- Script name
- Message
- Additional details (when applicable)

### Enhanced Error Logging:
Error logs include detailed information for debugging:
- **Error Details**: Name, message, stack trace, error codes
- **Context Information**: Operation details, file paths, endpoints
- **Environment Info**: Node version, platform, memory usage
- **Network Details**: Connection information for network errors
- **Dgraph Error Details**: Specific schema errors with line numbers and locations
- **Raw Data Logging**: Complete unformatted data for automated analysis

### Raw Logging Benefits:
Raw logs provide unformatted JSON data that is ideal for:
- **AI Analysis**: Complete context for AI-powered debugging and troubleshooting
- **Automated Analysis**: Parse with tools like `jq`, `grep`, or custom scripts
- **Complete Data**: Access to full schema content, HTTP headers, and response bodies
- **Machine Processing**: Easy integration with log aggregation systems
- **Debugging**: All data preserved without formatting limitations

Example raw log usage:
```bash
# Extract all Dgraph error messages
npm run logs:raw-errors | jq -r '.details.dgraphErrorDetails.responseBody.errors[].message'

# Get full schema content from failed applications
npm run logs:raw-errors | jq -r '.details.dgraphErrorDetails.fullSchemaContent'

# Extract HTTP status codes
npm run logs:raw-errors | jq -r '.details.dgraphErrorDetails.httpStatus'

# Use with AI for contextual troubleshooting
npm run logs:raw-errors | jq -c '.' | head -1
```

### Error Types Handled:
- **Network Errors**: Connection failures, timeouts, DNS issues
- **File System Errors**: Missing files, permission issues
- **Schema Errors**: GraphQL syntax, type definition issues with specific line numbers
- **Dgraph Schema Errors**: Detailed error messages with locations and context
- **HTTP Errors**: Server responses, API errors

### Simplified Approach:
The logging system focuses on providing complete, raw data rather than pre-generated troubleshooting tips. This approach:
- **Reduces Maintenance**: No need to update static troubleshooting suggestions
- **Enables AI-Powered Debugging**: AI can analyze complete context and generate contextual solutions
- **Provides Flexibility**: Raw data can be processed by any analysis tool or AI system
- **Future-Proof**: Adapts to new error types and system changes automatically
