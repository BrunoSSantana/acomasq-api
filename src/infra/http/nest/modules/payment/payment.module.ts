import { Module } from '@nestjs/common';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';
import { PaymentController } from '@/infra/http/nest/modules/payment/payment.controller';
import {
  CreatePaymentService,
  DeletePaymentByIdService,
} from '@/domains/payment/services';
import { FindPaymentByIdService } from '@/domains/payment/services/find-payment-by-id.service';
import { ListPaymentService } from '@/domains/payment/services/list-payment.service';
import { UpdatePaymentService } from '@/domains/payment/services/update-payment.service';
import { PaymentRepositoryPrismaAdapter } from '@/infra/repositories/prisma/domains/payment/payment.repository.adapter';

@Module({
  controllers: [PaymentController],
  providers: [
    {
      provide: CreatePaymentService,
      useFactory: (repository) => new CreatePaymentService(repository),
      inject: [PaymentRepositoryPrismaAdapter],
    },
    {
      provide: UpdatePaymentService,
      useFactory: (repository) => new UpdatePaymentService(repository),
      inject: [PaymentRepositoryPrismaAdapter],
    },
    {
      provide: ListPaymentService,
      useFactory: (repository) => new ListPaymentService(repository),
      inject: [PaymentRepositoryPrismaAdapter],
    },
    {
      provide: FindPaymentByIdService,
      useFactory: (repository) => new FindPaymentByIdService(repository),
      inject: [PaymentRepositoryPrismaAdapter],
    },
    {
      provide: DeletePaymentByIdService,
      useFactory: (repository) => new DeletePaymentByIdService(repository),
      inject: [PaymentRepositoryPrismaAdapter],
    },
    {
      provide: PaymentRepositoryPrismaAdapter,
      useFactory: (prismaService) =>
        new PaymentRepositoryPrismaAdapter(prismaService),
      inject: [PrismaService],
    },
    PrismaService,
  ],
})
export class PaymentModule {}
