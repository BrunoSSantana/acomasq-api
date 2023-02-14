import {
  Associado,
  OutputAssociado,
} from '@/domains/associado/entities/associado.entity';
import { randomUUID } from 'crypto';

type InputPagamento = {
  id?: string;
  mes: number;
  ano: number;
  associadoId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OutputPagamento = {
  id: string;
  mes: number;
  ano: number;
  associado?: OutputAssociado;
  associadoId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Pagamento {
  id: string;
  mes: number;
  ano: number;
  associado?: Associado;
  associadoId: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(input: InputPagamento) {
    this.id = input.id || randomUUID();
    this.mes = input.mes;
    this.ano = input.ano;
    this.associadoId = input.associadoId;
    this.createdAt = input.createdAt || new Date();
    this.updatedAt = input.updatedAt || new Date();
  }

  static create(input: InputPagamento): OutputPagamento {
    return new Pagamento(input);
  }

  updateDate(mes: number, ano: number): void {
    this.mes = mes;
    this.ano = ano;
    this.updatedAt = new Date();
  }

  updateAssociado(associadoId: string): void {
    this.associadoId = associadoId;
    this.updatedAt = new Date();
  }

  toJSON(): OutputPagamento {
    return {
      id: this.id,
      mes: this.mes,
      ano: this.ano,
      associado: this.associado.toJSON(),
      associadoId: this.associadoId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
