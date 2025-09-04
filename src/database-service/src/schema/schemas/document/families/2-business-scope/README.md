# Business & Scope Family - Folder Structure

This directory contains the Business & Scope family (Family 2) organized into a maintainable folder structure.

## Structure Overview

```
2-business-scope/
├── plan/                           # Plan document type
│   ├── plan.2-business-scope.graphql
│   ├── plan.2-business-scope.meta.ts
│   └── plan.2-business-scope.schema.ts
├── task/                           # Task document type
│   ├── task.2-business-scope.graphql
│   ├── task.2-business-scope.meta.ts
│   └── task.2-business-scope.schema.ts
├── project/                        # Project document type
│   ├── project.2-business-scope.graphql
│   ├── project.2-business-scope.meta.ts
│   └── project.2-business-scope.schema.ts
├── module/                         # Module document type
│   ├── module.2-business-scope.graphql
│   ├── module.2-business-scope.meta.ts
│   └── module.2-business-scope.schema.ts
├── feature/                        # Feature document type
│   ├── feature.2-business-scope.graphql
│   ├── feature.2-business-scope.meta.ts
│   └── feature.2-business-scope.schema.ts
├── shared.2-business-scope.graphql    # Shared GraphQL types
├── shared.2-business-scope.meta.ts    # Shared metadata
├── shared.2-business-scope.schema.ts  # Shared Zod schemas
├── index.ts                            # Backward compatibility exports
└── README.md                           # This file
```

## File Naming Convention

All files follow the pattern: `{document-type}.{family-id}-{family-name}.{extension}`

- **Document Type**: `plan`, `task`, `project`, `module`, `feature`, or `shared`
- **Family ID**: `2` (Business & Scope is the second family)
- **Family Name**: `business-scope`
- **Extension**: `graphql`, `meta.ts`, or `schema.ts`

## Document Type Support

| Document Type | Overview | Business Context | Success Criteria | Definition of Done | Boundaries & Scope | Core Business Processes |
| ------------- | -------- | ---------------- | ---------------- | ------------------ | ------------------ | ----------------------- |
| **Plan**      | ✅       | ✅               | ✅               | ❌                | ✅                 | ✅                     |
| **Task**      | ✅       | ❌               | ❌               | ✅                | ❌                 | ❌                     |
| **Project**   | ✅       | ✅               | ❌               | ❌                | ❌                 | ✅                     |
| **Module**    | ✅       | ✅               | ❌               | ❌                | ❌                 | ✅                     |
| **Feature**   | ✅       | ✅               | ❌               | ❌                | ❌                 | ✅                     |

## Section Overview

### Section 2.1 - Overview
- **Purpose**: Core function, key capability, and business value
- **Supported by**: All document types
- **Fields**: `coreFunction`, `keyCapability`, `businessValue`

### Section 2.2 - Business Context
- **Purpose**: Business narrative, user personas, business rules, user stories, user journeys
- **Supported by**: Plans, Projects, Modules, Features
- **Sub-types**: UserPersona, BusinessRule, UserStory, UserJourney

### Section 2.3 - Success Criteria
- **Purpose**: Measurable success criteria
- **Supported by**: Plans only
- **Fields**: Array of success criteria with descriptions and targets

### Section 2.4 - Definition of Done
- **Purpose**: Done criteria for tasks
- **Supported by**: Tasks only
- **Fields**: Array of done criteria with categories (FUNCTIONALITY, QUALITY, DOCUMENTATION, TESTING, DEPLOYMENT)

### Section 2.5 - Boundaries & Scope
- **Purpose**: In-scope and out-of-scope items
- **Supported by**: Plans only
- **Fields**: Arrays of scope items with categories (FUNCTIONALITY, FEATURE, OUTCOME, INTEGRATION, DATA)

### Section 2.6 - Core Business Processes
- **Purpose**: Business processes with participants and steps
- **Supported by**: Plans, Projects, Modules, Features
- **Fields**: Array of business processes with participants, steps, and diagrams

## Usage

### Importing Specific Document Types

```typescript
// Import Plan-specific schemas
import { getBusinessScopePlanSchema } from './plan/plan.2-business-scope.schema.js';

// Import Task-specific schemas
import { getBusinessScopeTaskSchema } from './task/task.2-business-scope.schema.js';

// Import Project-specific schemas
import { getBusinessScopeProjectSchema } from './project/project.2-business-scope.schema.js';
```

### Backward Compatibility

The `index.ts` file will maintain backward compatibility by re-exporting all schemas and types:

```typescript
// This will work as before
import { getBusinessScopeFamilySchema } from './2-business-scope/index.js';

const planSchema = getBusinessScopeFamilySchema('plan');
const taskSchema = getBusinessScopeFamilySchema('task');
```

### Shared Components

Common types and schemas are available in the shared files:

```typescript
import { 
  BaseOverviewSchema, 
  BaseBusinessContextSchema, 
  BaseSuccessCriteriaSchema,
  BaseDefinitionOfDoneSchema,
  BaseBoundariesScopeSchema,
  BaseCoreBusinessProcessesSchema
} from './shared.2-business-scope.schema.js';
```

## Benefits of This Structure

1. **Maintainability**: Smaller, focused files instead of monolithic schemas
2. **AI-Friendly**: Clear boundaries and easier context understanding
3. **Human-Friendly**: Logical grouping by document type
4. **Scalability**: Easy to add new document types or modify existing ones
5. **Searchability**: Consistent naming makes files easy to find
6. **Consistency**: All files follow the same logical naming pattern

## Migration Notes

- All files have been organized to follow the new consistent pattern
- The original `2-business-scope.graphql` file is preserved for reference
- New code should use the specific document type imports for better maintainability
- The build process will need to be updated to work with the new structure
