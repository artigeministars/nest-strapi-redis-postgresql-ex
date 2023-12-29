import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  app.enableCors({
     origin: "*",
     methods: ["GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"],
     preflightContinue: false,
     optionsSuccessStatus: 200,
     credentials: false
  });

  await app.listen(3000);
}
bootstrap();
