import { Associate } from '@/domains/associate/entities';
import {
  CreateAssociateInput,
  IAssociateRepositoryPort,
  ListAssociateInput,
  UpdateAssociateInput,
} from '@/domains/associate/ports';

export class InMemoryAssociateRepository implements IAssociateRepositoryPort {
  private repository: Record<string, Associate>;

  constructor() {
    this.repository = {};
  }

  async create(params: CreateAssociateInput): Promise<void> {
    this.repository[params.id] = Associate.create(params);
  }

  async findMany(params: ListAssociateInput): Promise<Associate[]> {
    return Object.values(this.repository)
      .filter((associate) => {
        const { name, cpf, rg } = params;

        if (name && associate.name !== name) {
          return false;
        }

        if (cpf && associate.cpf !== cpf) {
          return false;
        }

        if (rg && associate.rg !== rg) {
          return false;
        }
      })
      .slice(params.skip, params.take);
  }

  async findById(associateId: string): Promise<Associate | null> {
    return this.repository[associateId];
  }

  async delete(associateId: string): Promise<void> {
    delete this.repository[associateId];
  }

  async update(params: UpdateAssociateInput): Promise<void> {
    const { associateId: id } = params;
    const oldAssociate = this.repository[id];
    const newAssociate = Associate.create({ ...oldAssociate, ...params });

    this.repository[id] = newAssociate;
  }
}
