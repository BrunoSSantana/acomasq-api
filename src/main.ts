import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const API_PORT = configService.getOrThrow<number>('API_PORT');

  await app.listen(API_PORT);
}
bootstrap();
