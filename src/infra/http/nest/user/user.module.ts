import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaRepository } from '@/infra/repositories/prisma/prisma.repository';
import { ListUserController } from '@/domains/user/implementations/controllers/list-user-controller';
import {
  ICreateUserUseCase,
  IListUsersUseCase,
} from '@/domains/user/contracts/user-usecases';
import { ListUsersUseCase } from '@/domains/user/implementations/usecases/user-list-usecase';
import {
  ICreateUserRepository,
  IListUsersRepository,
} from '@/domains/user/contracts/user-repositories';
import { ListUsersRepository } from '@/domains/user/implementations/repositories/prisma/user-list-repository';
import { CreateUserUseCase } from '@/domains/user/implementations/usecases/user-create-usecase';
import { CreateUserController } from '@/domains/user/implementations/controllers/create-user-controller';
import { CreateUserRepository } from '@/domains/user/implementations/repositories/prisma/user-create-repository';

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
    {
      provide: CreateUserController,
      useFactory: (createUserUseCase: ICreateUserUseCase) =>
        new CreateUserController(createUserUseCase),
      inject: [CreateUserUseCase],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: ICreateUserRepository) =>
        new CreateUserUseCase(userRepository),
      inject: [CreateUserRepository],
    },
    {
      provide: CreateUserRepository,
      useFactory: (prisma: PrismaRepository) =>
        new CreateUserRepository(prisma),
      inject: [PrismaRepository],
    },
  ],
})
export class UserModule {}
