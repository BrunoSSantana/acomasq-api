import { IPaymentRepositoryPort } from '@/domains/payment/repositories';

export class DeletePaymentByIdService {
  constructor(private repository: IPaymentRepositoryPort) { }

  async execute(associateId: string) {
    await this.repository.delete(associateId);
  }
}
