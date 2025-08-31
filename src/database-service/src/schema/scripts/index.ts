import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { type DirectoryConfig, type SchemaOrderConfig } from './types';
import { logger } from './logger';

// Configuration - these can be easily changed for different projects
const SCHEMA_DIR = path.join(__dirname, '../schemas');
const OUTPUT_SCHEMA_PATH = path.join(__dirname, '../schema.combined.graphql');

// Define types for better type safety
interface GraphQLFile {
  path: string;
  relativePath: string;
  prefix: number;
}

interface ConfigMatch {
  found: boolean;
  indices?: number[];
}

// Function to extract numeric prefix from filename
function getNumericPrefix(filename: string): number | null {
  const match = filename.match(/^(\d+)\./);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

// Recursively get all .graphql files from a directory
function getAllGraphQLFiles(dir: string, fileList: GraphQLFile[] = [], baseDir: string = dir): GraphQLFile[] {
  // Ensure directory exists
  if (!fs.existsSync(dir)) {
    console.error(chalk.red(`Error: Directory not found: ${chalk.bold(dir)}`));
    return fileList;
  }
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      getAllGraphQLFiles(filePath, fileList, baseDir);
    } else if (file.endsWith('.graphql')) {
      // Get the relative path from the base directory for cleaner output
      const relativePath = path.relative(baseDir, filePath);
      fileList.push({ 
        path: filePath, 
        relativePath: relativePath.replace(/\\/g, '/'), // Normalize path for consistent output on all platforms
        prefix: getNumericPrefix(file) || 0
      });
    }
  });
  
  return fileList;
}

// Load schema order configuration from schema-order.ts
function loadSchemaOrder(): SchemaOrderConfig | null {
  try {
    // Dynamic import to avoid circular dependencies
    const schemaOrderModule = require('./schema-order');
    if (schemaOrderModule && schemaOrderModule.schemaOrder) {
      console.log(chalk.blue('Using TypeScript schema order configuration'));
      return schemaOrderModule.schemaOrder;
    }
  } catch (error) {
    console.log(chalk.yellow('No schema-order.ts found, using default file ordering'));
  }
  return null;
}

// Get file path without numeric prefix
function removeNumericPrefix(filePath: string): string {
  return filePath.replace(/\/\d+\./g, '/').replace(/^\d+\./, '');
}

// Check if a file is included in the schema order configuration
function isFileInConfig(relativePath: string, orderConfig: SchemaOrderConfig): boolean {
  if (!orderConfig || !Array.isArray(orderConfig)) return false;
  
  // Remove numeric prefixes for matching
  const cleanPath = removeNumericPrefix(relativePath);
  
  // Build an array of all file paths defined in the config
  const configPaths: string[] = [];
  
  function collectPaths(items: SchemaOrderConfig, currentPath: string = ''): void {
    items.forEach((item: string | DirectoryConfig) => {
      if (typeof item === 'string') {
        // This is a file
        configPaths.push(currentPath ? `${currentPath}/${item}` : item);
      } else if (typeof item === 'object' && 'name' in item && 'files' in item) {
        // This is a directory
        const newPath = currentPath ? `${currentPath}/${item.name}` : item.name;
        collectPaths(item.files, newPath);
      }
    });
  }
  
  collectPaths(orderConfig);
  
  // Check if this file is in our config paths
  return configPaths.some(configPath => {
    // Match exact file paths
    if (configPath === cleanPath) {
      return true;
    }
    
    // Also match with numeric prefixes removed from both sides
    const pathParts = cleanPath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    
    return configPath === fileName && pathParts.length === 1;
  });
}

// Match a file against the schema order configuration to get its order
function matchFileToConfig(relativePath: string, orderConfig: SchemaOrderConfig): ConfigMatch {
  if (!orderConfig || !Array.isArray(orderConfig)) return { found: false };
  
  // Remove numeric prefixes for matching
  const cleanPath = removeNumericPrefix(relativePath);
  
  // Build mapping of paths to their indices in the config
  const pathIndices = new Map<string, number[]>();
  
  function mapIndices(items: SchemaOrderConfig, currentPath: string = '', indices: number[] = []): void {
    items.forEach((item: string | DirectoryConfig, index: number) => {
      const newIndices = [...indices, index];
      
      if (typeof item === 'string') {
        // This is a file
        const filePath = currentPath ? `${currentPath}/${item}` : item;
        pathIndices.set(filePath, newIndices);
        
        // Also map the filename alone (for root-level files)
        if (!currentPath) {
          pathIndices.set(item, newIndices);
        }
      } else if (typeof item === 'object' && 'name' in item && 'files' in item) {
        // This is a directory
        const newPath = currentPath ? `${currentPath}/${item.name}` : item.name;
        mapIndices(item.files, newPath, newIndices);
      }
    });
  }
  
  mapIndices(orderConfig);
  
  // Check for exact path match first
  if (pathIndices.has(cleanPath)) {
    return { 
      found: true, 
      indices: pathIndices.get(cleanPath) 
    };
  }
  
  // For root level files, try matching just the filename
  const pathParts = cleanPath.split('/');
  if (pathParts.length === 1 && pathIndices.has(pathParts[0])) {
    return {
      found: true,
      indices: pathIndices.get(pathParts[0])
    };
  }
  
  return { found: false };
}

// Calculate priority based on indices in the schema order
function calculatePriority(indices: number[] | undefined): number {
  if (!indices || indices.length === 0) return Number.MAX_SAFE_INTEGER;
  
  // Convert indices array to a sort key
  // Each level gets progressively less weight
  return indices.reduce((priority, index, level) => {
    return priority + (index * Math.pow(10000, 10 - level));
  }, 0);
}

function sortBySchemaPriority(a: GraphQLFile, b: GraphQLFile, orderConfig: SchemaOrderConfig | null): number {
  // If we have an order config, use it for sorting
  if (orderConfig) {
    const aMatch = matchFileToConfig(a.relativePath, orderConfig);
    const bMatch = matchFileToConfig(b.relativePath, orderConfig);
    
    // If both files are found in the config, sort by their position
    if (aMatch.found && bMatch.found) {
      const aPriority = calculatePriority(aMatch.indices);
      const bPriority = calculatePriority(bMatch.indices);
      return aPriority - bPriority;
    }
    
    // If only one file is in the config, prioritize it
    if (aMatch.found) return -1;
    if (bMatch.found) return 1;
  }
  
  // Fall back to the original sorting logic for files not in the config
  // Split paths into segments
  const aSegments = a.relativePath.split('/');
  const bSegments = b.relativePath.split('/');
  
  // Compare each directory level separately
  const maxLength = Math.max(aSegments.length, bSegments.length);
  
  for (let i = 0; i < maxLength - 1; i++) {
    // If one path is shorter than the other and we've reached its end
    if (i >= aSegments.length) return -1;
    if (i >= bSegments.length) return 1;
    
    // Compare directory prefixes as numbers
    const aDirPrefix = getNumericPrefix(aSegments[i]) || 0;
    const bDirPrefix = getNumericPrefix(bSegments[i]) || 0;
    
    if (aDirPrefix !== bDirPrefix) {
      return aDirPrefix - bDirPrefix;
    }
  }
  
  // If all directories are the same, compare file prefixes
  // Get the prefix from the last segment
  const aFilePrefix = a.prefix || 0;
  const bFilePrefix = b.prefix || 0;
  
  return aFilePrefix - bFilePrefix;
}

function generateCombinedSchema(): void {
  logger.info('🔄 Generating combined schema...');
  
  // Check if schemas directory exists
  if (!fs.existsSync(SCHEMA_DIR)) {
    const errorMsg = `Schemas directory not found: ${SCHEMA_DIR}`;
    logger.error(errorMsg);
    return;
  }

  // Load schema order configuration if available
  const orderConfig = loadSchemaOrder();

  // Recursively get all .graphql files from the schemas directory
  let graphqlFiles = getAllGraphQLFiles(SCHEMA_DIR);
  
  if (graphqlFiles.length === 0) {
    const errorMsg = 'No GraphQL files found in schemas directory';
    logger.error(errorMsg);
    return;
  }
  
  // Filter files to only include those in the config (if config exists)
  if (orderConfig) {
    const before = graphqlFiles.length;
    graphqlFiles = graphqlFiles.filter(file => isFileInConfig(file.relativePath, orderConfig));
    logger.info(`📋 Filtered from ${before} to ${graphqlFiles.length} files based on schema-order.ts`);
    
    // Log files that were excluded for debugging
    if (before > graphqlFiles.length) {
      logger.warn('🔍 Excluded files:');
      getAllGraphQLFiles(SCHEMA_DIR).filter(file => !isFileInConfig(file.relativePath, orderConfig))
        .forEach(file => logger.debug(`  - ${file.relativePath}`));
    }
  }
  
  // Sort files based on order config
  graphqlFiles.sort((a, b) => sortBySchemaPriority(a, b, orderConfig));
  
  // Combine all GraphQL files
  let combinedSchema = '# COMBINED SCHEMA\n# Auto-generated from schema files\n\n';
  
  for (const file of graphqlFiles) {
    logger.info(`📄 Processing schema: ${file.relativePath}`);
    
    try {
      const content = fs.readFileSync(file.path, 'utf8');
      combinedSchema += `\n# ----- ${file.relativePath} ----- \n${content}\n# ----- END ${file.relativePath} ----- \n`;
    } catch (error) {
      logger.logErrorWithContext(error as Error, {
        file: file.relativePath,
        filePath: file.path,
        operation: 'read_schema_file'
      }, `Schema file read: ${file.relativePath}`);
    }
  }
  
  // Handle special case of schema.graphql at the root level
  const rootSchemaPath = path.join(SCHEMA_DIR, 'schema.graphql');
  if (fs.existsSync(rootSchemaPath)) {
    logger.info('📄 Processing root schema.graphql');
    try {
      const rootSchema = fs.readFileSync(rootSchemaPath, 'utf8');
      // Add root schema at the end
      combinedSchema += `\n# ---------- \n${rootSchema}\n# ---------- \n`;
    } catch (error) {
      logger.logErrorWithContext(error as Error, {
        file: 'schema.graphql',
        filePath: rootSchemaPath,
        operation: 'read_root_schema_file'
      }, 'Root schema file read');
    }
  }
  
  // Ensure output directory exists (same directory as the output file)
  const outputDir = path.dirname(OUTPUT_SCHEMA_PATH);
  if (!fs.existsSync(outputDir)) {
    logger.info(`📁 Creating output directory: ${outputDir}`);
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write combined schema to file
  try {
    fs.writeFileSync(OUTPUT_SCHEMA_PATH, combinedSchema);
    logger.logSchemaBuild(OUTPUT_SCHEMA_PATH, true);
    logger.info(`✅ Combined schema successfully written to: ${OUTPUT_SCHEMA_PATH}`);
    logger.info(`💡 This file should be committed to the repository as it's used by the database.`);
  } catch (error) {
    logger.logSchemaBuild(OUTPUT_SCHEMA_PATH, false, (error as Error).message, {
      outputPath: OUTPUT_SCHEMA_PATH,
      operation: 'write_combined_schema'
    });
    
    logger.logErrorWithContext(error as Error, {
      outputPath: OUTPUT_SCHEMA_PATH,
      operation: 'write_combined_schema'
    }, 'Schema file write');
  }
}

// Execute the schema generation
generateCombinedSchema();

logger.info('🎉 Schema modularization complete! 🎉');