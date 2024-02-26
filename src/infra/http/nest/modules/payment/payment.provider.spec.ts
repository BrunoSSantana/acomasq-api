import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '@/infra/http/nest/modules/payment/payment.provider';
import { describe, beforeEach, it, expect } from 'vitest';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, PrismaService],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    service.create({
      year: 2023,
      associateId: 'associate-id',
      month: 1,
    });
  });
});
