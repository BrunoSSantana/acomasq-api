import { BadRequestException } from '@nestjs/common';

import { GetPaymentsDTO } from '@/domains/payment/dto';
import { IPaymentRepositoryPort } from '@/domains/payment/ports';

export class ListPaymentService {
  constructor(private repository: IPaymentRepositoryPort) {}

  async execute(listPaymentDto: GetPaymentsDTO) {
    const { associateId, month, year } = listPaymentDto;

    try {
      const payment = await this.repository.findMany({
        filters: {
          associateId,
          month,
          year,
        },
      });

      return payment;
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao listar usuários',
        cause: error,
      });
    }
  }
}
