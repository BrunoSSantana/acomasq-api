import {
  FindManyPaymentInput,
  IPaymentRepositoryPort,
} from '@/domains/payment/repositories';
import { Payment } from '@/domains/payment/entities';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';

export class PaymentRepositoryPrismaAdapter implements IPaymentRepositoryPort {
  constructor(private readonly prisma: PrismaService) { }

  async create(payment: Payment): Promise<Payment> {
    const paymentCreated = await this.prisma.payment.create({
      data: {
        id: payment.id,
        month: payment.month,
        year: payment.year,
        associateId: payment.associateId,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      },
    });

    return Payment.create(paymentCreated);
  }

  async findMany(params: FindManyPaymentInput): Promise<Payment[]> {
    const { filters, pagination } = params;

    const paymentsFound = await this.prisma.payment.findMany({
      where: {
        associateId: filters?.associateId,
        month: filters?.month,
        year: filters?.year,
      },
      take: pagination?.take,
      skip: pagination?.skip,
    });

    return paymentsFound.map(Payment.create);
  }

  async findById(paymentId: string): Promise<Payment | null> {
    const paymentFound = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    return paymentFound ? Payment.create(paymentFound) : null;
  }

  async update(payment: Payment): Promise<Payment> {
    const { id, ...dataToUpdate } = payment;

    const paymentUpdated = await this.prisma.payment.update({
      where: { id },
      data: {
        year: dataToUpdate.year,
        month: dataToUpdate.month,
        associateId: dataToUpdate.associateId,
      },
    });

    return Payment.create(paymentUpdated);
  }

  async delete(paymentId: Payment['id']): Promise<void> {
    await this.prisma.payment.delete({
      where: {
        id: paymentId,
      },
    });
  }
}
