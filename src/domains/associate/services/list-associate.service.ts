import { BadRequestException } from '@nestjs/common';

import { GetAssociatesRequestDTO } from '@/domains/associate/dto';
import { IAssociateRepositoryPort } from '@/domains/associate/ports';

export class ListAssociateService {
  constructor(private repository: IAssociateRepositoryPort) {}

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
        message: 'Erro ao listar usuários',
        cause: error,
      });
    }
  }
}
