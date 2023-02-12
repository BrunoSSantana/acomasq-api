import { Module } from '@nestjs/common';
import { PagamentoService } from '../../../../infra/http/nest/pagamento/pagamento.service';
import { PagamentoController } from '../../../../infra/http/nest/pagamento/pagamento.controller';
import { PrismaService } from '../../../../infra/repositories/prisma/prisma.service';

@Module({
  controllers: [PagamentoController],
  providers: [
    {
      provide: PagamentoService,
      useFactory: (prisma) => new PagamentoService(prisma),
      inject: [PrismaService],
    },
    PrismaService,
  ],
})
export class PagamentoModule {}
