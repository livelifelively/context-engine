/**
 * Generator Configuration
 * 
 * This file contains configuration options for the schema generators,
 * making it easy to customize output paths and other settings.
 */

export interface GeneratorConfig {
  graphql: {
    outputPath: string;
  };
  zod: {
    outputPath: string;
  };
}

export const DEFAULT_CONFIG: GeneratorConfig = {
  graphql: {
    outputPath: 'src/database-service/src/schema/schemas/document/dist/graphql',
  },
  zod: {
    outputPath: 'src/database-service/src/schema/schemas/document/dist/zod',
  },
};

export const CUSTOM_CONFIG: GeneratorConfig = {
  graphql: {
    outputPath: 'generated/graphql',
  },
  zod: {
    outputPath: 'generated/zod',
  },
};
