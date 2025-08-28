import { Controller, Get } from '@nestjs/common';
import { StartContextEngineService } from './start-context-engine.service';

@Controller('start-context-engine')
export class StartContextEngineController {
  constructor(private readonly startContextEngineService: StartContextEngineService) {}

  @Get()
  startContextEngine(): string {
    return this.startContextEngineService.startContextEngine();
  }
}
