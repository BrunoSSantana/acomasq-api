import { Test, TestingModule } from '@nestjs/testing';
import { AssociadoController } from '@/infra/http/nest/associado/associado.controller';
import { AssociadoService } from '@/infra/http/nest/associado/associado.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('AssociadoController', () => {
  let controller: AssociadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociadoController],
      providers: [AssociadoService],
    }).compile();

    controller = module.get<AssociadoController>(AssociadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
