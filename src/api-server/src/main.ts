import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Global prefix for all routes
  app.setGlobalPrefix('api');
  
  // Add global logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 API Server running on port ${port}`);
}

bootstrap();
