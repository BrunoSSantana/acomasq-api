import { Payment } from '@/domains/payment/entities';
import { IPaymentRepositoryPort } from '@/domains/payment/ports';

export class FindPaymentByIdService {
  constructor(private repository: IPaymentRepositoryPort) {}

  async execute(paymentId: Payment['id']) {
    const payment = await this.repository.findById(paymentId);

    return payment;
  }
}
