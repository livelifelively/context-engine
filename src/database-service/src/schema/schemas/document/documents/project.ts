/**
 * Document: Project
 * 
 * This file contains the complete data object for Project documents,
 * serving as the single source of truth for generating:
 * - GraphQL document types and relationships
 * - Zod document validation schemas
 * - Rich document metadata and documentation
 * 
 * Project documents compose from families and sections to create
 * the complete document structure.
 */

import { z } from 'zod';
import { 
  GRAPHQL_TYPES
} from '../constants.js';

export const document_project = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================
  
  id: "project",
  name: "Project",
  description: "Project documents that define project scope, execution, and outcomes",
  
  // =============================================================================
  // DOCUMENT DEFINITION
  // =============================================================================
  
  // GraphQL document type name
  typeName: "_Document_Project_",
  
  // Document-level metadata
  businessPurpose: "Provides project execution framework and outcome tracking",
  
  validationRules: [
    "Must have valid family compositions",
    "Must have proper section relationships",
    "Must maintain document integrity"
  ],
  
  usageGuidelines: [
    "Should be created for project initiation",
    "Must be updated throughout project lifecycle",
    "Should maintain history of completed work"
  ],
  
  examples: [
    {
      context: "Software development project",
      data: {
        id: "project-001",
        metaGovernance: {
          status: "ACTIVE"
        }
      }
    }
  ],
  
  aiInstructions: [
    "Monitor project progress against objectives",
    "Track project completion patterns and outcomes",
    "Identify project risks and suggest mitigation strategies"
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
        description: "Unique identifier for the project document",
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

export type Document_Project_Type = typeof document_project;
