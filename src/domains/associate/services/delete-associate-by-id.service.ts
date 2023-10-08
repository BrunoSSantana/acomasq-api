import { BadRequestException } from '@nestjs/common';

import { IAssociateRepositoryPort } from '@/domains/associate/ports';

export class DeleteAssociateByIdService {
  constructor(private repository: IAssociateRepositoryPort) {}

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
