import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { DeletePaymentController } from '@/infra/http/nest/controllers/payment';
import { DeletePaymentByIdService } from '@/domains/payment/services';

describe('PaymentController', () => {
  let controller: DeletePaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeletePaymentController],
      providers: [DeletePaymentByIdService],
    }).compile();

    controller = await module.resolve(DeletePaymentByIdService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
