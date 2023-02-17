import {
  Associate,
  OutputAssociate,
} from '@/domains/associate/entities/associate';
import { randomUUID } from 'crypto';
import { z } from 'zod';

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
    const id = uuidValidate(input.id);
    const associateId = uuidValidate(input.associateId);
    const mes = monthValidate(input.mes);
    const ano = yearValidate(input.ano);

    return new Payment({ ...input, id, mes, ano, associateId });
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

function uuidValidate(uuid: string) {
  const schemaUuid = z.string().uuid();

  return schemaUuid.parse(uuid);
}

function monthValidate(monoth: number) {
  const monthSchema = z.number().gte(1).lte(12);

  return monthSchema.parse(monoth);
}

function yearValidate(year: number) {
  const yearSchema = z.number().gte(1900);

  return yearSchema.parse(year);
}
