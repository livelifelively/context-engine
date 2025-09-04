/**
 * Test Zod Generator
 * 
 * This script tests the Zod generator to ensure it works correctly
 * with our configuration-driven data objects.
 */

import { ZodGenerator } from './zod-generator.js';

async function testZodGenerator() {
  console.log('🚀 Testing Zod Generator...\n');
  
  const generator = new ZodGenerator();
  
  try {
    // Test shared schemas generation
    console.log('📋 Generating shared schemas...');
    const sharedSchemas = await generator.generateSharedSchemasFile();
    console.log('✅ Shared schemas generated successfully!\n');
    console.log('--- SHARED SCHEMAS ---');
    console.log(sharedSchemas);
    console.log('\n--- END SHARED SCHEMAS ---\n');
    
    // Test document schema generation for Task
    console.log('📋 Generating Task document schema...');
    const taskSchema = await generator.generateDocumentSchemaFile('Task');
    console.log('✅ Task schema generated successfully!\n');
    console.log('--- TASK SCHEMA ---');
    console.log(taskSchema);
    console.log('\n--- END TASK SCHEMA ---\n');
    
    // Test document schema generation for Project
    console.log('📋 Generating Project document schema...');
    const projectSchema = await generator.generateDocumentSchemaFile('Project');
    console.log('✅ Project schema generated successfully!\n');
    console.log('--- PROJECT SCHEMA ---');
    console.log(projectSchema);
    console.log('\n--- END PROJECT SCHEMA ---\n');
    
    console.log('🎉 All tests passed! Zod generator is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testZodGenerator();
