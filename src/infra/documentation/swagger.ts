import { DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";

export const generateSwaggerConfig = () =>
  new DocumentBuilder()
    .setTitle("ACOMASQ API")
    .setDescription(
      "API criada para cadastro e gerenciamento de usuários e pagamentos de água na ACOMASQ",
    )
    .setVersion("0.0.1")
    .addServer(`http://localhost:3003`, "DEV", {
      DEV: {
        description: "dev environment to use on development",
        default: false,
      },
    })
    .addServer("https://acomasq-api.com", "STAGE", {
      STAGE: { description: "stage environment", default: true },
    })
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
