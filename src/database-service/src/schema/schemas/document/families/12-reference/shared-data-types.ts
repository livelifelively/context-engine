import { z } from 'zod';

// =============================================================================
// SHARED DATA TYPES FOR FAMILY 12: REFERENCE
// =============================================================================

// Glossary item schema
export const GlossaryItemSchema = z.object({
  term: z
    .string()
    .min(1)
    .refine((val) => val.trim().length > 0, {
      message: 'Term cannot be empty or whitespace-only',
    }),
  definition: z
    .string()
    .min(1)
    .refine((val) => val.trim().length > 0, {
      message: 'Definition cannot be empty or whitespace-only',
    }),
});

// Appendix item schema
export const AppendixItemSchema = z.object({
  title: z
    .string()
    .min(1)
    .refine((val) => val.trim().length > 0, {
      message: 'Title cannot be empty or whitespace-only',
    }),
  content: z
    .string()
    .min(1)
    .refine((val) => val.trim().length > 0, {
      message: 'Content cannot be empty or whitespace-only',
    }),
});

// Type exports for TypeScript
export type GlossaryItem = z.infer<typeof GlossaryItemSchema>;
export type AppendixItem = z.infer<typeof AppendixItemSchema>;

// GraphQL type names
export const GRAPHQL_GLOSSARY_ITEM_TYPE = '_SectionData_GlossaryItem_';
export const GRAPHQL_APPENDIX_ITEM_TYPE = '_SectionData_AppendixItem_';
