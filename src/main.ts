import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  const GLOBAL_PREFIX = configService.getOrThrow<string>('GLOBAL_PREFIX');
  const SWAGGER_PREFIX = configService.getOrThrow<string>('SWAGGER_PREFIX');
  const API_PORT = configService.getOrThrow<number>('API_PORT');

  app.setGlobalPrefix(GLOBAL_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('ACOMASQ API')
    .setDescription(
      'API criada para dacastrar usuarios e pagamentos de agua na ACOMASQ',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PREFIX, app, document);

  await app.listen(API_PORT, () => {
    Logger.log(`Listening at http://localhost:${API_PORT}/${GLOBAL_PREFIX}`);
    Logger.log(
      `Swagger Documentation at http://localhost:${API_PORT}/${SWAGGER_PREFIX}`,
    );
  });
}
bootstrap();
