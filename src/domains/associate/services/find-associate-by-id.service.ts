import { BadRequestException } from '@nestjs/common';

import { IAssociateRepository } from '@/domains/associate/repositories/associate.repository';

export class FindAssociateByIdService {
  constructor(private repository: IAssociateRepository) {}

  async execute(associateId: string) {
    try {
      const associate = await this.repository.findById(associateId);

      return associate;
    } catch (error) {
      throw new BadRequestException({
        description: 'Erro ao buscar usuário',
        cause: error,
      });
    }
  }
}
