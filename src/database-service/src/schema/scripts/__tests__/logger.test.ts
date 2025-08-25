import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { LogLevel, Logger } from '../logger';

// Mock fs module for better test isolation
vi.mock('fs', async () => {
  const actual = await vi.importActual('fs');
  return {
    ...actual,
    appendFileSync: vi.fn(),
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
    readFileSync: vi.fn(),
  };
});

describe('Logger', () => {
  let logger: any;
  const testLogDir = path.join(__dirname, '../../../test-logs');
  const mockFs = vi.mocked(fs);

  beforeEach(async () => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock fs.existsSync to return true for directories
    mockFs.existsSync.mockImplementation((path) => {
      if (typeof path === 'string' && path.includes('test-logs')) {
        return true;
      }
      return false;
    });
    
    // Mock fs.mkdirSync to do nothing
    mockFs.mkdirSync.mockImplementation(() => undefined);
    
    // Mock fs.appendFileSync to do nothing
    mockFs.appendFileSync.mockImplementation(() => {});
    
    // Mock fs.readFileSync to return test data
    mockFs.readFileSync.mockImplementation((path) => {
      if (typeof path === 'string' && path.includes('schema-')) {
        return JSON.stringify({
          timestamp: '2025-08-19T10:00:00.000Z',
          level: 'INFO',
          message: 'Test message',
          script: 'test.ts'
        }) + '\n' + JSON.stringify({
          timestamp: '2025-08-19T10:01:00.000Z',
          level: 'ERROR',
          message: 'Test error message',
          script: 'test.ts'
        });
      }
      return '';
    });
    
    // Create a new logger instance for testing
    logger = new Logger(testLogDir);
  });

  afterEach(async () => {
    // Clean up test logs
    try {
      await fs.promises.rm(testLogDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('Basic Logging', () => {
    it('should log info messages', async () => {
      const message = 'Test info message';
      logger.info(message);
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain(message);
      expect(logContent).toContain('INFO');
    });

    it('should log error messages', async () => {
      const message = 'Test error message';
      logger.error(message);
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain(message);
      expect(logContent).toContain('ERROR');
    });

    it('should log warn messages', async () => {
      const message = 'Test warning message';
      logger.warn(message);
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain(message);
      expect(logContent).toContain('WARN');
    });

    it('should log debug messages', async () => {
      const message = 'Test debug message';
      logger.debug(message);
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain(message);
      expect(logContent).toContain('DEBUG');
    });
  });

  describe('Structured Logging', () => {
    it('should log with additional details', async () => {
      const message = 'Test structured message';
      const details = {
        operation: 'test_operation',
        userId: '123',
        timestamp: new Date().toISOString()
      };
      
      logger.info(message, details);
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain(message);
      expect(logContent).toContain('test_operation');
      expect(logContent).toContain('123');
    });

    it('should log schema build operations', async () => {
      const schemaFile = '/test/schema.graphql';
      const success = true;
      
      logger.logSchemaBuild(schemaFile, success);
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain(schemaFile);
      expect(logContent).toContain('true');
    });

    it('should log schema build failures', async () => {
      const schemaFile = '/test/schema.graphql';
      const success = false;
      const error = 'Schema validation failed';
      
      logger.logSchemaBuild(schemaFile, success, error);
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain(schemaFile);
      expect(logContent).toContain(error);
    });

    it('should log schema application operations', async () => {
      const endpoint = 'http://localhost:8080/admin/schema';
      const success = true;
      const response = '{"data":{"code":"Success"}}';
      
      logger.logSchemaApply(endpoint, success, undefined, response);
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain(endpoint);
      expect(logContent).toContain('Success');
    });
  });

  describe('Error Context Logging', () => {
    it('should log errors with context', async () => {
      const error = new Error('Test error');
      const context = {
        operation: 'test_operation',
        userId: '123',
        endpoint: 'http://localhost:8080'
      };
      const operation = 'Test Operation';
      
      logger.logErrorWithContext(error, context, operation);
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain('Test error');
      expect(logContent).toContain('test_operation');
      expect(logContent).toContain('123');
      expect(logContent).toContain('http://localhost:8080');
      expect(logContent).toContain('Test Operation');
    });

    it('should log Dgraph errors with details', async () => {
      const error = new Error('Dgraph Schema Error: Undefined type');
      const context = {
        endpoint: 'http://localhost:8080/admin/schema',
        dgraphErrorDetails: {
          httpStatus: 200,
          responseBody: {
            errors: [{
              message: 'Undefined type TestType'
            }]
          }
        }
      };
      
      logger.logErrorWithContext(error, context, 'Schema Application');
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain('RAW_DGRAPH_ERROR');
      expect(logContent).toContain('Undefined type TestType');
      expect(logContent).toContain('200');
    });
  });

  describe('Log File Management', () => {
    it('should create log files with correct naming', async () => {
      logger.info('Test message');
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the file path from the first call
      const firstCall = mockFs.appendFileSync.mock.calls[0];
      const filePath = firstCall[0] as string;
      
      expect(filePath).toMatch(/schema-\d{4}-\d{2}-\d{2}\.log/);
    });

    it('should create error log files when errors occur', async () => {
      logger.error('Test error');
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the file path from the last call
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const filePath = lastCall[0] as string;
      
      expect(filePath).toMatch(/schema-errors-\d{4}-\d{2}-\d{2}\.log/);
    });

    it('should get log file paths correctly', async () => {
      const logFiles = logger.getLogFiles();
      
      expect(logFiles.logFile).toContain('schema-');
      expect(logFiles.logFile).toContain('.log');
      expect(logFiles.errorLogFile).toContain('schema-errors-');
      expect(logFiles.errorLogFile).toContain('.log');
    });
  });

  describe('Log Reading', () => {
    it('should read recent logs', async () => {
      // Mock readFileSync to return test data with multiple entries
      mockFs.readFileSync.mockReturnValueOnce(
        JSON.stringify({
          timestamp: '2025-08-19T10:00:00.000Z',
          level: 'INFO',
          message: 'First message',
          script: 'test.ts'
        }) + '\n' + JSON.stringify({
          timestamp: '2025-08-19T10:01:00.000Z',
          level: 'INFO',
          message: 'Second message',
          script: 'test.ts'
        }) + '\n' + JSON.stringify({
          timestamp: '2025-08-19T10:02:00.000Z',
          level: 'INFO',
          message: 'Third message',
          script: 'test.ts'
        })
      );
      
      const recentLogs = logger.getRecentLogs(2);
      expect(recentLogs).toHaveLength(2);
      expect(recentLogs[recentLogs.length - 1]).toContain('Third message');
    });

    it('should read logs by level', async () => {
      // Mock readFileSync to return error log data
      mockFs.readFileSync.mockReturnValueOnce(
        JSON.stringify({
          timestamp: '2025-08-19T10:01:00.000Z',
          level: 'ERROR',
          message: 'Error message',
          script: 'test.ts'
        })
      );
      
      const errorLogs = logger.getRecentLogs(10, LogLevel.ERROR);
      expect(errorLogs.length).toBeGreaterThan(0);
      expect(errorLogs.every(log => log.includes('ERROR'))).toBe(true);
    });

    it('should handle empty log files', async () => {
      // Mock readFileSync to return empty content
      mockFs.readFileSync.mockReturnValueOnce('');
      
      const recentLogs = logger.getRecentLogs(10);
      expect(recentLogs).toHaveLength(0);
    });
  });

  describe('Raw Logging', () => {
    it('should log raw schema application data', async () => {
      const endpoint = 'http://localhost:8080/admin/schema';
      const success = true;
      const response = '{"data":{"code":"Success"}}';
      const context = { test: 'data' };
      
      logger.logSchemaApply(endpoint, success, undefined, response, context);
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain('RAW_SCHEMA_APPLICATION');
      expect(logContent).toContain('SUCCESS');
      expect(logContent).toContain(endpoint);
    });

    it('should log raw Dgraph error data', async () => {
      const error = new Error('Dgraph error');
      const context = {
        dgraphErrorDetails: {
          httpStatus: 400,
          responseBody: { errors: [{ message: 'Test error' }] }
        }
      };
      
      logger.logErrorWithContext(error, context, 'Test Operation');
      
      // Verify that appendFileSync was called
      expect(mockFs.appendFileSync).toHaveBeenCalled();
      
      // Get the last call to appendFileSync
      const lastCall = mockFs.appendFileSync.mock.calls[mockFs.appendFileSync.mock.calls.length - 1];
      const logContent = lastCall[1] as string;
      
      expect(logContent).toContain('RAW_DGRAPH_ERROR');
      expect(logContent).toContain('400');
      expect(logContent).toContain('Test error');
    });
  });

  describe('Timestamp Formatting', () => {
    it('should generate valid timestamps', () => {
      const timestamp = logger.getTimestamp();
      
      // Should be ISO format
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      
      // Should be recent
      const timestampDate = new Date(timestamp);
      const now = new Date();
      const diff = Math.abs(now.getTime() - timestampDate.getTime());
      expect(diff).toBeLessThan(1000); // Within 1 second
    });
  });
});
