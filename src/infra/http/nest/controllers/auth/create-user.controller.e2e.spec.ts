import { AppModule } from "@/app.module";
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
import { beforeEach, describe, expect, it } from "vitest";

describe("Create User Route", () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

  it("/api/users (POST)", async () => {
    await request(app.getHttpServer())
      .post("/api/users")
      .send({
        username: "test",
        password: "123456",
      })
      .expect(204);

    const user = await prismaService.user.findFirst({
      where: {
        username: "test",
      },
    });

    expect(user).not.toBeNull();
    expect(user?.username).toBe("test");
  });
});
