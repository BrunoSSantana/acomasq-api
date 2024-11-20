import { CreateUserService } from "@/domains/auth/services";
import { PrismaService } from "@/infra/repositories/prisma/prisma.service";
import { createTestApp } from "@/test-utils";
import { generatePaymentData, generateUserData } from "@/test-utils/factories";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

async function authenticationUser(app: INestApplication) {
  const createUserService = app.get(CreateUserService);

  const userData = generateUserData();

  await createUserService.execute({
    username: userData.username,
    password: userData.password,
  });

  const response = await request(app.getHttpServer())
    .post("/api/auth/session")
    .send({
      username: userData.username,
      password: userData.password,
    })
    .expect(201);

  return { token: response.body.access_token };
}

async function generateAssociate(prismaService: PrismaService) {
  const associate = await prismaService.associate.create({
    data: {
      name: "Test Associate",
    },
  });

  return { id: associate.id };
}

describe("Create Payment Endpoint [POST] /api/payments", () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let token: string;
  let associateId: string;
  let paymentData: {
    month: number;
    year: number;
    associateId: string;
  };

  beforeEach(async () => {
    const testSetup = await createTestApp();

    app = testSetup.app;
    prismaService = testSetup.prismaService;

    token = (await authenticationUser(app)).token;
    associateId = (await generateAssociate(prismaService)).id;

    paymentData = generatePaymentData(associateId);

    await app.init();
  });

  afterAll(async () => {
    await prismaService.payment.deleteMany();
  });

  it("should create a payment successfully", async () => {
    const response = await request(app.getHttpServer())
      .post("/api/payments")
      .set("authorization", `Bearer ${token}`)
      .send(paymentData)
      .expect(201);

    // Verifica no banco de dados
    const payment = await prismaService.payment.findFirst({
      where: {
        associateId: paymentData.associateId,
        month: paymentData.month,
        year: paymentData.year,
      },
    });

    expect(payment).not.toBeNull();
    expect(payment?.month).toBe(paymentData.month);
    expect(payment?.year).toBe(paymentData.year);
    expect(payment?.associateId).toBe(paymentData.associateId);
  });

  describe("Error cases", () => {
    it("should return 401 when authentication token is missing", async () => {
      await request(app.getHttpServer())
        .post("/api/payments")
        .send(paymentData)
        .expect(401);
    });

    it("should return 400 when required fields are missing", async () => {
      const invalidPaymentData = {
        year: 2024,
        associateId: "test-associate-id",
      };

      const response = await request(app.getHttpServer())
        .post("/api/payments")
        .set("Authorization", `Bearer ${token}`)
        .send(invalidPaymentData)
        .expect(400);

      // Valida estrutura da resposta de erro
      expect(response.body).toMatchObject({
        statusCode: 400,
        message: expect.stringContaining(
          'Validation error: Required at "month"; Invalid uuid at "associateId"',
        ),
      });
    });

    it("should return 409 for duplicate payment", async () => {
      // Cria o primeiro pagamento
      await prismaService.payment.create({
        data: paymentData,
      });

      // Tenta criar o mesmo pagamento novamente
      const response = await request(app.getHttpServer())
        .post("/api/payments")
        .set("Authorization", `Bearer ${token}`)
        .send(paymentData)
        .expect(409);

      // Valida resposta de conflito
      expect(response.body).toMatchObject({
        statusCode: 409,
        message: "Já existe um pagamento para esse mês",
      });
    });
  });
});
