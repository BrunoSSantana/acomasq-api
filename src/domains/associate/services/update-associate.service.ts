import { UpdateAssociateDTO } from '@/domains/associate/dto';
import { IAssociateRepositoryPort } from '@/domains/associate/ports';

export class UpdateAssociateService {
  constructor(private repository: IAssociateRepositoryPort) {}

  async execute(associateId: string, updateAssociateDto: UpdateAssociateDTO) {
    const input = {
      associateId,
      ...updateAssociateDto,
    };

    await this.repository.update(input);
  }
}
