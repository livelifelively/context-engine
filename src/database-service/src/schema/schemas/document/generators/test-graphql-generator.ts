/**
 * Test GraphQL Generator
 * 
 * This script tests the GraphQL generator to ensure it works correctly
 * with our configuration-driven data objects.
 */

import { GraphQLGenerator } from './graphql-generator.js';

async function testGraphQLGenerator() {
  console.log('🚀 Testing GraphQL Generator...\n');
  
  const generator = new GraphQLGenerator();
  
  try {
    // Test shared interfaces generation
    console.log('📋 Generating shared interfaces...');
    const sharedInterfaces = await generator.generateSharedInterfaces();
    console.log('✅ Shared interfaces generated successfully!\n');
    console.log('--- SHARED INTERFACES ---');
    console.log(sharedInterfaces);
    console.log('\n--- END SHARED INTERFACES ---\n');
    
    // Test document schema generation for Task
    console.log('📋 Generating Task document schema...');
    const taskSchema = await generator.generateDocumentSchema('Task');
    console.log('✅ Task schema generated successfully!\n');
    console.log('--- TASK SCHEMA ---');
    console.log(taskSchema);
    console.log('\n--- END TASK SCHEMA ---\n');
    
    // Test document schema generation for Project
    console.log('📋 Generating Project document schema...');
    const projectSchema = await generator.generateDocumentSchema('Project');
    console.log('✅ Project schema generated successfully!\n');
    console.log('--- PROJECT SCHEMA ---');
    console.log(projectSchema);
    console.log('\n--- END PROJECT SCHEMA ---\n');
    
    console.log('🎉 All tests passed! GraphQL generator is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test
testGraphQLGenerator();
