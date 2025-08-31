import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { GreetModule } from './modules/greet/greet.module';
import { StartContextEngineModule } from './modules/start-context-engine/start-context-engine.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    HealthModule,
    GreetModule,
    StartContextEngineModule,
  ],
})
export class AppModule {}
