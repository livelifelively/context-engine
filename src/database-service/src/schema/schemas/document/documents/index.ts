/**
 * Document Types Export
 * 
 * This file exports all document type definitions for easy importing
 * and generation purposes.
 */

import { document_plan, type Document_Plan_Type } from './plan.js';
import { document_task, type Document_Task_Type } from './task.js';
import { document_project, type Document_Project_Type } from './project.js';
import { document_module, type Document_Module_Type } from './module.js';
import { document_feature, type Document_Feature_Type } from './feature.js';

export { document_plan, type Document_Plan_Type };
export { document_task, type Document_Task_Type };
export { document_project, type Document_Project_Type };
export { document_module, type Document_Module_Type };
export { document_feature, type Document_Feature_Type };

// Document composition configuration
export { DOCUMENT_COMPOSITION, type DocumentType, type DocumentComposition, type FamilyComposition } from '../composition.js';

// All document types
export const ALL_DOCUMENTS = {
  plan: document_plan,
  task: document_task,
  project: document_project,
  module: document_module,
  feature: document_feature
} as const;
