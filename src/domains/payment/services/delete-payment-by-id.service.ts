import { IPaymentRepositoryPort } from '@/domains/payment/ports';

export class DeletePaymentByIdService {
  constructor(private repository: IPaymentRepositoryPort) {}

  async execute(associateId: string) {
    await this.repository.delete(associateId);
  }
}
