import { Module } from '@nestjs/common';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';
import { PagamentoService } from '@/infra/http/nest/pagamento/pagamento.service';
import { PagamentoController } from '@/infra/http/nest/pagamento/pagamento.controller';

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
