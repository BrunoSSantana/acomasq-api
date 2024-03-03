import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { CreateUserService } from '@/domains/auth/services';
import { CreateUserController } from '@/infra/http/nest/controllers/auth/create-user.controller';

describe('PaymentController', () => {
  let controller: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [CreateUserService],
    }).compile();

    controller = await module.resolve(CreateUserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
