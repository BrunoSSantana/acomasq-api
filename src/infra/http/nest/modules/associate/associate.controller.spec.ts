import { Test, TestingModule } from '@nestjs/testing';
import { AssociateController } from '@/infra/http/nest/associate/associate.controller';
import { AssociateService } from '@/infra/http/nest/associate/associate.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('AssociateController', () => {
  let controller: AssociateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociateController],
      providers: [AssociateService],
    }).compile();

    controller = module.get<AssociateController>(AssociateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
