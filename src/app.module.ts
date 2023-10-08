import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from './env';
import { PaymentModule } from '@/infra/http/nest/modules/payment/payment.module';
import { AssociateModule } from '@/infra/http/nest/modules/associate/associate.module';
import { HealthModule } from '@/infra/http/nest/@config/health-check/health.module';
import { AuthModule } from '@/infra/http/nest/modules/auth/auth.module';

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
  providers: [],
})
export class AppModule {}
