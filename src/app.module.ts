import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from './env';
import { PaymentModule } from '@/infra/http/nest/modules/payment.module';
import { HealthModule } from '@/infra/http/nest/@config/health-check/health.module';
import { AuthModule } from '@/infra/http/nest/modules/auth.module';
import { AssociateModule } from '@/infra/http/nest/modules/associate.module';
import { APP_GUARD } from '@nestjs/core';
import { AppAuthGuard } from '@/infra/http/nest/@config/guards/auth.guard';
import { JwtAdapter } from './infra/http/nest/controllers/auth/jwt.provider';

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
    JwtAdapter,
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard,
    },
  ],
})
export class AppModule {}
