import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { GenerateTokenController } from '@/infra/http/nest/controllers/auth/generate-token.controller';

import { CreateSessionService } from '@/domains/auth/services';

describe('PaymentController', () => {
  let controller: CreateSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerateTokenController],
      providers: [CreateSessionService],
    }).compile();

    controller = await module.resolve(CreateSessionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
