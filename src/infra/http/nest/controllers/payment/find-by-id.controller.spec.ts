import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";

import { FindPaymentByIdService } from "@/domains/payment/services";
import { FindByIdPaymentController } from "@/infra/http/nest/controllers/payment";

describe("PaymentController", () => {
  let controller: FindByIdPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindByIdPaymentController],
      providers: [FindPaymentByIdService],
    }).compile();

    controller = await module.resolve(FindPaymentByIdService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
