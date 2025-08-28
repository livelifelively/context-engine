import { Module } from '@nestjs/common';
import { StartContextEngineController } from './start-context-engine.controller';
import { StartContextEngineService } from './start-context-engine.service';

@Module({
  controllers: [StartContextEngineController],
  providers: [StartContextEngineService]
})
export class StartContextEngineModule {}
