import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { logger } from './logger';

// Configuration
const SCHEMA_PATH = path.join(__dirname, '../dist/schema.combined.graphql');
const DGRAPH_HOST = process.env.DGRAPH_HOST || 'localhost';
const DGRAPH_PORT = process.env.DGRAPH_PORT || '8080';

interface ApplySchemaOptions {
  host?: string;
  port?: string;
  dryRun?: boolean;
  verbose?: boolean;
}

async function applySchemaToDgraph(options: ApplySchemaOptions = {}): Promise<void> {
  const {
    host = DGRAPH_HOST,
    port = DGRAPH_PORT,
    dryRun = false,
    verbose = false
  } = options;

  const endpoint = `http://${host}:${port}/admin/schema`;

  logger.info('🔄 Applying schema to Dgraph...');
  
  if (verbose) {
    logger.info(`📍 Dgraph endpoint: ${endpoint}`);
    logger.info(`📄 Schema file: ${SCHEMA_PATH}`);
  }

  // Check if schema file exists
  if (!fs.existsSync(SCHEMA_PATH)) {
    const error = new Error(`Schema file not found: ${SCHEMA_PATH}`);
    logger.logErrorWithContext(error, {
      schemaPath: SCHEMA_PATH,
      operation: 'check_schema_file_exists'
    }, 'Schema file existence check');
    logger.warn('💡 Run "npm run schema:build" first to generate the schema.');
    process.exit(1);
  }

  // Read the schema file
  let schemaContent: string;
  try {
    schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
    logger.info(`✅ Schema file loaded: ${SCHEMA_PATH}`);
    
    if (verbose) {
      logger.debug(`📊 Schema size: ${schemaContent.length} characters`);
    }
  } catch (error) {
    logger.logErrorWithContext(error as Error, {
      schemaPath: SCHEMA_PATH,
      operation: 'read_schema_file'
    }, 'Schema file read');
    process.exit(1);
  }

  // Check if this is a dry run
  if (dryRun) {
    logger.warn('🔍 DRY RUN - Schema would be applied to Dgraph:');
    logger.debug('--- Schema Preview ---');
    logger.debug(schemaContent.substring(0, 500) + '...');
    logger.debug('--- End Preview ---');
    logger.info('✅ Dry run completed successfully');
    return;
  }

  // Apply schema to Dgraph
  try {
    logger.info('📡 Sending schema to Dgraph...');
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
      },
      body: schemaContent,
    });

    const responseText = await response.text();
    let responseData: any = null;
    
    // Try to parse response as JSON
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      // Response is not JSON, treat as plain text
      responseData = { raw: responseText };
    }

    // Check for Dgraph errors in response (even if HTTP status is 200)
    if (responseData && responseData.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
      // Dgraph returned errors - treat as failure
      const errorDetails = {
        httpStatus: response.status,
        httpStatusText: response.statusText,
        responseHeaders: Object.fromEntries(response.headers.entries()),
        responseBody: responseData,
        rawResponse: responseText,
        fullSchemaContent: schemaContent, // Log the complete schema
        schemaContent: schemaContent.substring(0, 1000) + (schemaContent.length > 1000 ? '...' : ''), // First 1000 chars for context
        schemaSize: schemaContent.length,
        requestDetails: {
          method: 'POST',
          endpoint: endpoint,
          headers: {
            'Content-Type': 'application/graphql'
          },
          timestamp: new Date().toISOString()
        }
      };

      // Create a detailed error message from Dgraph errors
      const dgraphErrors = responseData.errors.map((err: any, index: number) => {
        return `Error ${index + 1}: ${err.message || 'Unknown error'}`;
      }).join('; ');
      
      const errorMessage = `Dgraph Schema Error: ${dgraphErrors}`;
      const enhancedError = new Error(errorMessage);
      (enhancedError as any).dgraphErrorDetails = errorDetails;
      
      throw enhancedError;
    }

    if (!response.ok) {
      // Enhanced error handling for HTTP errors
      const errorDetails = {
        httpStatus: response.status,
        httpStatusText: response.statusText,
        responseHeaders: Object.fromEntries(response.headers.entries()),
        responseBody: responseData,
        rawResponse: responseText,
        fullSchemaContent: schemaContent, // Log the complete schema
        schemaContent: schemaContent.substring(0, 1000) + (schemaContent.length > 1000 ? '...' : ''), // First 1000 chars for context
        schemaSize: schemaContent.length,
        requestDetails: {
          method: 'POST',
          endpoint: endpoint,
          headers: {
            'Content-Type': 'application/graphql'
          },
          timestamp: new Date().toISOString()
        }
      };

      // Create a more detailed error message
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      if (responseData && responseData.message) {
        // Dgraph returned a message
        errorMessage += ` - ${responseData.message}`;
      }

      const enhancedError = new Error(errorMessage);
      (enhancedError as any).dgraphErrorDetails = errorDetails;
      
      throw enhancedError;
    }

    logger.logSchemaApply(endpoint, true, undefined, responseText, {
      schemaSize: schemaContent.length,
      operation: 'apply_schema_to_dgraph',
      responseData
    });
    logger.info('✅ Schema applied successfully to Dgraph!');
    
    if (verbose && responseText) {
      logger.debug('📋 Response:');
      logger.debug(responseText);
    }

  } catch (error) {
    const errorDetails = {
      endpoint,
      schemaSize: schemaContent.length,
      operation: 'apply_schema_to_dgraph',
      dgraphErrorDetails: (error as any).dgraphErrorDetails
    };

    logger.logSchemaApply(endpoint, false, (error as Error).message, undefined, errorDetails);
    
    logger.logErrorWithContext(error as Error, errorDetails, 'Schema application to Dgraph');
    
    process.exit(1);
  }
}

// CLI argument parsing
function parseArguments(): ApplySchemaOptions {
  const args = process.argv.slice(2);
  const options: ApplySchemaOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--host':
        options.host = args[++i];
        break;
      case '--port':
        options.port = args[++i];
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--verbose':
      case '-v':
        options.verbose = true;
        break;
      case '--help':
      case '-h':
        showHelp();
        process.exit(0);
        break;
      default:
        console.error(chalk.red(`❌ Unknown argument: ${arg}`));
        showHelp();
        process.exit(1);
    }
  }

  return options;
}

function showHelp(): void {
  console.log(chalk.cyan('📖 Dgraph Schema Application Script'));
  console.log('');
  console.log(chalk.white('Usage:'));
  console.log(chalk.gray('  node apply-schema.ts [options]'));
  console.log('');
  console.log(chalk.white('Options:'));
  console.log(chalk.gray('  --host <host>     Dgraph host (default: localhost)'));
  console.log(chalk.gray('  --port <port>     Dgraph port (default: 8080)'));
  console.log(chalk.gray('  --dry-run         Show what would be applied without applying'));
  console.log(chalk.gray('  --verbose, -v     Show detailed output'));
  console.log(chalk.gray('  --help, -h        Show this help message'));
  console.log('');
  console.log(chalk.white('Examples:'));
  console.log(chalk.gray('  node apply-schema.ts'));
  console.log(chalk.gray('  node apply-schema.ts --host 192.168.1.100 --port 8080'));
  console.log(chalk.gray('  node apply-schema.ts --dry-run --verbose'));
  console.log('');
  console.log(chalk.white('Environment Variables:'));
  console.log(chalk.gray('  DGRAPH_HOST       Dgraph host (default: localhost)'));
  console.log(chalk.gray('  DGRAPH_PORT       Dgraph port (default: 8080)'));
}

// Main execution
async function main(): Promise<void> {
  try {
    const options = parseArguments();
    await applySchemaToDgraph(options);
  } catch (error) {
    console.error(chalk.red(`❌ Unexpected error: ${(error as Error).message}`));
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}
