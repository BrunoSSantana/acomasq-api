import { CreateUserService } from "@/domains/auth/services";
import { CreateSessionService } from "@/domains/auth/services/create-session.service";
import { Env } from "@/env";
import {
  CreateUserController,
  GenerateTokenController,
} from "@/infra/http/nest/controllers/auth";
import { JwtAdapter } from "@/infra/providers";
import { UserRepositoryPrismaAdapter } from "@/infra/repositories/prisma/domains/auth";
import { PrismaService } from "@/infra/repositories/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => {
        const privateKey = configService.get("JWT_PRIVATE_KEY", {
          infer: true,
        });

        const publicKey = configService.get("JWT_PUBLIC_KEY", { infer: true });

        return {
          privateKey: Buffer.from(privateKey, "base64"),
          publicKey: Buffer.from(publicKey, "base64"),
          signOptions: {
            algorithm: "RS256",
          },
        };
      },
    }),
  ],
  controllers: [GenerateTokenController, CreateUserController],
  providers: [
    PrismaService,
    {
      provide: CreateUserService,
      useFactory: (userRepository) => new CreateUserService(userRepository),
      inject: [UserRepositoryPrismaAdapter],
    },
    {
      provide: UserRepositoryPrismaAdapter,
      useFactory: (repository) => new UserRepositoryPrismaAdapter(repository),
      inject: [PrismaService],
    },
    {
      provide: CreateSessionService,
      useFactory: (userRepository, jwtService) =>
        new CreateSessionService(userRepository, jwtService),
      inject: [UserRepositoryPrismaAdapter, JwtAdapter],
    },
    {
      provide: JwtAdapter,
      useFactory: (jwtService) => new JwtAdapter(jwtService),
      inject: [JwtService],
    },
  ],
})
export class AuthModule {}
