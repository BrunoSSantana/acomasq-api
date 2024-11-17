import { AppModule } from "@/app.module";
import { CreateUserService } from "@/domains/auth/services";
import { Env } from "@/env";
import {
  HttpExceptionFilter,
  PrismaClientExceptionFilter,
} from "@/infra/http/nest/@config/filter-exceptions";
import { PrismaService } from "@/infra/repositories/prisma/prisma.service";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { beforeEach, describe, it } from "vitest";

describe("Generate Token Route", () => {
  let app: INestApplication;
  let createUserService: CreateUserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    createUserService = await moduleFixture.get(CreateUserService);
    prismaService = await moduleFixture.get(PrismaService);
    const configService: ConfigService<Env, true> = app.get(ConfigService);
    const GLOBAL_PREFIX = configService.get("GLOBAL_PREFIX");

    app.setGlobalPrefix(GLOBAL_PREFIX);
    app.useGlobalFilters(
      new PrismaClientExceptionFilter(),
      new HttpExceptionFilter(),
    );

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    app.enableCors();

    await prismaService.user.deleteMany();

    await app.init();
  });

  afterEach(async () => {
    await prismaService.user.deleteMany();
  });

  it("api/auth (POST)", async () => {
    await createUserService.execute({
      username: "test",
      password: "123456",
    });

    await request(app.getHttpServer())
      .post("/api/auth")
      .send({
        username: "test",
        password: "123456",
      })
      .expect(201);
  });

  it("api/auth (POST) - error", async () => {
    await request(app.getHttpServer())
      .post("/api/auth")
      .send({
        username: "test",
        password: "123456",
      })
      .expect(400);
  });
});
