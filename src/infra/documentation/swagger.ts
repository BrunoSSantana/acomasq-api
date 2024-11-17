import { DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";

export const generateSwaggerConfig = (
  protocol: string,
  host: string,
  port: number,
) =>
  new DocumentBuilder()
    .setTitle("ACOMASQ API")
    .setDescription(
      "API criada para cadastro e gerenciamento de usuários e pagamentos de água na ACOMASQ",
    )
    .setVersion("0.0.1")
    .addServer(`${protocol}://${host}:${port}`, "DEV", {
      DEV: {
        description: "dev environment to use on development",
        default: false,
      },
    })
    .setExternalDoc(
      "OpenAPI json",
      `${protocol}://${host}:${port}/docs/openapi`,
    )
    .addBearerAuth()
    .build();

export const generateApiReference = (document: OpenAPIObject) =>
  apiReference({
    theme: "bluePlanet",
    darkMode: true,
    layout: "classic",
    hideModels: false,
    showSidebar: true,
    spec: {
      content: document,
    },
  });
