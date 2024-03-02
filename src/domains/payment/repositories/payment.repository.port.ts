import { Payment } from '@/domains/payment/entities';

export type FindManyPaymentInput = {
  filters?: {
    associateId?: string;
    month?: number;
    year?: number;
  };
  pagination?: {
    take?: number;
    skip?: number;
  };
};

export interface IPaymentRepositoryPort {
  create(payment: Payment): Promise<Payment>;
  update(payment: Payment): Promise<Payment>;
  findMany(input: FindManyPaymentInput): Promise<Payment[]>;
  findById(paymentId: Payment['id']): Promise<Payment | null>;
  delete(paymentId: Payment['id']): Promise<void>;
}
