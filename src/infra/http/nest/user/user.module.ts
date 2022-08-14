import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaRepository } from '@/infra/repositories/prisma/prisma.repository';
import { ListUserController } from '@/domains/user/implementations/controllers/list-user-controller';
import { IListUsersUseCase } from '@/domains/user/contracts/user-usecases';
import { ListUsersUseCase } from '@/domains/user/implementations/usecases/user-list-usecase';
import { IListUsersRepository } from '@/domains/user/contracts/user-repositories';
import { ListUsersRepository } from '@/domains/user/implementations/repositories/prisma/user-list-repository';

@Module({
  controllers: [UserController],
  providers: [
    PrismaRepository,
    {
      provide: ListUserController,
      useFactory: (listUsersUseCase: IListUsersUseCase) =>
        new ListUserController(listUsersUseCase),
      inject: [ListUsersUseCase],
    },
    {
      provide: ListUsersUseCase,
      useFactory: (listUsersRepository: IListUsersRepository) =>
        new ListUsersUseCase(listUsersRepository),
      inject: [ListUsersRepository],
    },
    {
      provide: ListUsersRepository,
      useFactory: (prisma: PrismaRepository) => new ListUsersRepository(prisma),
      inject: [PrismaRepository],
    },
  ],
})
export class UserModule {}
