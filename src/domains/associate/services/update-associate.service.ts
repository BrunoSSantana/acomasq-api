import { BadRequestException } from '@nestjs/common';

import { UpdateAssociateDTO } from '@/domains/associate/dto';
import { IAssociateRepositoryPort } from '@/domains/associate/ports';

export class UpdateAssociateService {
  constructor(private repository: IAssociateRepositoryPort) {}

  async execute(associateId: string, updateAssociateDto: UpdateAssociateDTO) {
    try {
      const userUpdated = await this.repository.update({
        associateId,
        ...updateAssociateDto,
      });

      return userUpdated;
    } catch (error) {
      throw new BadRequestException({
        cause: error,
        message: 'Error ao tentar atualizar um usuário',
      });
    }
  }
}
