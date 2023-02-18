import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '@/infra/http/nest/payment/payment.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    const createPaymentrespose = service.create({
      year: 2023,
      associateId: 'associate-id',
      month: 1,
    });
  });
});
