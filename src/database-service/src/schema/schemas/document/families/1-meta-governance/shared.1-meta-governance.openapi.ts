// =============================================================================
// SHARED OPENAPI METADATA DEFINITIONS
// =============================================================================

// Common section metadata patterns that can be inherited
export const SECTION_CONTENT_FORMAT_AND_EXAMPLES = {
  '1.1': {
    contentFormat: 'Markdown `###` heading followed by a bulleted list.',
    examples: [
      {
        summary: 'Plan Example',
        value: ['**Created:** [YYYY-MM-DD HH:MM]', '**Last Updated:** [YYYY-MM-DD HH:MM]'],
      },
      {
        summary: 'Task Example',
        value: [
          '**Current State:** 💡 Not Started',
          '**Priority:** 🟨 Medium',
          '**Progress:** 0%',
          '**Planning Estimate:** 0',
          '**Created:** [YYYY-MM-DD HH:MM]',
          '**Implementation Started:** [YYYY-MM-DD HH:MM]',
          '**Completed:** [YYYY-MM-DD HH:MM]',
          '**Last Updated:** [YYYY-MM-DD HH:MM]',
        ],
      },
    ],
  },
  '1.2': {
    contentFormat: 'Markdown bulleted list.',
    examples: [
      {
        summary: 'Default Example',
        value: ['CBP_BREAK_BLOCK_REVENUE_LEGAL', 'TEC_PROD_STABILITY_BLOCKER'],
      },
    ],
  },
  '1.3': {
    contentFormat: 'Markdown bulleted list of task document references.',
    examples: [
      {
        summary: 'Default Example',
        value: ['task-2024-001: User authentication implementation', 'task-2024-002: Database schema design'],
      },
    ],
  },
};

// Family metadata
export const FAMILY_DOCUMENT_METADATA = {
  plan: {
    description:
      'Governs strategic priority decisions by capturing business drivers that justify resource allocation. Plans carry only priority driver pointers; live status tracking happens in dedicated companion documents to avoid polluting strategic content with operational details.',
    summary: 'Strategic priority governance and resource allocation',
    examples: [
      {
        summary: 'Strategic Plan Example',
        value: ['Priority Drivers: CBP_BREAK_BLOCK_REVENUE_LEGAL, TEC_PROD_STABILITY_BLOCKER'],
      },
    ],
  },
  task: {
    description:
      'Provides real-time execution visibility through detailed status tracking, progress metrics, and priority justification. Enables humans and CI systems to identify blockers, track velocity, and understand urgency without manual status updates. Inherits strategic drivers from parent plans while adding technical execution context.',
    summary: 'Real-time execution visibility and status tracking',
    examples: [
      {
        summary: 'Task Status Example',
        value: ['Current State: 💡 Not Started', 'Priority: 🟨 Medium', 'Progress: 0%'],
      },
    ],
  },
  project: {
    description:
      'Maintains execution continuity by tracking completed tasks and their outcomes. Enables understanding of delivery patterns, identification of recurring blockers, and preservation of institutional knowledge across project lifecycles. Connects tactical execution to strategic objectives through task history.',
    summary: 'Project-level execution continuity and knowledge preservation',
    examples: [
      {
        summary: 'Project History Example',
        value: ['task-2024-001: User authentication implementation', 'task-2024-002: Database schema design'],
      },
    ],
  },
  module: {
    description:
      'Maintains execution continuity by tracking completed tasks and their outcomes. Enables understanding of delivery patterns, identification of recurring blockers, and preservation of institutional knowledge across module lifecycles. Connects tactical execution to strategic objectives through task history.',
    summary: 'Module-level execution continuity and knowledge preservation',
    examples: [
      {
        summary: 'Module History Example',
        value: ['task-2024-005: Authentication service implementation', 'task-2024-006: User management service'],
      },
    ],
  },
  feature: {
    description:
      'Maintains execution continuity by tracking completed tasks and their outcomes. Enables understanding of delivery patterns, identification of recurring blockers, and preservation of institutional knowledge across feature lifecycles. Connects tactical execution to strategic objectives through task history.',
    summary: 'Feature-level execution continuity and knowledge preservation',
    examples: [
      {
        summary: 'Feature History Example',
        value: ['task-2024-008: User authentication UI implementation', 'task-2024-009: Login form validation'],
      },
    ],
  },
};

// status section fields metadata
export const STATUS_FIELD_METADATA = {
  currentState: {
    description: 'The operational status of the task (e.g., ✅ Done, ⏳ In Progress)',
    summary: 'Task operational status',
    examples: ['✅ Done', '⏳ In Progress', '💡 Not Started', '🔄 Under Review', '🚫 Blocked'],
  },
  priority: {
    description: "The task's priority level (e.g., 🟥 High)",
    summary: 'Task priority level',
    examples: ['🟥 High', '🟨 Medium', '🟦 Low'],
  },
  progress: {
    description: 'A percentage representing the completion of the task',
    summary: 'Task completion percentage',
    examples: [0, 25, 50, 75, 100],
  },
  planningEstimate: {
    description: 'The initial story point estimate assigned during planning. This should not change after work begins.',
    summary: 'Initial story point estimate',
    examples: [1, 2, 3, 5, 8, 13],
  },
  implementationStartedOn: {
    description: 'The timestamp when a developer began working on the task',
    summary: 'Implementation start timestamp',
    examples: ['2024-01-15 09:00', '2024-01-20 14:30'],
  },
  completedOn: {
    description: 'The timestamp when the task was marked as ✅ Done',
    summary: 'Task completion timestamp',
    examples: ['2024-01-25 16:00', '2024-01-30 11:45'],
  },
};

export const SHARED_FIELD_METADATA = {
  document: {
    description: 'Document ID in graph database reference for the task',
    summary: 'Document reference',
  },
  parent: {
    description: 'Parent family ID in graph database reference for the task',
    summary: 'Parent family reference',
  },
  taskDocuments: {
    description: 'Array of task document IDs in graph database reference that are linked to this documentation',
    summary: 'Linked task documents',
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Gets OpenAPI metadata for a family
 */
export const getFamilyDocumentMetadata = (documentType: keyof typeof FAMILY_DOCUMENT_METADATA) => {
  return FAMILY_DOCUMENT_METADATA[documentType];
};

/**
 * Gets OpenAPI metadata for a field
 */
export const getStatusFieldMetadata = (fieldName: keyof typeof STATUS_FIELD_METADATA) => {
  return STATUS_FIELD_METADATA[fieldName];
};

/**
 * Gets section content format and examples
 */
export const getSectionContentFormatAndExamples = (sectionId: keyof typeof SECTION_CONTENT_FORMAT_AND_EXAMPLES) => {
  return SECTION_CONTENT_FORMAT_AND_EXAMPLES[sectionId];
};

/**
 * Gets OpenAPI metadata for a shared field
 */
export const getSharedFieldMetadata = (fieldName: keyof typeof SHARED_FIELD_METADATA) => {
  return SHARED_FIELD_METADATA[fieldName];
};