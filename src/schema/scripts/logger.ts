import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

// Log levels
export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG'
}

// Log entry interface
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: any;
  script?: string;
}

class Logger {
  private logDir: string;
  private logFile: string;
  private errorLogFile: string;

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.logFile = path.join(this.logDir, `schema-${this.getDateString()}.log`);
    this.errorLogFile = path.join(this.logDir, `schema-errors-${this.getDateString()}.log`);
    
    // Ensure log directory exists
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private getDateString(): string {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private writeToFile(logEntry: LogEntry, isError: boolean = false): void {
    const filePath = isError ? this.errorLogFile : this.logFile;
    const logLine = JSON.stringify(logEntry) + '\n';
    
    try {
      fs.appendFileSync(filePath, logLine);
    } catch (error) {
      // Fallback to console if file writing fails
      console.error(chalk.red(`Failed to write to log file: ${(error as Error).message}`));
    }
  }

  private formatConsoleMessage(level: LogLevel, message: string, details?: any): string {
    const timestamp = new Date().toISOString();
    const scriptName = path.basename(process.argv[1] || 'unknown');
    
    let formattedMessage = `[${timestamp}] [${level}] [${scriptName}] ${message}`;
    
    if (details) {
      formattedMessage += `\n${JSON.stringify(details, null, 2)}`;
    }
    
    return formattedMessage;
  }

  private log(level: LogLevel, message: string, details?: any): void {
    const scriptName = path.basename(process.argv[1] || 'unknown');
    const logEntry: LogEntry = {
      timestamp: this.getTimestamp(),
      level,
      message,
      details,
      script: scriptName
    };

    // Write to file
    this.writeToFile(logEntry, level === LogLevel.ERROR);

    // Console output with colors
    const consoleMessage = this.formatConsoleMessage(level, message, details);
    
    switch (level) {
      case LogLevel.ERROR:
        console.error(chalk.red(consoleMessage));
        break;
      case LogLevel.WARN:
        console.warn(chalk.yellow(consoleMessage));
        break;
      case LogLevel.INFO:
        console.log(chalk.blue(consoleMessage));
        break;
      case LogLevel.DEBUG:
        console.log(chalk.gray(consoleMessage));
        break;
    }
  }

  error(message: string, details?: any): void {
    this.log(LogLevel.ERROR, message, details);
  }

  warn(message: string, details?: any): void {
    this.log(LogLevel.WARN, message, details);
  }

  info(message: string, details?: any): void {
    this.log(LogLevel.INFO, message, details);
  }

  debug(message: string, details?: any): void {
    this.log(LogLevel.DEBUG, message, details);
  }

  // Log schema-specific operations
  logSchemaBuild(schemaFile: string, success: boolean, error?: string, context?: any): void {
    const message = success 
      ? `Schema build completed successfully: ${schemaFile}`
      : `Schema build failed: ${schemaFile}`;
    
    const details = {
      schemaFile,
      success,
      error,
      context,
      timestamp: this.getTimestamp(),
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        cwd: process.cwd()
      }
    };

    if (success) {
      this.info(message, details);
    } else {
      this.error(message, details);
    }
  }

  logSchemaApply(endpoint: string, success: boolean, error?: string, response?: string, context?: any): void {
    const message = success 
      ? `Schema applied successfully to Dgraph: ${endpoint}`
      : `Schema application failed: ${endpoint}`;
    
    const details = {
      endpoint,
      success,
      error,
      response,
      context,
      timestamp: this.getTimestamp(),
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        cwd: process.cwd()
      },
      network: {
        userAgent: `Node.js/${process.version}`,
        timeout: 30000 // Default fetch timeout
      }
    };

    if (success) {
      this.info(message, details);
    } else {
      this.error(message, details);
    }

    // Always log raw schema application data for analysis
    this.logRawSchemaApplication(endpoint, success, error, response, context);
  }

  // Log raw schema application data without formatting
  private logRawSchemaApplication(endpoint: string, success: boolean, error?: string, response?: string, context?: any): void {
    const rawLogEntry = {
      timestamp: this.getTimestamp(),
      level: success ? LogLevel.INFO : LogLevel.ERROR,
      message: `RAW_SCHEMA_APPLICATION: ${success ? 'SUCCESS' : 'FAILED'} - ${endpoint}`,
      details: {
        type: 'RAW_SCHEMA_APPLICATION',
        data: {
          endpoint,
          success,
          error,
          response,
          context,
          fullContext: context
        }
      },
      script: path.basename(process.argv[1] || 'unknown')
    };

    this.writeToFile(rawLogEntry, !success); // Write to error log if failed
  }

  // Enhanced error logging with complete context
  logErrorWithContext(error: Error, context: any = {}, operation: string = 'unknown'): void {
    const errorDetails = {
      operation,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: (error as any).code,
        errno: (error as any).errno,
        syscall: (error as any).syscall,
        hostname: (error as any).hostname,
        port: (error as any).port,
        path: (error as any).path
      },
      context,
      dgraphErrorDetails: (error as any).dgraphErrorDetails || context.dgraphErrorDetails,
      timestamp: this.getTimestamp(),
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        cwd: process.cwd(),
        memory: {
          used: process.memoryUsage().heapUsed,
          total: process.memoryUsage().heapTotal,
          external: process.memoryUsage().external
        }
      }
    };

    this.error(`Operation failed: ${operation}`, errorDetails);
    
    // Log raw data separately for easier analysis
    if (errorDetails.dgraphErrorDetails) {
      this.logRawDgraphError(errorDetails.dgraphErrorDetails);
    }
  }

  // Log raw Dgraph error data without formatting
  private logRawDgraphError(dgraphErrorDetails: any): void {
    const rawLogEntry = {
      timestamp: this.getTimestamp(),
      level: LogLevel.ERROR,
      message: 'RAW_DGRAPH_ERROR: Complete error details from Dgraph',
      details: {
        type: 'RAW_DGRAPH_ERROR',
        data: dgraphErrorDetails
      },
      script: path.basename(process.argv[1] || 'unknown')
    };

    this.writeToFile(rawLogEntry, true);
  }



  // Get log file paths
  getLogFiles(): { logFile: string; errorLogFile: string } {
    return {
      logFile: this.logFile,
      errorLogFile: this.errorLogFile
    };
  }

  // Read recent logs
  getRecentLogs(lines: number = 50, level?: LogLevel): string[] {
    const filePath = level === LogLevel.ERROR ? this.errorLogFile : this.logFile;
    
    if (!fs.existsSync(filePath)) {
      return [];
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const logLines = content.trim().split('\n').filter(line => line.length > 0);
      return logLines.slice(-lines);
    } catch (error) {
      this.error(`Failed to read log file: ${(error as Error).message}`);
      return [];
    }
  }
}

// Export singleton instance
export const logger = new Logger();
