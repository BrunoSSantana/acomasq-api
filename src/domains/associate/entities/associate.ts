import {
  Payment,
  OutputPayment,
} from '@/domains/payment/entities/payment.entity';
import { randomUUID } from 'crypto';

export type InputAssociate = {
  id?: string;
  name?: string;
  cpf?: string;
  rg?: string;
  payments?: Payment[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type OutputAssociate = {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  payments?: OutputPayment[];
  createdAt: Date;
  updatedAt: Date;
};

export class Associate {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  payments?: Payment[];
  createdAt: Date;
  updatedAt: Date;

  private constructor(params: InputAssociate) {
    const cpf = new CPF(params.cpf).value;

    this.id = params.id || randomUUID();
    this.name = params.name;
    this.cpf = cpf;
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
    this.cpf = new CPF(cpf).value || this.cpf;
    this.rg = rg || this.rg;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      cpf: this.cpf,
      rg: this.rg,
      payments: this.payments.map((payment) => payment.toJSON()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class CPF {
  private readonly _value: string;
  constructor(value: string) {
    const isValidCPFValue =
      /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})$|^([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/.test(
        value,
      );

    if (!isValidCPFValue) {
      throw new Error('invalid CPF value');
    }

    this._value = value;
  }

  get value() {
    return this._value;
  }
}