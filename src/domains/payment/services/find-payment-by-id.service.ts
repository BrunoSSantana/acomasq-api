import { BadRequestException } from '@nestjs/common';

import { Payment } from '@/domains/payment/entities';
import { IPaymentRepositoryPort } from '@/domains/payment/ports';

export class FindPaymentByIdService {
  constructor(private repository: IPaymentRepositoryPort) {}

  async execute(paymentId: Payment['id']) {
    try {
      const payment = await this.repository.findById(paymentId);

      return payment;
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao buscar usuário',
        cause: error,
      });
    }
  }
}
