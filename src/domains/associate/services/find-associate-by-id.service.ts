import { IAssociateRepositoryPort } from '@/domains/associate/ports';

export class FindAssociateByIdService {
  constructor(private repository: IAssociateRepositoryPort) {}

  async execute(associateId: string) {
    const associate = await this.repository.findById(associateId);

    return { associate };
  }
}
