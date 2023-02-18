import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssociateModule } from '@/infra/http/nest/associate/associate.module';
import { PaymentModule } from '@/infra/http/nest/payment/payment.module';

@Module({
  imports: [ConfigModule.forRoot(), AssociateModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
