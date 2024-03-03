import { Test } from '@nestjs/testing';

import { describe, beforeEach, it, expect } from 'vitest';
import { CreateAssociateController } from './create.controller';
import { CreateAssociateService } from '@/domains/associate/services';

describe('AssociateController', () => {
  let controller: CreateAssociateController;

  beforeEach(async () => {
    const moduleCreateAssociateController = await Test.createTestingModule({
      controllers: [CreateAssociateController],
      providers: [CreateAssociateService],
    }).compile();

    controller = await moduleCreateAssociateController.resolve(
      CreateAssociateService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
