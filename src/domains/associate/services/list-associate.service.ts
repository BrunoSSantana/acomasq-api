import { BadRequestException } from '@nestjs/common';

import { GetAssociatesRequestDTO } from '@/domains/associate/dto';
import { IAssociateRepository } from '@/domains/associate/repositories/associate.repository';

export class ListAssociateService {
  constructor(private repository: IAssociateRepository) {}

  async execute(listAssociateDto: GetAssociatesRequestDTO) {
    const { skip, take, cpf, name, rg } = listAssociateDto;

    try {
      const users = await this.repository.findMany({
        name,
        cpf,
        rg,
        take,
        skip,
      });

      return users;
    } catch (error) {
      throw new BadRequestException({
        description: 'Erro ao listar usuários',
        casuse: error,
      });
    }
  }
}
