import { randomUUID } from 'crypto';

import { CreateAssociateDTO } from '@/domains/associate/dto';
import { IAssociateRepositoryPort } from '@/domains/associate/ports';

export class CreateAssociateService {
  constructor(private repository: IAssociateRepositoryPort) {}

  async execute(createAssociateDto: CreateAssociateDTO) {
    const { cpf, name, rg } = createAssociateDto;

    const associate = await this.repository.create({
      id: randomUUID(),
      rg,
      name,
      cpf,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { associate };
  }
}
