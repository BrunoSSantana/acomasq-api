import {
  Payment,
  OutputPayment,
} from '@/domains/payment/entities/payment.entity';
import { randomUUID } from 'crypto';

export type InputAssociate = {
  id?: string;
  uid?: string;
  name?: string;
  cpf?: string;
  rg?: string;
  payments?: Payment[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type OutputAssociate = {
  id: string;
  uid: string;
  name: string;
  cpf: string;
  rg: string;
  payments?: OutputPayment[];
  createdAt: Date;
  updatedAt: Date;
};

export class Associate {
  id: string;
  uid: string;
  name: string;
  cpf: string;
  rg: string;
  payments?: Payment[];
  createdAt: Date;
  updatedAt: Date;

  constructor(params: InputAssociate) {
    this.id = params.id || randomUUID();
    this.uid = params.uid;
    this.name = params.name;
    this.cpf = params.cpf;
    this.rg = params.rg;
    this.payments = params.payments || [];
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }

  static create(params: InputAssociate): OutputAssociate {
    return new Associate(params);
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
      payments: this.payments.map((payment) => payment.toJSON()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
