import { z } from 'zod';
import { GRAPHQL_TYPES, GRAPHQL_ENUMS } from '../../../constants.js';

// Section 8.3: Files Change Log
export const SECTION_8_3_FILES_CHANGE_LOG = '8.3' as const;

export const section_8_3_files_change_log = {
  id: SECTION_8_3_FILES_CHANGE_LOG,
  name: 'Files Change Log',
  description:
    'File modifications tracking during implementation. Documents all file changes, additions, deletions, and modifications made during the implementation process.',
  interfaceName: '_Section_8_3_FilesChangeLog_',
  businessPurpose:
    'Track and document all file modifications during implementation to maintain a clear record of changes and facilitate code review and maintenance.',
  questionsItAnswers: [
    'What files were modified during implementation?',
    'What changes were made to each file?',
    'What new files were created?',
    'What files were deleted or removed?',
  ],
  validationRules: [
    'Must document all file modifications during implementation',
    'Should include file paths, change types, and descriptions',
    'Required for Tasks only (not applicable for Plans)',
    'Must provide clear tracking of implementation changes',
  ],
  usageGuidelines: [
    'Use this section to track all file modifications during implementation',
    'Include file paths, change types, and brief descriptions',
    'Document both new files and modifications to existing files',
    'Update the log as implementation progresses',
    'Use clear, consistent formatting for easy review',
  ],
  examples: [
    {
      context: 'New Feature Implementation',
      description: 'File change log for implementing a logging feature',
      content: {
        filesChangeLog:
          'Created: src/logger/types.ts - Core logging interfaces\nCreated: src/logger/transports/ConsoleTransport.ts - Console logging transport\nCreated: src/logger/transports/HttpTransport.ts - HTTP logging transport\nModified: src/logger/index.ts - Added transport exports\nModified: package.json - Added logging dependencies',
      },
    },
    {
      context: 'System Refactoring',
      description: 'File change log for refactoring an existing system',
      content: {
        filesChangeLog:
          'Modified: src/database/connection.ts - Extracted database connection logic\nCreated: src/database/repositories/UserRepository.ts - User data access layer\nCreated: src/database/repositories/ProductRepository.ts - Product data access layer\nDeleted: src/legacy/database.ts - Removed legacy database code\nModified: src/services/UserService.ts - Updated to use new repository pattern',
      },
    },
  ],
  aiInstructions: [
    'Focus on documenting all file modifications during implementation',
    'Include file paths, change types, and brief descriptions',
    'Provide clear tracking of implementation changes',
    'Use consistent formatting for easy review and maintenance',
    'Document both new files and modifications to existing files',
  ],
  fields: {
    id: {
      name: 'id',
      label: 'ID',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Unique identifier for the files change log section',
        applicability: {
          plan: 'omitted',
          task: 'required',
        },
      },
    },
    sectionCreatedOn: {
      name: 'sectionCreatedOn',
      label: 'Section Created On',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().datetime(),
      metadata: {
        description: 'Timestamp when the files change log section was created',
        applicability: {
          plan: 'omitted',
          task: 'required',
        },
      },
    },
    sectionLastUpdatedOn: {
      name: 'sectionLastUpdatedOn',
      label: 'Section Last Updated On',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().datetime(),
      metadata: {
        description: 'Timestamp when the files change log section was last updated',
        applicability: {
          plan: 'omitted',
          task: 'required',
        },
      },
    },
    filesChangeLog: {
      name: 'filesChangeLog',
      label: 'Files Change Log',
      graphql: {
        type: GRAPHQL_TYPES.STRING,
        required: true,
      },
      zod: z.string().min(1),
      metadata: {
        description: 'Detailed log of all file modifications during implementation',
        applicability: {
          plan: 'omitted',
          task: 'required',
        },
      },
    },
    family: {
      name: 'family',
      label: 'Family',
      graphql: {
        type: '_Family_8_ImplementationGuidance_',
        required: true,
      },
      zod: z.object({}).passthrough(),
      metadata: {
        description: 'Reference to the parent implementation guidance family',
        applicability: {
          plan: 'omitted',
          task: 'required',
        },
      },
    },
  },
} as const;
