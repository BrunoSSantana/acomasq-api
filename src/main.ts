import "module-alias/register";
import { AppModule } from "@/app.module";
import {
  generateApiReference,
  generateSwaggerConfig,
} from "@/infra/documentation/swagger";
import {
  HttpExceptionFilter,
  PrismaClientExceptionFilter,
} from "@/infra/http/nest/@config/filter-exceptions";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { Env } from "./env";

async function bootstrap() {
  /* Set config initial */
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<Env, true> = app.get(ConfigService);

  /* Set constants */
  const GLOBAL_PREFIX = configService.get("GLOBAL_PREFIX");
  const SWAGGER_PREFIX = configService.get("SWAGGER_PREFIX");
  const JSON_DOCUMENT_URL = "/docs/openapi";
  const API_PROTOCOL = configService.get("API_PROTOCOL");
  const API_HOST = configService.get("API_HOST");
  const API_PORT = configService.get("API_PORT");

  /* Set endpoint */
  app.setGlobalPrefix(GLOBAL_PREFIX);

  /* Swagger Setup */
  const config = generateSwaggerConfig(API_PROTOCOL, API_HOST, API_PORT);
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: JSON_DOCUMENT_URL,
  };
  SwaggerModule.setup(SWAGGER_PREFIX, app, document, customOptions);

  /* Set validation config */
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(),
    new HttpExceptionFilter(),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  /* Running API */
  await app.listen(API_PORT, () => {
    Logger.log(`Listening at ${API_PROTOCOL}://${API_HOST}:${API_PORT}/${GLOBAL_PREFIX}`);
    Logger.log(
      `Swagger Documentation at ${API_PROTOCOL}://${API_HOST}:${API_PORT}/${SWAGGER_PREFIX}`,
    );
  });
}
bootstrap();
