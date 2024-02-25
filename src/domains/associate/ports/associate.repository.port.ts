import { Associate } from '@/domains/associate/entities/associate';

export type CreateAssociateInput = {
  id: string;
  rg: string;
  cpf: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ListAssociateInput = {
  rg?: string;
  cpf?: string;
  name?: string;
  take?: number;
  skip?: number;
};

export type UpdateAssociateInput = {
  associateId: string;
  rg?: string | null;
  cpf?: string | null;
  name?: string | null;
};

export interface IAssociateRepositoryPort {
  create(params: CreateAssociateInput): Promise<void>;
  findMany(params: ListAssociateInput): Promise<Associate[]>;
  findById(associateId: string): Promise<Associate | null>;
  delete(associateId: string): Promise<void>;
  update(params: UpdateAssociateInput): Promise<void>;
}
