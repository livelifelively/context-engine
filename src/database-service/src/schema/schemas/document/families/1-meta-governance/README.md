# Meta & Governance Family - Folder Structure

This directory contains the Meta & Governance family (Family 1) organized into a maintainable folder structure.

## Structure Overview

```
1-meta-governance/
├── plan/                           # Plan document type
│   ├── plan.1-meta-governance.graphql
│   ├── plan.1-meta-governance.openapi.ts
│   └── plan.1-meta-governance.schema.ts
├── task/                           # Task document type
│   ├── task.1-meta-governance.graphql
│   ├── task.1-meta-governance.openapi.ts
│   └── task.1-meta-governance.schema.ts
├── project/                        # Project document type
│   ├── project.1-meta-governance.graphql
│   ├── project.1-meta-governance.openapi.ts
│   └── project.1-meta-governance.schema.ts
├── module/                         # Module document type
│   ├── module.1-meta-governance.graphql
│   ├── module.1-meta-governance.openapi.ts
│   └── module.1-meta-governance.schema.ts
├── feature/                        # Feature document type
│   ├── feature.1-meta-governance.graphql
│   ├── feature.1-meta-governance.openapi.ts
│   └── feature.1-meta-governance.schema.ts
├── shared.1-meta-governance.graphql    # Shared GraphQL types
├── shared.1-meta-governance.openapi.ts # Shared OpenAPI metadata
├── shared.1-meta-governance.schema.ts  # Shared Zod schemas
├── index.ts                            # Backward compatibility exports
└── README.md                           # This file
```

## File Naming Convention

All files follow the pattern: `{document-type}.{family-id}-{family-name}.{extension}`

- **Document Type**: `plan`, `task`, `project`, `module`, `feature`, or `shared`
- **Family ID**: `1` (Meta & Governance is the first family)
- **Family Name**: `meta-governance`
- **Extension**: `graphql`, `openapi.ts`, or `schema.ts`

## Document Type Support

| Document Type | Status | Priority Drivers | History |
| ------------- | ------ | ---------------- | ------- |
| **Plan**      | ❌     | ✅               | ❌      |
| **Task**      | ✅     | ✅               | ❌      |
| **Project**   | ❌     | ❌               | ✅      |
| **Module**    | ❌     | ❌               | ✅      |
| **Feature**   | ❌     | ❌               | ✅      |

## Usage

### Importing Specific Document Types

```typescript
// Import Plan-specific schemas
import { getMetaGovernancePlanSchema } from './plan/plan.1-meta-governance.schema.js';

// Import Task-specific schemas
import { getMetaGovernanceTaskSchema } from './task/task.1-meta-governance.schema.js';

// Import Project-specific schemas
import { getMetaGovernanceProjectSchema } from './project/project.1-meta-governance.schema.js';
```

### Backward Compatibility

The `index.ts` file maintains backward compatibility by re-exporting all schemas and types:

```typescript
// This still works as before
import { getMetaGovernanceFamilySchema } from './1-meta-governance/index.js';

const planSchema = getMetaGovernanceFamilySchema('plan');
const taskSchema = getMetaGovernanceFamilySchema('task');
```

### Shared Components

Common types and schemas are available in the shared files:

```typescript
import { BaseStatusSchema, BasePriorityDriversSchema, BaseHistorySchema } from './shared.1-meta-governance.schema.js';
```

## Benefits of This Structure

1. **Maintainability**: Smaller, focused files instead of monolithic schemas
2. **AI-Friendly**: Clear boundaries and easier context understanding
3. **Human-Friendly**: Logical grouping by document type
4. **Scalability**: Easy to add new document types or modify existing ones
5. **Searchability**: Consistent naming makes files easy to find
6. **Consistency**: All files follow the same logical naming pattern

## Migration Notes

- All files have been renamed to follow the new consistent pattern
- All import statements have been updated throughout the codebase
- The build process has been verified to work with the new structure
- New code should use the specific document type imports for better maintainability
