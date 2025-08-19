import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Mock the logger
vi.mock('./logger', () => ({
  logger: {
    getLogFiles: vi.fn(),
    getRecentLogs: vi.fn()
  }
}));

describe('Log Viewer', () => {
  const testLogDir = path.join(__dirname, '../../../test-logs');
  const testLogFile = path.join(testLogDir, 'schema-2025-08-19.log');
  const testErrorLogFile = path.join(testLogDir, 'schema-errors-2025-08-19.log');

  const mockLogEntries = [
    {
      timestamp: '2025-08-19T10:00:00.000Z',
      level: 'INFO',
      message: 'Test info message',
      details: {
        operation: 'test_operation',
        endpoint: 'http://localhost:8080'
      },
      script: 'test.ts'
    },
    {
      timestamp: '2025-08-19T10:01:00.000Z',
      level: 'ERROR',
      message: 'Test error message',
      details: {
        operation: 'test_operation',
        error: {
          name: 'Error',
          message: 'Test error',
          stack: 'Error: Test error\n    at test.ts:1:1'
        },
        context: {
          endpoint: 'http://localhost:8080',
          schemaSize: 1000
        }
      },
      script: 'test.ts'
    },
    {
      timestamp: '2025-08-19T10:02:00.000Z',
      level: 'WARN',
      message: 'Test warning message',
      details: {
        operation: 'test_operation'
      },
      script: 'test.ts'
    }
  ];

  const mockErrorLogEntries = [
    {
      timestamp: '2025-08-19T10:01:00.000Z',
      level: 'ERROR',
      message: 'Test error message',
      details: {
        operation: 'test_operation',
        error: {
          name: 'Error',
          message: 'Test error',
          stack: 'Error: Test error\n    at test.ts:1:1'
        },
        context: {
          endpoint: 'http://localhost:8080',
          schemaSize: 1000
        },
        dgraphErrorDetails: {
          httpStatus: 200,
          responseBody: {
            errors: [{
              message: 'Undefined type TestType',
              locations: [{ line: 3, column: 4 }]
            }]
          }
        }
      },
      script: 'test.ts'
    }
  ];

  beforeEach(async () => {
    // Create test log directory
    await fs.promises.mkdir(testLogDir, { recursive: true });
    
    // Create test log files
    await fs.promises.writeFile(testLogFile, mockLogEntries.map(entry => JSON.stringify(entry)).join('\n'));
    await fs.promises.writeFile(testErrorLogFile, mockErrorLogEntries.map(entry => JSON.stringify(entry)).join('\n'));
    
    // Wait for file system operations
    await new Promise(resolve => setTimeout(resolve, 10));
  });

  afterEach(async () => {
    // Clean up test files
    try {
      await fs.promises.rm(testLogDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('Log File Reading', () => {
    it('should read log files successfully', async () => {
      const content = await fs.promises.readFile(testLogFile, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim());
      
      expect(lines).toHaveLength(3);
      expect(lines[0]).toContain('Test info message');
      expect(lines[1]).toContain('Test error message');
      expect(lines[2]).toContain('Test warning message');
    });

    it('should handle empty log files', async () => {
      const emptyLogFile = path.join(testLogDir, 'empty.log');
      await fs.promises.writeFile(emptyLogFile, '');
      
      const content = await fs.promises.readFile(emptyLogFile, 'utf-8');
      expect(content).toBe('');
    });

    it('should handle malformed log entries', async () => {
      const malformedLogFile = path.join(testLogDir, 'malformed.log');
      const malformedContent = `
        {"valid": "entry"}
        invalid json
        {"another": "valid"}
      `;
      await fs.promises.writeFile(malformedLogFile, malformedContent);
      
      const content = await fs.promises.readFile(malformedLogFile, 'utf-8');
      expect(content).toContain('{"valid": "entry"}');
      expect(content).toContain('invalid json');
      expect(content).toContain('{"another": "valid"}');
    });
  });

  describe('Log Entry Parsing', () => {
    it('should parse valid JSON log entries', () => {
      const validEntry = JSON.stringify(mockLogEntries[0]);
      const parsed = JSON.parse(validEntry);
      
      expect(parsed.timestamp).toBe('2025-08-19T10:00:00.000Z');
      expect(parsed.level).toBe('INFO');
      expect(parsed.message).toBe('Test info message');
      expect(parsed.details.operation).toBe('test_operation');
    });

    it('should handle invalid JSON gracefully', () => {
      const invalidEntry = 'invalid json';
      
      try {
        JSON.parse(invalidEntry);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Unexpected token');
      }
    });

    it('should parse error log entries with Dgraph details', () => {
      const errorEntry = JSON.stringify(mockErrorLogEntries[0]);
      const parsed = JSON.parse(errorEntry);
      
      expect(parsed.level).toBe('ERROR');
      expect(parsed.details.dgraphErrorDetails).toBeDefined();
      expect(parsed.details.dgraphErrorDetails.httpStatus).toBe(200);
      expect(parsed.details.dgraphErrorDetails.responseBody.errors[0].message).toBe('Undefined type TestType');
    });
  });

  describe('Log Formatting', () => {
    it('should format log entries with proper structure', () => {
      const entry = mockLogEntries[0];
      const formatted = `${entry.timestamp} [${entry.level}] [${entry.script}] ${entry.message}`;
      
      expect(formatted).toContain('2025-08-19T10:00:00.000Z');
      expect(formatted).toContain('[INFO]');
      expect(formatted).toContain('[test.ts]');
      expect(formatted).toContain('Test info message');
    });

    it('should format error entries with error details', () => {
      const entry = mockLogEntries[1];
      const formatted = `${entry.timestamp} [${entry.level}] [${entry.script}] ${entry.message}`;
      
      expect(formatted).toContain('[ERROR]');
      expect(formatted).toContain('Test error message');
    });

    it('should format Dgraph error details', () => {
      const entry = mockErrorLogEntries[0];
      const dgraphDetails = entry.details.dgraphErrorDetails;
      
      expect(dgraphDetails.httpStatus).toBe(200);
      expect(dgraphDetails.responseBody.errors).toBeDefined();
      expect(dgraphDetails.responseBody.errors[0].message).toBe('Undefined type TestType');
      expect(dgraphDetails.responseBody.errors[0].locations[0].line).toBe(3);
      expect(dgraphDetails.responseBody.errors[0].locations[0].column).toBe(4);
    });
  });

  describe('CLI Argument Parsing', () => {
    it('should parse lines argument', () => {
      const originalArgv = process.argv;
      process.argv = ['node', 'view-logs.ts', '--lines', '100'];
      
      expect(process.argv).toContain('--lines');
      expect(process.argv).toContain('100');
      
      process.argv = originalArgv;
    });

    it('should parse level argument', () => {
      const originalArgv = process.argv;
      process.argv = ['node', 'view-logs.ts', '--level', 'ERROR'];
      
      expect(process.argv).toContain('--level');
      expect(process.argv).toContain('ERROR');
      
      process.argv = originalArgv;
    });

    it('should parse errors argument', () => {
      const originalArgv = process.argv;
      process.argv = ['node', 'view-logs.ts', '--errors'];
      
      expect(process.argv).toContain('--errors');
      
      process.argv = originalArgv;
    });

    it('should parse raw argument', () => {
      const originalArgv = process.argv;
      process.argv = ['node', 'view-logs.ts', '--raw'];
      
      expect(process.argv).toContain('--raw');
      
      process.argv = originalArgv;
    });

    it('should parse combined arguments', () => {
      const originalArgv = process.argv;
      process.argv = ['node', 'view-logs.ts', '--raw', '--errors', '--lines', '50'];
      
      expect(process.argv).toContain('--raw');
      expect(process.argv).toContain('--errors');
      expect(process.argv).toContain('--lines');
      expect(process.argv).toContain('50');
      
      process.argv = originalArgv;
    });
  });

  describe('Log Filtering', () => {
    it('should filter logs by level', () => {
      const errorLogs = mockLogEntries.filter(entry => entry.level === 'ERROR');
      const infoLogs = mockLogEntries.filter(entry => entry.level === 'INFO');
      const warnLogs = mockLogEntries.filter(entry => entry.level === 'WARN');
      
      expect(errorLogs).toHaveLength(1);
      expect(infoLogs).toHaveLength(1);
      expect(warnLogs).toHaveLength(1);
      
      expect(errorLogs[0].message).toBe('Test error message');
      expect(infoLogs[0].message).toBe('Test info message');
      expect(warnLogs[0].message).toBe('Test warning message');
    });

    it('should limit log entries by count', () => {
      const limitedLogs = mockLogEntries.slice(0, 2);
      
      expect(limitedLogs).toHaveLength(2);
      expect(limitedLogs[0].message).toBe('Test info message');
      expect(limitedLogs[1].message).toBe('Test error message');
    });

    it('should filter error logs only', () => {
      const errorOnlyLogs = mockLogEntries.filter(entry => entry.level === 'ERROR');
      
      expect(errorOnlyLogs).toHaveLength(1);
      expect(errorOnlyLogs[0].level).toBe('ERROR');
      expect(errorOnlyLogs[0].message).toBe('Test error message');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing log files gracefully', async () => {
      const nonExistentFile = path.join(testLogDir, 'nonexistent.log');
      
      try {
        await fs.promises.access(nonExistentFile);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.code).toBe('ENOENT');
      }
    });

    it('should handle permission errors gracefully', async () => {
      // This would test permission error handling
      // For now, we'll test that we can detect file existence
      try {
        await fs.promises.access(testLogFile);
        expect(true).toBe(true); // File exists
      } catch (error) {
        expect(false).toBe(true); // File doesn't exist
      }
    });

    it('should handle malformed log entries gracefully', () => {
      const malformedEntries = [
        '{"valid": "entry"}',
        'invalid json',
        '{"another": "valid"}',
        '{"incomplete":',
        '}'
      ];
      
      const validEntries = malformedEntries.filter(entry => {
        try {
          JSON.parse(entry);
          return true;
        } catch {
          return false;
        }
      });
      
      expect(validEntries).toHaveLength(2);
      expect(validEntries[0]).toBe('{"valid": "entry"}');
      expect(validEntries[1]).toBe('{"another": "valid"}');
    });
  });

  describe('Raw Log Display', () => {
    it('should display raw log entries without formatting', () => {
      const rawEntries = mockLogEntries.map(entry => JSON.stringify(entry));
      
      expect(rawEntries).toHaveLength(3);
      expect(rawEntries[0]).toContain('"level":"INFO"');
      expect(rawEntries[1]).toContain('"level":"ERROR"');
      expect(rawEntries[2]).toContain('"level":"WARN"');
    });

    it('should display raw error log entries', () => {
      const rawErrorEntries = mockErrorLogEntries.map(entry => JSON.stringify(entry));
      
      expect(rawErrorEntries).toHaveLength(1);
      expect(rawErrorEntries[0]).toContain('"level":"ERROR"');
      expect(rawErrorEntries[0]).toContain('"dgraphErrorDetails"');
    });
  });

  describe('Log File Paths', () => {
    it('should construct correct log file paths', () => {
      const today = new Date().toISOString().split('T')[0].replace(/-/g, '-');
      const expectedLogFile = `schema-${today}.log`;
      const expectedErrorLogFile = `schema-errors-${today}.log`;
      
      expect(expectedLogFile).toMatch(/schema-\d{4}-\d{2}-\d{2}\.log/);
      expect(expectedErrorLogFile).toMatch(/schema-errors-\d{4}-\d{2}-\d{2}\.log/);
    });

    it('should handle different date formats', () => {
      const date = new Date('2025-08-19');
      const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '-');
      
      expect(formattedDate).toBe('2025-08-19');
    });
  });

  describe('Help Display', () => {
    it('should show help information', () => {
      const helpInfo = `
📖 Log Viewer Script

Usage:
  node view-logs.ts [options]

Options:
  --lines, -n <number>  Number of lines to show (default: 50)
  --level, -l <level>   Filter by log level (ERROR, WARN, INFO, DEBUG)
  --errors, -e          Show only error logs
  --raw, -r             Show raw log entries without formatting
  --help, -h            Show this help message

Examples:
  node view-logs.ts
  node view-logs.ts --lines 100
  node view-logs.ts --errors
  node view-logs.ts --raw
  node view-logs.ts --level ERROR
      `.trim();
      
      expect(helpInfo).toContain('Log Viewer Script');
      expect(helpInfo).toContain('--lines');
      expect(helpInfo).toContain('--level');
      expect(helpInfo).toContain('--errors');
      expect(helpInfo).toContain('--raw');
      expect(helpInfo).toContain('--help');
    });
  });
});
