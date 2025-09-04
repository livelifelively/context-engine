/**
 * Document GraphQL Generator
 * 
 * This generator creates a single document GraphQL schema file with:
 * - Document interfaces (base interfaces for all document types)
 * - Document types (actual implementations for each document type)
 * 
 * Follows the same patterns as the GraphQL generator for consistency.
 */

import { DOCUMENT_COMPOSITION } from '../composition.js';

export class DocumentGenerator {
  private outputPath: string;

  constructor(outputPath: string = 'src/database-service/src/schema/schemas/document/dist/graphql') {
    this.outputPath = outputPath;
  }

  async generateAllSchemas(): Promise<void> {
    console.log('🚀 Generating document schemas...\n');

    // Generate single document schema file
    await this.generateDocumentSchema();

    console.log('\n🎉 Document schemas generated successfully!');
  }

  private async generateDocumentSchema(): Promise<void> {
    const lines: string[] = [];
    
    // Header
    lines.push('# Document Types - Complete GraphQL Schema');
    lines.push('# Generated from configuration-driven data objects');
    lines.push(`# Generated on: ${new Date().toISOString()}`);
    lines.push('');

    // =============================================================================
    // DOCUMENT INTERFACES (Base interfaces)
    // =============================================================================
    lines.push('# =============================================================================');
    lines.push('# DOCUMENT INTERFACES (Base interfaces)');
    lines.push('# =============================================================================');
    lines.push('');

    // Generate document interfaces for each document type
    for (const [documentType, compositions] of Object.entries(DOCUMENT_COMPOSITION)) {
      lines.push(`# Base interface for ${documentType} documents`);
      lines.push(`interface _Document_${documentType}_ {`);
      lines.push(`  # Unique identifier for the ${documentType.toLowerCase()} document`);
      lines.push(`  id: ID!`);
      lines.push(`  # Timestamp when the ${documentType.toLowerCase()} document was created`);
      lines.push(`  documentCreatedOn: DateTime`);
      lines.push(`  # Timestamp when the ${documentType.toLowerCase()} document was last updated`);
      lines.push(`  documentLastUpdatedOn: DateTime`);
      lines.push(`  # Title of the ${documentType.toLowerCase()}`);
      lines.push(`  title: String!`);
      lines.push(`  # Description of the ${documentType.toLowerCase()}`);
      lines.push(`  description: String`);
      lines.push('');

      // Add family relationships
      for (const composition of compositions) {
        lines.push(`  # ${composition.name} family for this ${documentType.toLowerCase()}`);
        lines.push(`  ${composition.name}: ${composition.family.interfaceName}${documentType}_! @hasInverse(field: document)`);
      }

      lines.push(`}`);
      lines.push('');
    }

    // =============================================================================
    // DOCUMENT TYPES (Implementations)
    // =============================================================================
    lines.push('# =============================================================================');
    lines.push('# DOCUMENT TYPES (Implementations)');
    lines.push('# =============================================================================');
    lines.push('');

    // Generate document type implementations for each document type
    for (const [documentType, compositions] of Object.entries(DOCUMENT_COMPOSITION)) {
      lines.push(`# ${documentType} Document Type Implementation`);
      lines.push(`type _Document_${documentType}_ implements _Document_${documentType}_ {`);
      lines.push(`  # Unique identifier for the ${documentType.toLowerCase()} document`);
      lines.push(`  id: ID!`);
      lines.push(`  # Timestamp when the ${documentType.toLowerCase()} document was created`);
      lines.push(`  documentCreatedOn: DateTime`);
      lines.push(`  # Timestamp when the ${documentType.toLowerCase()} document was last updated`);
      lines.push(`  documentLastUpdatedOn: DateTime`);
      lines.push(`  # Title of the ${documentType.toLowerCase()}`);
      lines.push(`  title: String!`);
      lines.push(`  # Description of the ${documentType.toLowerCase()}`);
      lines.push(`  description: String`);
      lines.push('');

      // Add family relationships
      for (const composition of compositions) {
        lines.push(`  # ${composition.name} family for this ${documentType.toLowerCase()}`);
        lines.push(`  ${composition.name}: ${composition.family.interfaceName}${documentType}_! @hasInverse(field: document)`);
      }

      lines.push(`}`);
      lines.push('');
    }

    await this.writeToFile('documents.graphql', lines.join('\n'));
    console.log('✅ Generated document schema: documents.graphql');
  }


  private async writeToFile(fileName: string, content: string): Promise<void> {
    const { mkdirSync, writeFileSync } = await import('fs');
    const { join } = await import('path');
    
    // Ensure output directory exists
    mkdirSync(this.outputPath, { recursive: true });
    
    const filePath = join(process.cwd(), this.outputPath, fileName);
    writeFileSync(filePath, content, 'utf8');
  }
}
