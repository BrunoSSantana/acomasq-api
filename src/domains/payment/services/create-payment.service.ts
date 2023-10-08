import { BadRequestException } from '@nestjs/common';

import { Payment } from '@/domains/payment/entities';
import { CreatePaymentDTO } from '@/domains/payment/dto';
import { IPaymentRepositoryPort } from '@/domains/payment/ports';

export class CreatePaymentService {
  constructor(private readonly repository: IPaymentRepositoryPort) {
    this.repository = repository;
  }
  async execute(createPaymentDto: CreatePaymentDTO) {
    const { month, associateId, year } = createPaymentDto;

    const payment = Payment.create({
      month,
      associateId,
      year,
    });

    try {
      const paymentCreated = await this.repository.create(payment);

      return paymentCreated;
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao tentar criar payment',
        cause: error,
        provider: 'CreatePaymentService',
      });
    }
  }
}
