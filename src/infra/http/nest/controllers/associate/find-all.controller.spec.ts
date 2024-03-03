import { Test } from '@nestjs/testing';

import { describe, beforeEach, it, expect } from 'vitest';
import { FindAllAssociateController } from './find-all.controller';
import { ListAssociateService } from '@/domains/associate/services';

describe('AssociateController', () => {
  let controller: FindAllAssociateController;

  beforeEach(async () => {
    const moduleFindAllAssociateController = await Test.createTestingModule({
      controllers: [FindAllAssociateController],
      providers: [ListAssociateService],
    }).compile();

    controller =
      await moduleFindAllAssociateController.resolve(ListAssociateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
