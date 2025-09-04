/**
 * Document: Module
 * 
 * This file contains the complete data object for Module documents,
 * serving as the single source of truth for generating:
 * - GraphQL document types and relationships
 * - Zod document validation schemas
 * - Rich document metadata and documentation
 * 
 * Module documents compose from families and sections to create
 * the complete document structure.
 */

import { z } from 'zod';
import { 
  GRAPHQL_TYPES
} from '../constants.js';

export const document_module = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================
  
  id: "module",
  name: "Module",
  description: "Module documents that define module scope, implementation, and outcomes",
  
  // =============================================================================
  // DOCUMENT DEFINITION
  // =============================================================================
  
  // GraphQL document type name
  typeName: "_Document_Module_",
  
  // Document-level metadata
  businessPurpose: "Provides module implementation framework and outcome tracking",
  
  validationRules: [
    "Must have valid family compositions",
    "Must have proper section relationships",
    "Must maintain document integrity"
  ],
  
  usageGuidelines: [
    "Should be created for module development",
    "Must be updated throughout module lifecycle",
    "Should maintain history of completed work"
  ],
  
  examples: [
    {
      context: "Software module development",
      data: {
        id: "module-001",
        metaGovernance: {
          status: "ACTIVE"
        }
      }
    }
  ],
  
  aiInstructions: [
    "Monitor module development progress",
    "Track module completion patterns and outcomes",
    "Identify module risks and suggest mitigation strategies"
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
        description: "Unique identifier for the module document",
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

export type Document_Module_Type = typeof document_module;
