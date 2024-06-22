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
import { SwaggerModule } from "@nestjs/swagger";
import { Env } from "./env";

async function bootstrap() {
  /* Set config initial */
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService<Env, true> = app.get(ConfigService);

  /* Set constants */
  const GLOBAL_PREFIX = configService.get("GLOBAL_PREFIX");
  const SWAGGER_PREFIX = configService.get("SWAGGER_PREFIX");
  const API_PORT = configService.get("API_PORT");

  /* Set endpoint */
  app.setGlobalPrefix(GLOBAL_PREFIX);

  /* Swagger Setup */
  const config = generateSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);
  app.use(`/${SWAGGER_PREFIX}`, generateApiReference(document));

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
