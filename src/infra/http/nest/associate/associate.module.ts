import { Module } from '@nestjs/common';

import { PrismaService } from '@/infra/repositories/prisma/prisma.service';
// import { AssociateService } from '@/infra/http/nest/associate/associate.service';
import { AssociateController } from '@/infra/http/nest/associate/associate.controller';
import { CreateAssociateService } from '@/domains/associate/services/create-associate.service';
import { PrismaAssociateRepository } from '@/infra/repositories/prisma/domains/prisma-asssociate.repository';
import { UpdateAssociateService } from '@/domains/associate/services/update-associate.service';
import { ListAssociateService } from '@/domains/associate/services/list-associate.service';
import { FindAssociateByIdService } from '@/domains/associate/services/find-associate-by-id.service';
import { DeleteAssociateByIdService } from '@/domains/associate/services/delete-associate-by-id.service';

@Module({
  controllers: [AssociateController],
  providers: [
    // {
    //   provide: AssociateService,
    //   useFactory: (prisma) => new AssociateService(prisma),
    //   inject: [PrismaService],
    // },
    // PrismaService,

    {
      provide: CreateAssociateService,
      useFactory: (repository) => new CreateAssociateService(repository),
      inject: [PrismaAssociateRepository],
    },
    {
      provide: UpdateAssociateService,
      useFactory: (repository) => new UpdateAssociateService(repository),
      inject: [PrismaAssociateRepository],
    },
    {
      provide: ListAssociateService,
      useFactory: (repository) => new ListAssociateService(repository),
      inject: [PrismaAssociateRepository],
    },
    {
      provide: FindAssociateByIdService,
      useFactory: (repository) => new FindAssociateByIdService(repository),
      inject: [PrismaAssociateRepository],
    },
    {
      provide: DeleteAssociateByIdService,
      useFactory: (repository) => new DeleteAssociateByIdService(repository),
      inject: [PrismaAssociateRepository],
    },
    {
      provide: PrismaAssociateRepository,
      useFactory: (prismaService) =>
        new PrismaAssociateRepository(prismaService),
      inject: [PrismaService],
    },
    PrismaService,
  ],
})
export class AssociateModule {}
