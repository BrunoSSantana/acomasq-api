import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '@/infra/http/nest/payment/payment.controller';
import { PaymentService } from '@/infra/http/nest/payment/payment.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
