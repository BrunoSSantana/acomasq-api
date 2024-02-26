import { Test, TestingModule } from '@nestjs/testing';

import { describe, beforeEach, it, expect } from 'vitest';
import { AssociateController } from './associate.controller';
import {
  CreateAssociateService,
  UpdateAssociateService,
  ListAssociateService,
  DeleteAssociateByIdService,
  FindAssociateByIdService,
} from '@/domains/associate/services';

describe('AssociateController', () => {
  let controller: AssociateController;

  const mockCreateAssociateService = {};
  const mockUpdateAssociateService = {};
  const mockListAssociateService = {};
  const mockDeleteAssociateByIdService = {};
  const mockFindAssociateByIdService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociateController],
      providers: [
        CreateAssociateService,
        UpdateAssociateService,
        ListAssociateService,
        DeleteAssociateByIdService,
        FindAssociateByIdService,
      ],
    })
      .overrideProvider(CreateAssociateService)
      .useValue(mockCreateAssociateService)
      .overrideProvider(UpdateAssociateService)
      .useValue(mockUpdateAssociateService)
      .overrideProvider(ListAssociateService)
      .useValue(mockListAssociateService)
      .overrideProvider(DeleteAssociateByIdService)
      .useValue(mockDeleteAssociateByIdService)
      .overrideProvider(FindAssociateByIdService)
      .useValue(mockFindAssociateByIdService)
      .compile();

    controller = module.get<AssociateController>(AssociateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
