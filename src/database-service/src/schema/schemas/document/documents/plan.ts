/**
 * Document: Plan
 * 
 * This file contains the complete data object for Plan documents,
 * serving as the single source of truth for generating:
 * - GraphQL document types and relationships
 * - Zod document validation schemas
 * - Rich document metadata and documentation
 * 
 * Plan documents compose from families and sections to create
 * the complete document structure.
 */

import { z } from 'zod';
import { 
  GRAPHQL_TYPES
} from '../constants.js';

export const document_plan = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================
  
  id: "plan",
  name: "Plan",
  description: "Strategic planning documents that define high-level objectives and resource allocation",
  
  // =============================================================================
  // DOCUMENT DEFINITION
  // =============================================================================
  
  // GraphQL document type name
  typeName: "_Document_Plan_",
  
  // Document-level metadata
  businessPurpose: "Provides strategic planning framework and high-level resource allocation decisions",
  
  validationRules: [
    "Must have valid family compositions",
    "Must have proper section relationships",
    "Must maintain document integrity"
  ],
  
  usageGuidelines: [
    "Should be created at the beginning of projects",
    "Must be updated when strategic direction changes",
    "Should be reviewed regularly for alignment"
  ],
  
  examples: [
    {
      context: "Strategic project plan",
      data: {
        id: "plan-001",
        metaGovernance: {
          status: "ACTIVE"
        }
      }
    }
  ],
  
  aiInstructions: [
    "Monitor plan execution against strategic objectives",
    "Identify misalignments between plan and implementation",
    "Suggest plan updates based on changing business context"
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
        description: "Unique identifier for the plan document",
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

export type Document_Plan_Type = typeof document_plan;
