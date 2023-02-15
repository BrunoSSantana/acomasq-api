import { Test, TestingModule } from '@nestjs/testing';
import { AssociadoService } from '@/infra/http/nest/associado/associado.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('AssociadoService', () => {
  let service: AssociadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociadoService],
    }).compile();

    service = module.get<AssociadoService>(AssociadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
