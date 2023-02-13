import { Module } from '@nestjs/common';
import { UserService } from '@/infra/http/nest/user/user.service';
import { UserController } from '@/infra/http/nest/user/user.controller';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useFactory: (prisma) => new UserService(prisma),
      inject: [PrismaService],
    },
    PrismaService,
  ],
})
export class UserModule {}
