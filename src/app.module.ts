import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssociateModule } from '@/infra/http/nest/associate/associate.module';
import { PaymentModule } from '@/infra/http/nest/payment/payment.module';
import { HealthModule } from '@/infra/http/nest/@config/healthcheck/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AssociateModule,
    PaymentModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
