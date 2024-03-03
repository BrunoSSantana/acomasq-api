import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { CreatePaymentService } from '@/domains/payment/services';
import { CreatePaymentController } from '@/infra/http/nest/controllers/payment';

describe('PaymentController', () => {
  let controller: CreatePaymentController;

  const mockCreatePaymentService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatePaymentController],
      providers: [CreatePaymentService],
    })
      .overrideProvider(CreatePaymentService)
      .useValue(mockCreatePaymentService)
      .compile();

    controller = module.get<CreatePaymentController>(CreatePaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
