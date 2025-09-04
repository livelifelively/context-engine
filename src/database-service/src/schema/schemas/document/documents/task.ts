/**
 * Document: Task
 * 
 * This file contains the complete data object for Task documents,
 * serving as the single source of truth for generating:
 * - GraphQL document types and relationships
 * - Zod document validation schemas
 * - Rich document metadata and documentation
 * 
 * Task documents compose from families and sections to create
 * the complete document structure.
 */

import { z } from 'zod';
import { 
  GRAPHQL_TYPES
} from '../constants.js';

export const document_task = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================
  
  id: "task",
  name: "Task",
  description: "Task documents that define specific work items and execution details",
  
  // =============================================================================
  // DOCUMENT DEFINITION
  // =============================================================================
  
  // GraphQL document type name
  typeName: "_Document_Task_",
  
  // Document-level metadata
  businessPurpose: "Provides detailed task execution framework and work item tracking",
  
  validationRules: [
    "Must have valid family compositions",
    "Must have proper section relationships",
    "Must maintain document integrity"
  ],
  
  usageGuidelines: [
    "Should be created for specific work items",
    "Must be updated as work progresses",
    "Should be linked to parent plans or projects"
  ],
  
  examples: [
    {
      context: "Development task",
      data: {
        id: "task-001",
        metaGovernance: {
          status: {
            currentState: "IN_PROGRESS",
            progress: 75,
            priority: "HIGH"
          }
        }
      }
    }
  ],
  
  aiInstructions: [
    "Monitor task progress and identify blockers",
    "Suggest task prioritization based on business context",
    "Track task completion patterns for velocity analysis"
  ],
  
  // =============================================================================
  // DOCUMENT FIELDS
  // =============================================================================
  
  fields: {
    id: {
      name: "id",
      label: "ID",
      graphql: {
        type: GRAPHQL_TYPES.ID,
        required: true
      },
      zod: z.string(),
      metadata: {
        description: "Unique identifier for the task document",
        businessPurpose: "Enables unique identification and referencing",
        validationRules: ["Must be a valid string"]
      }
    },
    
    documentCreatedOn: {
      name: "documentCreatedOn",
      label: "Document Created On",
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false
      },
      zod: z.date().optional(),
      metadata: {
        description: "Timestamp when the document was created",
        businessPurpose: "Provides audit trail and creation tracking",
        validationRules: ["Must be a valid date"],
        examples: ["2024-01-01T00:00:00Z"]
      }
    },
    
    documentLastUpdatedOn: {
      name: "documentLastUpdatedOn",
      label: "Document Last Updated On",
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false
      },
      zod: z.date().optional(),
      metadata: {
        description: "Timestamp when the document was last updated",
        businessPurpose: "Enables change tracking and freshness monitoring",
        validationRules: ["Must be a valid date"],
        examples: ["2024-01-15T14:30:00Z"]
      }
    }
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Document_Task_Type = typeof document_task;
