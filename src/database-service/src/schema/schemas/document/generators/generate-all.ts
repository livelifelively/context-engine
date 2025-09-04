/**
 * Main Generator Script
 * 
 * This script runs both GraphQL and Zod generators to create all schema files
 * in the dist folder for review and validation.
 */

import { GraphQLGenerator } from './graphql-generator.js';
import { DocumentGenerator } from './document-generator.js';
import { ZodGenerator } from './zod-generator.js';
import { DEFAULT_CONFIG } from './config.js';

async function generateAllSchemas() {
  console.log('🚀 Starting Schema Generation Process...\n');
  
  try {
    // Generate GraphQL schemas (families)
    const graphqlGenerator = new GraphQLGenerator(DEFAULT_CONFIG.graphql.outputPath);
    await graphqlGenerator.generateAllSchemas();
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Generate Document schemas
    const documentGenerator = new DocumentGenerator(DEFAULT_CONFIG.graphql.outputPath);
    await documentGenerator.generateAllSchemas();
    
    console.log('\n' + '='.repeat(60) + '\n');
    
    // Generate Zod schemas
    const zodGenerator = new ZodGenerator(DEFAULT_CONFIG.zod.outputPath);
    await zodGenerator.generateAllSchemas();
    
    console.log('\n🎉 All schemas generated successfully!');
    console.log('📁 Check the dist/ folder for generated files:');
    console.log('   - dist/graphql/ - GraphQL schema files (families + documents)');
    console.log('   - dist/zod/ - Zod schema files');
    
  } catch (error) {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  }
}

// Run the generation
generateAllSchemas();
