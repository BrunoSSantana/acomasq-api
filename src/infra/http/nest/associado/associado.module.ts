import { Module } from '@nestjs/common';
import { AssociadoService } from '@/infra/http/nest/associado/associado.service';
import { AssociadoController } from '@/infra/http/nest/associado/associado.controller';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';

@Module({
  controllers: [AssociadoController],
  providers: [
    {
      provide: AssociadoService,
      useFactory: (prisma) => new AssociadoService(prisma),
      inject: [PrismaService],
    },
    PrismaService,
  ],
})
export class AssociadoModule {}
