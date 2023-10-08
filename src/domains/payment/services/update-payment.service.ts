import { BadRequestException } from '@nestjs/common';

import { UpdatePaymentDTO } from '@/domains/payment/dto';
import { IPaymentRepositoryPort } from '@/domains/payment/ports';
import { Payment } from '../entities';

export class UpdatePaymentService {
  constructor(private repository: IPaymentRepositoryPort) {}

  async execute(paymentId: string, updatePaymentDto: UpdatePaymentDTO) {
    const paymentFromDB = await this.repository.findById(paymentId);

    if (!paymentFromDB) {
      throw new BadRequestException({
        message: 'Pagamento não encontrado',
      });
    }

    const paymentToUpdate = Payment.create({
      ...paymentFromDB,
      ...updatePaymentDto,
    });

    try {
      const userUpdated = await this.repository.update(paymentToUpdate);

      return userUpdated;
    } catch (error) {
      throw new BadRequestException({
        cause: error,
        message: 'Error ao tentar atualizar um usuário',
      });
    }
  }
}
