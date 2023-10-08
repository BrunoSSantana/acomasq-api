import { BadRequestException } from '@nestjs/common';

import { UpdateAssociateDTO } from '@/domains/associate/dto';
import { IAssociateRepository } from '@/domains/associate/repositories/associate.repository';

export class UpdateAssociateService {
  constructor(private repository: IAssociateRepository) {}

  async execute(associateId: string, updateAssociateDto: UpdateAssociateDTO) {
    try {
      const userUpdated = await this.repository.update({
        associateId,
        ...updateAssociateDto,
      });

      return userUpdated;
    } catch (error) {
      throw new BadRequestException({
        casuse: error,
        description: 'Error ao tentar atualizar um usuário',
      });
    }
  }
}
