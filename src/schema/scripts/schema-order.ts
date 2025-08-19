// Schema ordering configuration for GraphQL files
// This defines the order in which schema files will be combined

import { type SchemaOrderConfig } from './types';

// Define the schema order
export const schemaOrder: SchemaOrderConfig = [
  "sections.graphql",
  "methodology.graphql", 
  "workflow.graphql"
]; 