import { IAssociateRepositoryPort } from '@/domains/associate/ports';

export class DeleteAssociateByIdService {
  constructor(private repository: IAssociateRepositoryPort) {}

  async execute(associateId: string) {
    await this.repository.delete(associateId);
  }
}
