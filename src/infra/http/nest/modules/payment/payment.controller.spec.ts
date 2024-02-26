import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import {
  CreatePaymentService,
  FindPaymentByIdService,
  ListPaymentService,
  UpdatePaymentService,
  DeletePaymentByIdService,
} from '@/domains/payment/services';
import { PaymentController } from '@/infra/http/nest/modules/payment/payment.controller';

describe('PaymentController', () => {
  let controller: PaymentController;

  const mockCreatePaymentService = {};
  const mockFindPaymentByIdService = {};
  const mockListPaymentService = {};
  const mockUpdatePaymentService = {};
  const mockDeletePaymentByIdService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        CreatePaymentService,
        FindPaymentByIdService,
        ListPaymentService,
        UpdatePaymentService,
        DeletePaymentByIdService,
      ],
    })
      .overrideProvider(CreatePaymentService)
      .useValue(mockCreatePaymentService)
      .overrideProvider(UpdatePaymentService)
      .useValue(mockUpdatePaymentService)
      .overrideProvider(FindPaymentByIdService)
      .useValue(mockFindPaymentByIdService)
      .overrideProvider(ListPaymentService)
      .useValue(mockListPaymentService)
      .overrideProvider(DeletePaymentByIdService)
      .useValue(mockDeletePaymentByIdService)
      .compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
