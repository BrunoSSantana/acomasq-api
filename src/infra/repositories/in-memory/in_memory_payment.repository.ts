import { Payment } from '@/domains/payment/entities';
import {
  IPaymentRepositoryPort,
  FindManyPaymentInput,
} from '@/domains/payment/repositories';

export class InMemoryPaymentRepository implements IPaymentRepositoryPort {
  private repository: Record<string, Payment>;

  constructor() {
    this.repository = {};
  }

  create(payment: Payment): Promise<Payment> {
    this.repository[payment.id] = payment;
    return Promise.resolve(payment);
  }
  update(payment: Payment): Promise<Payment> {
    this.repository[payment.id] = payment;
    return Promise.resolve(payment);
  }

  findMany(input: FindManyPaymentInput): Promise<Payment[]> {
    const { filters, pagination } = input;

    const payments = Object.values(this.repository)
      .filter((payment) => {
        if (
          filters?.associateId &&
          payment.associateId !== filters?.associateId
        ) {
          return false;
        }

        if (filters?.month && payment.month !== filters?.month) {
          return false;
        }

        if (filters?.year && payment.year !== filters?.year) {
          return false;
        }
      })
      .slice(pagination?.skip, pagination?.take);

    return Promise.resolve(payments);
  }

  async findById(paymentId: string): Promise<Payment | null> {
    return this.repository[paymentId];
  }

  async delete(paymentId: string): Promise<void> {
    delete this.repository[paymentId];
  }
}
