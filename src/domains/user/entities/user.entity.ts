import { Conta } from '@/domains/conta/entities/conta.emtity';
import { randomUUID } from 'crypto';

export type InputUser = {
  id?: string;
  uid?: string;
  name?: string;
  cpf?: string;
  rg?: string;
  contas?: Conta[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type OutputUser = {
  id: string;
  uid?: string;
  name?: string;
  cpf?: string;
  rg?: string;
  // contas?: OutputConta[];
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  id: string;
  uid: string;
  name: string;
  cpf: string;
  rg: string;
  private contas?: Conta[];
  createdAt: Date;
  updatedAt: Date;

  constructor(params: InputUser) {
    this.id = params.id || randomUUID();
    this.uid = params.uid;
    this.name = params.name;
    this.cpf = params.cpf;
    this.rg = params.rg;
    this.contas = params.contas || [];
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }

  static create(params: InputUser): OutputUser {
    return new User(params);
  }

  updateName(name: string) {
    this.name = name;
    this.updatedAt = new Date();
  }

  updateDouments(cpf?: string, rg?: string) {
    this.cpf = cpf || this.cpf;
    this.rg = rg || this.rg;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      uid: this.uid,
      name: this.name,
      cpf: this.cpf,
      rg: this.rg,
      contas: this.contas.map((conta) => conta.toJSON()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
