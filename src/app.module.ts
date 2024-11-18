import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { envSchema } from "@/env";
import { AppAuthGuard } from "@/infra/http/nest/@config/guards/auth.guard";
import { HealthModule } from "@/infra/http/nest/@config/health-check/health.module";
import { AssociateModule } from "@/infra/http/nest/modules/associate.module";
import { AuthModule } from "@/infra/http/nest/modules/auth.module";
import { PaymentModule } from "@/infra/http/nest/modules/payment.module";
import { JwtAdapter } from "@/infra/providers/jwt.provider";
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AssociateModule,
    PaymentModule,
    HealthModule,
    AuthModule,
  ],
  providers: [
    JwtService,
    JwtAdapter,
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard,
    },
  ],
})
export class AppModule {}
