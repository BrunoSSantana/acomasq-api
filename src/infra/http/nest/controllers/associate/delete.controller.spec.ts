import { Test, TestingModule } from '@nestjs/testing';

import { describe, beforeEach, it, expect } from 'vitest';
import { DeleteAssociateController } from './delete.controller';
import {
  CreateAssociateService,
  UpdateAssociateService,
  ListAssociateService,
  DeleteAssociateByIdService,
  FindAssociateByIdService,
} from '@/domains/associate/services';

describe('AssociateController', () => {
  let controller: DeleteAssociateController;

  const mockDeleteAssociateByIdService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteAssociateController],
      providers: [
        CreateAssociateService,
        UpdateAssociateService,
        ListAssociateService,
        DeleteAssociateByIdService,
        FindAssociateByIdService,
      ],
    })
      .overrideProvider(DeleteAssociateByIdService)
      .useValue(mockDeleteAssociateByIdService)
      .compile();

    controller = module.get<DeleteAssociateController>(
      DeleteAssociateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
