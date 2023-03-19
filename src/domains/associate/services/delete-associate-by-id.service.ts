import { BadRequestException } from '@nestjs/common';

import { IAssociateRepository } from '@/domains/associate/repositories/associate.repository';

export class DeleteAssociateByIdService {
  constructor(private repository: IAssociateRepository) {}

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
