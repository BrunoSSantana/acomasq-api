import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from '@/env';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserService } from '@/domains/auth/services';
import { PrismaUserRepository } from '@/infra/repositories/prisma/domains/auth/user.repository';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';
import { CreateSessionService } from '@/domains/auth/services/create-session.service';
import { AuthService } from './auth.service';
import { JwtAdapter } from './jwt.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => {
        const privateKey = configService.get('JWT_PRIVATE_KEY', {
          infer: true,
        });

        const publicKey = configService.get('JWT_PUBLIC_KEY', { infer: true });

        return {
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
          signOptions: {
            algorithm: 'RS256',
          },
        };
      },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    UserService,
    AuthService,
    PrismaService,
    {
      provide: CreateUserService,
      useFactory: (userRepository) => new CreateUserService(userRepository),
      inject: [PrismaUserRepository],
    },
    {
      provide: PrismaUserRepository,
      useFactory: (repository) => new PrismaUserRepository(repository),
      inject: [PrismaService],
    },
    {
      provide: CreateSessionService,
      useFactory: (userRepository, jwtService) =>
        new CreateSessionService(userRepository, jwtService),
      inject: [PrismaUserRepository, JwtAdapter],
    },
    {
      provide: JwtAdapter,
      useFactory: (jwtService) => new JwtAdapter(jwtService),
      inject: [JwtService],
    },
  ],
})
export class AuthModule {}
