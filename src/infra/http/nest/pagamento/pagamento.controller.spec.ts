import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoController } from '@/infra/http/nest/pagamento/pagamento.controller';
import { PagamentoService } from '@/infra/http/nest/pagamento/pagamento.service';

describe('PagamentoController', () => {
  let controller: PagamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentoController],
      providers: [PagamentoService],
    }).compile();

    controller = module.get<PagamentoController>(PagamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
