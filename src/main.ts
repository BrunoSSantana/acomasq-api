import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import {
  HttpExceptionFilter,
  PrismaClientExceptionFilter,
} from '@/infra/http/nest/@config/filter-exceptions';
import { ServerVariableObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Env } from './env';

const nodeEnvServerVariable: ServerVariableObject = {
  default: 'dev',
  description: 'Node env variable',
  enum: ['test', 'dev', 'prod'],
};

const serversVariable = { NODE_ENV: nodeEnvServerVariable };

async function bootstrap() {
  /* Set config initial */
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<Env, true> = app.get(ConfigService);

  /* Add consts */
  const GLOBAL_PREFIX = configService.get('GLOBAL_PREFIX');
  const SWAGGER_PREFIX = configService.get('SWAGGER_PREFIX');
  const API_PORT = configService.get('API_PORT');

  /* Set endpoint */
  app.setGlobalPrefix(GLOBAL_PREFIX);

  /* Swagger Setup */
  const config = new DocumentBuilder()
    .setTitle('ACOMASQ API')
    .setDescription(
      'API criada para cadastro e gerenciamento de usuários e pagamentos de água na ACOMASQ',
    )
    .setVersion('0.0.1')
    .addServer(`http://localhost:3003`, 'DEV', serversVariable)
    .addServer('https://acomasq-api.com', 'STAGE', serversVariable)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER_PREFIX, app, document);

  /* Set validation config */
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(),
    new HttpExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

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
