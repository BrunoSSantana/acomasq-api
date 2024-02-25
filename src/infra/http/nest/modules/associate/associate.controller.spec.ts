import { Test, TestingModule } from '@nestjs/testing';

import { describe, beforeEach, it, expect } from 'vitest';
import { AssociateController } from './associate.controller';

describe('AssociateController', () => {
  let controller: AssociateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociateController],
    }).compile();

    controller = module.get<AssociateController>(AssociateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
