import { BadRequestException } from '@nestjs/common';

import { IPaymentRepositoryPort } from '@/domains/payment/ports';

export class DeletePaymentByIdService {
  constructor(private repository: IPaymentRepositoryPort) {}

  async execute(associateId: string) {
    try {
      await this.repository.delete(associateId);
    } catch (error) {
      throw new BadRequestException({
        description: 'Erro ao tentar apagar um usuário',
        cause: error,
      });
    }
  }
}
