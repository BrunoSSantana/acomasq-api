import {
  Associate,
  OutputAssociate,
} from '@/domains/associate/entities/associate';
import { randomUUID } from 'crypto';

type InputPayment = {
  id?: string;
  mes: number;
  ano: number;
  associateId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OutputPayment = {
  id: string;
  mes: number;
  ano: number;
  associate?: OutputAssociate;
  associateId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Payment {
  id: string;
  mes: number;
  ano: number;
  associate?: Associate;
  associateId: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(input: InputPayment) {
    this.id = input.id || randomUUID();
    this.mes = input.mes;
    this.ano = input.ano;
    this.associateId = input.associateId;
    this.createdAt = input.createdAt || new Date();
    this.updatedAt = input.updatedAt || new Date();
  }

  static create(input: InputPayment): OutputPayment {
    return new Payment(input);
  }

  updateDate(mes: number, ano: number): void {
    this.mes = mes;
    this.ano = ano;
    this.updatedAt = new Date();
  }

  updateAssociate(associateId: string): void {
    this.associateId = associateId;
    this.updatedAt = new Date();
  }

  toJSON(): OutputPayment {
    return {
      id: this.id,
      mes: this.mes,
      ano: this.ano,
      associate: this.associate.toJSON(),
      associateId: this.associateId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
