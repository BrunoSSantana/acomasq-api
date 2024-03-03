import { Test } from '@nestjs/testing';

import { describe, beforeEach, it, expect } from 'vitest';
import { DeleteAssociateController } from './delete.controller';
import { DeleteAssociateByIdService } from '@/domains/associate/services';

describe('AssociateController', () => {
  let controller: DeleteAssociateController;

  beforeEach(async () => {
    const moduleDeleteAssociateController = await Test.createTestingModule({
      controllers: [DeleteAssociateController],
      providers: [DeleteAssociateByIdService],
    }).compile();

    controller = await moduleDeleteAssociateController.resolve(
      DeleteAssociateByIdService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
