import { randomUUID } from 'crypto';
import { BadRequestException } from '@nestjs/common';

import { CreateAssociateDTO } from '@/domains/associate/dtos';
import { IAssociateRepository } from '@/domains/associate/repositories/associate.repository';

export class CreateAssociateService {
  constructor(private repository: IAssociateRepository) {}

  async execute(createAssociateDto: CreateAssociateDTO) {
    const { cpf, name, rg } = createAssociateDto;

    try {
      const associate = await this.repository.create({
        id: randomUUID(),
        rg,
        name,
        cpf,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return associate;
    } catch (error) {
      throw new BadRequestException({
        description: 'Erro ao tentar cria um novo usuário',
        cause: error,
      });
    }
  }
}
