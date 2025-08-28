import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StartContextEngineService {
  startContextEngine(): string {
    try {
      const filePath = path.join(process.cwd(), '..', '..', 'reference-docs', 'ddd-2-refactored.md');
      const content = fs.readFileSync(filePath, 'utf8');
      return content;
    } catch (error) {
      return `Error reading ddd-2-refactored.md: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
}
