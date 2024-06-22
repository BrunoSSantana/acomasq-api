import { CreateUserService } from "@/domains/auth/services";
import { CreateSessionService } from "@/domains/auth/services/create-session.service";
import { Env } from "@/env";
import { UserRepositoryPrismaAdapter } from "@/infra/repositories/prisma/domains/auth/user.repository.adapter";
import { PrismaService } from "@/infra/repositories/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { CreateUserController } from "../controllers/auth/create-user.controller";
import { GenerateTokenController } from "../controllers/auth/generate-token.controller";
import { JwtAdapter } from "../controllers/auth/jwt.provider";

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
