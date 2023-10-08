import { BadRequestException } from '@nestjs/common';

import { IAssociateRepositoryPort } from '@/domains/associate/ports';

export class FindAssociateByIdService {
  constructor(private repository: IAssociateRepositoryPort) {}

  async execute(associateId: string) {
    try {
      const associate = await this.repository.findById(associateId);

      return associate;
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao buscar usuário',
        cause: error,
      });
    }
  }
}
