import { CreateUserService } from "@/domains/auth/services";
import { PrismaService } from "@/infra/repositories/prisma/prisma.service";
import { createTestApp } from "@/test-utils/create_test_app";
import { generateUserData } from "@/test-utils/factories";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { beforeEach, describe, it } from "vitest";

describe("[POST] /api/auth/session", () => {
  let app: INestApplication;
  let createUserService: CreateUserService;
  let prismaService: PrismaService;
  let userData: { username: string; password: string };

  beforeEach(async () => {
    const testSetup = await createTestApp();

    app = testSetup.app;
    prismaService = testSetup.prismaService;
    createUserService = app.get(CreateUserService);

    userData = generateUserData();

    await prismaService.user.deleteMany();

    await app.init();
  });

  afterEach(async () => {
    await prismaService.user.deleteMany();
  });

  it("should authenticate successfully", async () => {
    const { password, username } = userData;
    await createUserService.execute({
      username,
      password,
    });

    const response = await request(app.getHttpServer())
      .post("/api/auth/session")
      .send({
        username,
        password,
      })
      .expect(201);

    expect(response.body).toHaveProperty("access_token");
  });

  describe("Invalid Credentials", async () => {
    it("should return 401 when user does not exist", async () => {
      const { password, username } = userData;
      await request(app.getHttpServer())
        .post("/api/auth/session")
        .send({
          username,
          password,
        })
        .expect(401);
    });

    it("should return 401 for password mismatch", async () => {
      const { password, username } = userData;

      await createUserService.execute({
        username,
        password,
      });

      const response = await request(app.getHttpServer())
        .post("/api/auth/session")
        .send({
          username,
          password: "wrongpassword",
        })
        .expect(401);

      expect(response.body.name).toBe("UnauthorizedException");
      expect(response.body.message).toBe("Credenciais inválidas");
      expect(response.body.statusCode).toBe(401);
    });

    it("should return 400 when username is missing", async () => {
      const { password } = userData;
      const response = await request(app.getHttpServer())
        .post("/api/auth/session")
        .send({ password })
        .expect(400);

      expect(response.body.message).toContain(
        'Validation error: Required at "username"',
      );
    });
  });
});
