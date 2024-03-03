import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { UpdatePaymentService } from '@/domains/payment/services';
import { UpdatePaymentController } from '@/infra/http/nest/controllers/payment';

describe('PaymentController', () => {
  let controller: UpdatePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdatePaymentController],
      providers: [UpdatePaymentService],
    }).compile();

    controller = await module.resolve(UpdatePaymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
