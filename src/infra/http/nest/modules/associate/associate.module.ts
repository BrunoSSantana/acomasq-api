import { Module } from '@nestjs/common';

import { PrismaService } from '@/infra/repositories/prisma/prisma.service';
import {
  CreateAssociateController,
  DeleteAssociateController,
  FindAllAssociateController,
  FindByIdAssociateController,
  UpdateAssociateController,
} from '@/infra/http/nest/modules/associate';
import { CreateAssociateService } from '@/domains/associate/services/create-associate.service';
import { UpdateAssociateService } from '@/domains/associate/services/update-associate.service';
import { ListAssociateService } from '@/domains/associate/services/list-associate.service';
import { FindAssociateByIdService } from '@/domains/associate/services/find-associate-by-id.service';
import { DeleteAssociateByIdService } from '@/domains/associate/services/delete-associate-by-id.service';
import { AssociateRepositoryPrismaAdapter } from '@/infra/repositories/prisma/domains/associate';

@Module({
  controllers: [
    CreateAssociateController,
    DeleteAssociateController,
    FindAllAssociateController,
    FindByIdAssociateController,
    UpdateAssociateController,
  ],
  providers: [
    {
      provide: CreateAssociateService,
      useFactory: (repository) => new CreateAssociateService(repository),
      inject: [AssociateRepositoryPrismaAdapter],
    },
    {
      provide: UpdateAssociateService,
      useFactory: (repository) => new UpdateAssociateService(repository),
      inject: [AssociateRepositoryPrismaAdapter],
    },
    {
      provide: ListAssociateService,
      useFactory: (repository) => new ListAssociateService(repository),
      inject: [AssociateRepositoryPrismaAdapter],
    },
    {
      provide: FindAssociateByIdService,
      useFactory: (repository) => new FindAssociateByIdService(repository),
      inject: [AssociateRepositoryPrismaAdapter],
    },
    {
      provide: DeleteAssociateByIdService,
      useFactory: (repository) => new DeleteAssociateByIdService(repository),
      inject: [AssociateRepositoryPrismaAdapter],
    },
    {
      provide: AssociateRepositoryPrismaAdapter,
      useFactory: (prismaService) =>
        new AssociateRepositoryPrismaAdapter(prismaService),
      inject: [PrismaService],
    },
    PrismaService,
  ],
})
export class AssociateModule {}
