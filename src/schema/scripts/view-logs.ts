import { logger } from './logger';
import chalk from 'chalk';

// CLI argument parsing
function parseArguments(): { lines: number; level?: string; showErrors: boolean; showRaw: boolean } {
  const args = process.argv.slice(2);
  const options = { lines: 50, level: undefined as string | undefined, showErrors: false, showRaw: false };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--lines':
      case '-n':
        options.lines = parseInt(args[++i]) || 50;
        break;
      case '--level':
      case '-l':
        options.level = args[++i];
        break;
      case '--errors':
      case '-e':
        options.showErrors = true;
        break;
      case '--raw':
      case '-r':
        options.showRaw = true;
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
  console.log(chalk.cyan('📖 Log Viewer Script'));
  console.log('');
  console.log(chalk.white('Usage:'));
  console.log(chalk.gray('  node view-logs.ts [options]'));
  console.log('');
  console.log(chalk.white('Options:'));
  console.log(chalk.gray('  --lines, -n <number>  Number of lines to show (default: 50)'));
  console.log(chalk.gray('  --level, -l <level>   Filter by log level (ERROR, WARN, INFO, DEBUG)'));
  console.log(chalk.gray('  --errors, -e          Show only error logs'));
  console.log(chalk.gray('  --raw, -r             Show raw log entries without formatting'));
  console.log(chalk.gray('  --help, -h            Show this help message'));
  console.log('');
  console.log(chalk.white('Examples:'));
  console.log(chalk.gray('  node view-logs.ts'));
  console.log(chalk.gray('  node view-logs.ts --lines 100'));
  console.log(chalk.gray('  node view-logs.ts --errors'));
  console.log(chalk.gray('  node view-logs.ts --raw'));
  console.log(chalk.gray('  node view-logs.ts --level ERROR'));
}

function formatLogEntry(logLine: string): string {
  try {
    const entry = JSON.parse(logLine);
    const timestamp = new Date(entry.timestamp).toLocaleString();
    const level = entry.level;
    const script = entry.script || 'unknown';
    const message = entry.message;
    
    let colorizedLevel: string;
    switch (level) {
      case 'ERROR':
        colorizedLevel = chalk.red(level);
        break;
      case 'WARN':
        colorizedLevel = chalk.yellow(level);
        break;
      case 'INFO':
        colorizedLevel = chalk.blue(level);
        break;
      case 'DEBUG':
        colorizedLevel = chalk.gray(level);
        break;
      default:
        colorizedLevel = level;
    }
    
    let formattedMessage = `${chalk.gray(timestamp)} [${colorizedLevel}] [${chalk.cyan(script)}] ${message}`;
    
    // Add detailed error information for ERROR level
    if (level === 'ERROR' && entry.details && entry.details.error) {
      const error = entry.details.error;
      formattedMessage += `\n${chalk.red('  Error Details:')}`;
      formattedMessage += `\n${chalk.gray('    Name:')} ${error.name}`;
      formattedMessage += `\n${chalk.gray('    Message:')} ${error.message}`;
      
      if (error.code) {
        formattedMessage += `\n${chalk.gray('    Code:')} ${error.code}`;
      }
      if (error.errno) {
        formattedMessage += `\n${chalk.gray('    Errno:')} ${error.errno}`;
      }
      if (error.syscall) {
        formattedMessage += `\n${chalk.gray('    Syscall:')} ${error.syscall}`;
      }
      if (error.hostname) {
        formattedMessage += `\n${chalk.gray('    Hostname:')} ${error.hostname}`;
      }
      if (error.port) {
        formattedMessage += `\n${chalk.gray('    Port:')} ${error.port}`;
      }
    }
    

    
    // Add context information
    if (entry.details && entry.details.context) {
      formattedMessage += `\n${chalk.blue('  Context:')}`;
      Object.entries(entry.details.context).forEach(([key, value]) => {
        if (key !== 'dgraphErrorDetails') { // Handle dgraphErrorDetails separately
          formattedMessage += `\n${chalk.gray(`    ${key}:`)} ${value}`;
        }
      });
    }
    
    // Add Dgraph error details
    if (entry.details && entry.details.dgraphErrorDetails) {
      const dgraphDetails = entry.details.dgraphErrorDetails;
      formattedMessage += `\n${chalk.red('  Dgraph Error Details:')}`;
      formattedMessage += `\n${chalk.gray('    HTTP Status:')} ${dgraphDetails.httpStatus} ${dgraphDetails.httpStatusText}`;
      
      if (dgraphDetails.responseBody && dgraphDetails.responseBody.errors) {
        formattedMessage += `\n${chalk.gray('    Dgraph Errors:')}`;
        dgraphDetails.responseBody.errors.forEach((err: any, index: number) => {
          formattedMessage += `\n${chalk.gray(`      ${index + 1}.`)} ${err.message || 'Unknown error'}`;
          if (err.locations && err.locations.length > 0) {
            err.locations.forEach((loc: any) => {
              formattedMessage += `\n${chalk.gray('        Location:')} Line ${loc.line}, Column ${loc.column}`;
            });
          }
          if (err.path) {
            formattedMessage += `\n${chalk.gray('        Path:')} ${err.path.join('.')}`;
          }
        });
      }
      
      if (dgraphDetails.responseBody && dgraphDetails.responseBody.message) {
        formattedMessage += `\n${chalk.gray('    Message:')} ${dgraphDetails.responseBody.message}`;
      }
      
      if (dgraphDetails.schemaContent) {
        formattedMessage += `\n${chalk.gray('    Schema Context:')}`;
        formattedMessage += `\n${chalk.gray('      (First 1000 chars)')}`;
        formattedMessage += `\n${chalk.gray('      ')}${dgraphDetails.schemaContent}`;
      }
    }
    
    return formattedMessage;
  } catch (error) {
    return chalk.gray(logLine);
  }
}

// Main execution
function main(): void {
  try {
    const options = parseArguments();
    
    console.log(chalk.cyan('📋 Recent Logs'));
    console.log(chalk.gray('─'.repeat(80)));
    
    const logFiles = logger.getLogFiles();
    
    if (options.showRaw) {
      console.log(chalk.magenta('🔍 Showing raw logs:'));
      const rawLogs = logger.getRecentLogs(options.lines, options.showErrors ? 'ERROR' as any : undefined);
      if (rawLogs.length === 0) {
        console.log(chalk.gray('No logs found.'));
      } else {
        rawLogs.forEach(logLine => {
          console.log(chalk.gray(logLine));
        });
      }
    } else if (options.showErrors || options.level === 'ERROR') {
      console.log(chalk.yellow('🔍 Showing error logs:'));
      const errorLogs = logger.getRecentLogs(options.lines, 'ERROR' as any);
      if (errorLogs.length === 0) {
        console.log(chalk.gray('No error logs found.'));
      } else {
        errorLogs.forEach(logLine => {
          console.log(formatLogEntry(logLine));
        });
      }
    } else {
      console.log(chalk.blue('📄 Showing all logs:'));
      const allLogs = logger.getRecentLogs(options.lines);
      if (allLogs.length === 0) {
        console.log(chalk.gray('No logs found.'));
      } else {
        allLogs.forEach(logLine => {
          console.log(formatLogEntry(logLine));
        });
      }
    }
    
    console.log(chalk.gray('─'.repeat(80)));
    console.log(chalk.gray(`Log files: ${logFiles.logFile}`));
    if (options.showErrors || options.level === 'ERROR') {
      console.log(chalk.gray(`Error log file: ${logFiles.errorLogFile}`));
    }
    
  } catch (error) {
    console.error(chalk.red(`❌ Unexpected error: ${(error as Error).message}`));
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}
