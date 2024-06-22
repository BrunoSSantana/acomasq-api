import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";

import { CreatePaymentService } from "@/domains/payment/services";
import { CreatePaymentController } from "@/infra/http/nest/controllers/payment";

describe("PaymentController", () => {
  let controller: CreatePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatePaymentController],
      providers: [CreatePaymentService],
    }).compile();

    controller = await module.resolve(CreatePaymentService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
