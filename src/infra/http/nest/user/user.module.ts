import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaRepository } from '@/infra/repositories/prisma/prisma.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useFactory: (prisma) => new UserService(prisma),
      inject: [PrismaRepository],
    },
    PrismaRepository,
  ],
})
export class UserModule {}
