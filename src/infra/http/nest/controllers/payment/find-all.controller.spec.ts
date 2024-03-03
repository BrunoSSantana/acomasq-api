import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { ListPaymentService } from '@/domains/payment/services';
import { FindAllPaymentController } from '@/infra/http/nest/controllers/payment';

describe('PaymentController', () => {
  let controller: FindAllPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindAllPaymentController],
      providers: [ListPaymentService],
    }).compile();

    controller = await module.resolve(ListPaymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
