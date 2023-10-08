import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssociateModule } from '@/infra/http/nest/associate/associate.module';
import { PaymentModule } from '@/infra/http/nest/payment/payment.module';
import { HealthModule } from '@/infra/http/nest/@config/healthcheck/health.module';
import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AssociateModule,
    PaymentModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
