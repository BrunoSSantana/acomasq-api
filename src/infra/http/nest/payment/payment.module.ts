import { Module } from '@nestjs/common';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';
import { PaymentService } from '@/infra/http/nest/payment/payment.service';
import { PaymentController } from '@/infra/http/nest/payment/payment.controller';

@Module({
  controllers: [PaymentController],
  providers: [
    {
      provide: PaymentService,
      useFactory: (prisma) => new PaymentService(prisma),
      inject: [PrismaService],
    },
    PrismaService,
  ],
})
export class PaymentModule {}
