/**
 * Family 1: Meta & Governance
 * 
 * This file contains the complete data object for the Meta & Governance family,
 * serving as the single source of truth for generating:
 * - GraphQL family interfaces and types
 * - Zod family validation schemas
 * - Rich family metadata and documentation
 * 
 * This family provides status tracking, priority drivers, and governance metadata
 * for all document types across the system.
 */

import { z } from 'zod';
import { 
  GRAPHQL_TYPES,
  DOCUMENT_TYPES,
} from '../../constants.js';

// =============================================================================
// FAMILY IDENTIFIER
// =============================================================================

export const FAMILY_1_META_GOVERNANCE = "1-meta-governance";

export const family_1_meta_governance = {
  // =============================================================================
  // BASIC METADATA
  // =============================================================================
  
  id: FAMILY_1_META_GOVERNANCE,
  name: "Meta & Governance",
  version: "2.0",
  description: "Status tracking, priority drivers, and governance metadata for all document types",
  
  // Document types that support this family
  supportedBy: DOCUMENT_TYPES,
  
  // Sections that belong to this family
  sections: ["1.1", "1.2", "1.3"], // Status, Priority Drivers, History
  
  // =============================================================================
  // FAMILY DEFINITION
  // =============================================================================
  
  // GraphQL family interface name
  interfaceName: "_Family_1_MetaGovernance_",
  
  // Family-level metadata
  businessPurpose: "Provides governance framework, status tracking, and priority management across all document types",
  
  validationRules: [
    "All families must have valid timestamps",
    "Section relationships must be properly configured",
    "Document relationships must be bidirectional"
  ],
  
  usageGuidelines: [
    "Status should be updated in real-time",
    "Priority drivers should reflect business context",
    "History should be maintained for audit purposes",
    "Family metadata should be automatically managed"
  ],
  
  examples: [
    {
      context: "Plan with governance",
      data: {
        status: "ACTIVE",
        priorityDrivers: ["STRATEGIC_ALIGNMENT", "REVENUE_IMPACT"],
        familyCreatedOn: "2024-01-01T00:00:00Z"
      }
    },
    {
      context: "Task with full tracking",
      data: {
        status: {
          currentState: "IN_PROGRESS",
          progress: 75,
          priority: "HIGH"
        },
        priorityDrivers: ["DEADLINE_CRITICAL", "CUSTOMER_IMPACT"],
        familyCreatedOn: "2024-01-15T09:00:00Z"
      }
    }
  ],
  
  aiInstructions: [
    "Monitor family status across all document types",
    "Identify patterns in priority drivers across families",
    "Maintain consistent governance practices",
    "Alert on governance violations or inconsistencies"
  ],
  
  // =============================================================================
  // FAMILY FIELDS
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
        description: "Unique identifier for the family",
        businessPurpose: "Enables unique identification and referencing",
        validationRules: ["Must be a valid string"]
      }
    },
    
    familyCreatedOn: {
      name: "familyCreatedOn",
      label: "Family Created On",
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false
      },
      zod: z.date().optional(),
      metadata: {
        description: "Timestamp when the family was created",
        businessPurpose: "Provides audit trail and creation tracking",
        validationRules: ["Must be a valid date"],
        examples: ["2024-01-01T00:00:00Z"]
      }
    },
    
    familyLastUpdatedOn: {
      name: "familyLastUpdatedOn",
      label: "Family Last Updated On",
      graphql: {
        type: GRAPHQL_TYPES.DATETIME_OPTIONAL,
        required: false
      },
      zod: z.date().optional(),
      metadata: {
        description: "Timestamp when the family was last updated",
        businessPurpose: "Enables change tracking and freshness monitoring",
        validationRules: ["Must be a valid date"],
        examples: ["2024-01-15T14:30:00Z"]
      }
    },
    
    document: {
      name: "document",
      label: "Document",
      graphql: {
        type: "_Document_",
        required: true
      },
      zod: z.string(),
      metadata: {
        description: "Reference to the parent document",
        businessPurpose: "Establishes the relationship between family and document",
        validationRules: ["Must be a valid document reference"]
      }
    },
    
    status: {
      name: "status",
      label: "Status",
      graphql: {
        type: "_Section_1_1_Status_",
        required: true
      },
      zod: z.object({}), // Will be defined by the section
      metadata: {
        description: "Status section for tracking execution state",
        businessPurpose: "Provides real-time execution visibility and status tracking",
        validationRules: ["Must be a valid status section"]
      }
    },
  },
  
  // =============================================================================
  // DOCUMENT TYPE COMPOSITION RULES
  // =============================================================================
  
  documentTypes: {
    Plan: {
      name: "Plan",
      label: "Plan",
      sections: ["1.1", "1.2"], // Status, Priority Drivers
      relationships: {
        document: {
          name: "document",
          label: "Document",
          type: "_Document_Plan_",
          inverse: "metaGovernance",
          description: "Inverse relationship to the parent document"
        }
      }
    },
    
    Task: {
      name: "Task", 
      label: "Task",
      sections: ["1.1", "1.2"], // Status, Priority Drivers
      relationships: {
        document: {
          name: "document",
          label: "Document",
          type: "_Document_Task_",
          inverse: "metaGovernance",
          description: "Inverse relationship to the parent document"
        }
      }
    },
    
    Project: {
      name: "Project",
      label: "Project", 
      sections: ["1.1", "1.2", "1.3"], // Status, Priority Drivers, History
      relationships: {
        document: {
          name: "document",
          label: "Document",
          type: "_Document_Project_",
          inverse: "metaGovernance",
          description: "Inverse relationship to the parent document"
        }
      }
    },
    
    Module: {
      name: "Module",
      label: "Module",
      sections: ["1.1", "1.2", "1.3"], // Status, Priority Drivers, History
      relationships: {
        document: {
          name: "document",
          label: "Document",
          type: "_Document_Module_",
          inverse: "metaGovernance",
          description: "Inverse relationship to the parent document"
        }
      }
    },
    
    Feature: {
      name: "Feature",
      label: "Feature",
      sections: ["1.1", "1.2", "1.3"], // Status, Priority Drivers, History
      relationships: {
        document: {
          name: "document",
          label: "Document",
          type: "_Document_Feature_",
          inverse: "metaGovernance",
          description: "Inverse relationship to the parent document"
        }
      }
    }
  }
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Family_1_MetaGovernance_Type = typeof family_1_meta_governance;
