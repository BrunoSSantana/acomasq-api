import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";

import { DeletePaymentByIdService } from "@/domains/payment/services";
import { DeletePaymentController } from "@/infra/http/nest/controllers/payment";

describe("PaymentController", () => {
  let controller: DeletePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeletePaymentController],
      providers: [DeletePaymentByIdService],
    }).compile();

    controller = await module.resolve(DeletePaymentByIdService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
