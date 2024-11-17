import { PrismaService } from "@/infra/repositories/prisma/prisma.service";
import { createTestApp } from "@/test-utils";
import { generateUserData } from "@/test-utils/factories";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

describe("[POST] /api/users", () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let userData: { username: string; password: string };

  beforeEach(async () => {
    const testSetup = await createTestApp();

    app = testSetup.app;
    prismaService = testSetup.prismaService;

    userData = generateUserData();

    await prismaService.user.deleteMany();

    await app.init();
  });

  afterEach(async () => {
    await prismaService.user.deleteMany();
  });

  it("should create a user successfully", async () => {
    const { password, username } = userData;

    await request(app.getHttpServer())
      .post("/api/users")
      .send({ username, password })
      .expect(204);

    const user = await prismaService.user.findFirst({
      where: { username },
    });

    expect(user).not.toBeNull();
    expect(user?.username).toBe(username);

    expect(user?.password).not.toBe(password);
    expect(user?.password).toMatch(/^\$2[ayb]\$.{56}$/); // Regex para verificar hash bcrypt
  });

  describe("Error Cases", () => {
    it("should return 400 for missing username", async () => {
      const { password } = userData;

      const response = await request(app.getHttpServer())
        .post("/api/users")
        .send({ password })
        .expect(400);

      expect(response.body.message).toContain(
        'Validation error: Required at "username"',
      );
    });

    it("should return 400 for missing password", async () => {
      const { username } = userData;

      const response = await request(app.getHttpServer())
        .post("/api/users")
        .send({ username })
        .expect(400);

      expect(response.body.message).toContain(
        'Validation error: Required at "password"',
      );
    });

    it("should return 409 for duplicate username", async () => {
      const { username, password } = userData;

      await prismaService.user.create({
        data: { username, password },
      });

      const response = await request(app.getHttpServer())
        .post("/api/users")
        .send({ username, password })
        .expect(409);

      expect(response.body.message).toBe(
        "Já existe um usuário com esse username",
      );
    });
  });
});
