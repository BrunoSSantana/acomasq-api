import { Test } from '@nestjs/testing';

import { describe, beforeEach, it, expect } from 'vitest';
import { UpdateAssociateController } from './update.controller';
import { UpdateAssociateService } from '@/domains/associate/services';

describe('AssociateController', () => {
  let controller: UpdateAssociateController;

  beforeEach(async () => {
    const moduleUpdateAssociateController = await Test.createTestingModule({
      controllers: [UpdateAssociateController],
      providers: [UpdateAssociateService],
    }).compile();

    controller = await moduleUpdateAssociateController.resolve(
      UpdateAssociateService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
