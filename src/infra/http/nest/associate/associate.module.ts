import { Module } from '@nestjs/common';
import { AssociateService } from '@/infra/http/nest/associate/associate.service';
import { AssociateController } from '@/infra/http/nest/associate/associate.controller';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';

@Module({
  controllers: [AssociateController],
  providers: [
    {
      provide: AssociateService,
      useFactory: (prisma) => new AssociateService(prisma),
      inject: [PrismaService],
    },
    PrismaService,
  ],
})
export class AssociateModule {}
