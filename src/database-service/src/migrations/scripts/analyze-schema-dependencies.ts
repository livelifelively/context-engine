import { SchemaDependencyAnalyzer } from '../utils/schema-dependency-analyzer';

async function analyzeSchemaDependencies() {
  const analyzer = new SchemaDependencyAnalyzer();
  
  try {
    console.log('🔍 Loading GraphQL schema files...');
    await analyzer.loadSchema();
    
    console.log('📊 Analyzing dependencies...');
    analyzer.analyzeDependencies();
    
    console.log('\n' + '='.repeat(50));
    analyzer.printAnalysis();
    console.log('='.repeat(50));
    
    console.log('\n✅ Schema dependency analysis completed!');
    console.log('\n💡 This analysis shows:');
    console.log('   - Which types depend on other types');
    console.log('   - The recommended order for creating data');
    console.log('   - How relationships are structured in the schema');
    
  } catch (error) {
    console.error('❌ Schema analysis failed:', error);
    process.exit(1);
  }
}

// Run analysis if this script is executed directly
if (require.main === module) {
  analyzeSchemaDependencies();
}

export { analyzeSchemaDependencies };

