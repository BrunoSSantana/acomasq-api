import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/infra/http/nest/@config/http-filter-exception';

async function bootstrap() {
  /* Set config initial */
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  /* Add consts */
  const GLOBAL_PREFIX = configService.getOrThrow<string>('GLOBAL_PREFIX');
  const SWAGGER_PREFIX = configService.getOrThrow<string>('SWAGGER_PREFIX');
  const API_PORT = configService.getOrThrow<number>('API_PORT');

  /* Set endpoint */
  app.setGlobalPrefix(GLOBAL_PREFIX);

  /* Swagger Setup */
  const config = new DocumentBuilder()
    .setTitle('ACOMASQ API')
    .setDescription(
      'API criada para dacastrar usuarios e pagamentos de agua na ACOMASQ',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PREFIX, app, document);

  /* Set validation config */

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  /* Running API */
  await app.listen(API_PORT, () => {
    Logger.log(`Listening at http://localhost:${API_PORT}/${GLOBAL_PREFIX}`);
    Logger.log(
      `Swagger Documentation at http://localhost:${API_PORT}/${SWAGGER_PREFIX}`,
    );
  });
}
bootstrap();
