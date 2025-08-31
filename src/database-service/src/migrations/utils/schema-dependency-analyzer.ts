import * as fs from 'fs';
import * as path from 'path';

export interface SchemaDependency {
  sourceType: string;
  targetType: string;
  relationship: 'hasInverse' | 'direct';
  fieldName: string;
}

export interface TypeInfo {
  name: string;
  fields: string[];
  dependencies: SchemaDependency[];
}

export class SchemaDependencyAnalyzer {
  private schemaContent: string = '';
  private typeMap: Map<string, TypeInfo> = new Map();

  async loadSchema(): Promise<void> {
    const schemaDir = path.join(__dirname, '../../schema/schemas');
    const schemaFiles = ['methodology.graphql', 'sections.graphql', 'workflow.graphql'];
    
    for (const file of schemaFiles) {
      const filePath = path.join(schemaDir, file);
      if (fs.existsSync(filePath)) {
        this.schemaContent += fs.readFileSync(filePath, 'utf8') + '\n';
      }
    }
  }

  analyzeDependencies(): Map<string, TypeInfo> {
    const lines = this.schemaContent.split('\n');
    let currentType = '';
    let currentFields: string[] = [];
    let currentDependencies: SchemaDependency[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Detect type definition
      if (trimmedLine.startsWith('type ') && trimmedLine.includes('{')) {
        // Save previous type if exists
        if (currentType) {
          this.typeMap.set(currentType, {
            name: currentType,
            fields: currentFields,
            dependencies: currentDependencies
          });
        }
        
        // Start new type
        currentType = trimmedLine.split(' ')[1];
        currentFields = [];
        currentDependencies = [];
        continue;
      }

      // Detect field with @hasInverse
      if (trimmedLine.includes('@hasInverse') && trimmedLine.includes('field:')) {
        const fieldMatch = trimmedLine.match(/(\w+):\s*\[?([^\s\[\]]+)\]?\s*@hasInverse\(field:\s*(\w+)\)/);
        if (fieldMatch) {
          const [, fieldName, targetType] = fieldMatch;
          currentDependencies.push({
            sourceType: currentType,
            targetType: targetType,
            relationship: 'hasInverse',
            fieldName: fieldName
          });
          currentFields.push(fieldName);
        }
      }
      // Detect simple field references
      else if (trimmedLine.includes(':') && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('type')) {
        const fieldMatch = trimmedLine.match(/(\w+):\s*\[?([^\s\[\]]+)\]?/);
        if (fieldMatch) {
          const [, fieldName, fieldType] = fieldMatch;
          // Check if fieldType is a GraphQL type (starts with _)
          if (fieldType.startsWith('_') && fieldType !== 'ID!' && fieldType !== 'String!' && fieldType !== 'Int!' && fieldType !== 'DateTime!') {
            currentDependencies.push({
              sourceType: currentType,
              targetType: fieldType,
              relationship: 'direct',
              fieldName: fieldName
            });
          }
          currentFields.push(fieldName);
        }
      }
    }

    // Save last type
    if (currentType) {
      this.typeMap.set(currentType, {
        name: currentType,
        fields: currentFields,
        dependencies: currentDependencies
      });
    }

    return this.typeMap;
  }

  getDependencyTree(): Map<string, string[]> {
    const dependencyTree = new Map<string, string[]>();
    
    for (const [typeName, typeInfo] of this.typeMap) {
      const dependencies = typeInfo.dependencies.map(dep => dep.targetType);
      dependencyTree.set(typeName, dependencies);
    }
    
    return dependencyTree;
  }

  getCreationOrder(): string[] {
    const dependencyTree = this.getDependencyTree();
    const visited = new Set<string>();
    const order: string[] = [];
    
    const visit = (typeName: string) => {
      if (visited.has(typeName)) return;
      
      const dependencies = dependencyTree.get(typeName) || [];
      for (const dep of dependencies) {
        visit(dep);
      }
      
      visited.add(typeName);
      order.push(typeName);
    };
    
    for (const typeName of dependencyTree.keys()) {
      visit(typeName);
    }
    
    return order;
  }

  printAnalysis(): void {
    console.log('🔍 Schema Dependency Analysis:');
    console.log('================================');
    
    for (const [typeName, typeInfo] of this.typeMap) {
      console.log(`\n📄 Type: ${typeName}`);
      console.log(`   Fields: ${typeInfo.fields.join(', ')}`);
      
      if (typeInfo.dependencies.length > 0) {
        console.log(`   Dependencies:`);
        for (const dep of typeInfo.dependencies) {
          console.log(`     - ${dep.targetType} (${dep.relationship})`);
        }
      } else {
        console.log(`   Dependencies: None`);
      }
    }
    
    console.log('\n📋 Recommended Creation Order:');
    console.log('================================');
    const creationOrder = this.getCreationOrder();
    creationOrder.forEach((type, index) => {
      console.log(`${index + 1}. ${type}`);
    });
  }
}
