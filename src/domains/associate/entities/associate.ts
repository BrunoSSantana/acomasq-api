import { randomUUID } from 'node:crypto';
import { Payment, OutputPayment } from '@/domains/payment/entities/payment';

export type InputAssociate = {
  id?: string;
  name?: string | null;
  cpf?: string | null;
  rg?: string | null;
  payments?: Payment[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type OutputAssociate = {
  id: string;
  name?: string | null;
  cpf?: string | null;
  rg?: string | null;
  payments?: OutputPayment[];
  createdAt: Date;
  updatedAt: Date;
};

export class Associate {
  id: string;
  name?: string | null;
  cpf?: string | null;
  rg?: string | null;
  payments?: Payment[];
  createdAt: Date;
  updatedAt: Date;

  private constructor(params: InputAssociate) {
    const cpf = params.cpf && new CPF(params.cpf).value;
    const rg = params.rg && new RG(params.rg).value;

    this.id = params.id || randomUUID();
    this.name = params.name;
    this.cpf = cpf;
    this.rg = rg;
    this.payments = params.payments || [];
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }

  static create(params: InputAssociate) {
    return new Associate(params);
  }

  updateName(name: string) {
    this.name = name;
    this.updatedAt = new Date();
  }

  updateDocuments(cpf?: string, rg?: string) {
    this.cpf = (cpf && new CPF(cpf).value) || this.cpf;
    this.rg = (rg && new RG(rg).value) || this.rg;
    this.updatedAt = new Date();
  }

  toJSON(): OutputAssociate {
    return {
      id: this.id,
      name: this.name,
      cpf: this.cpf,
      rg: this.rg,
      payments: this.payments?.map((payment) => payment.toJSON()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class CPF {
  private readonly _value: string;
  constructor(value: string) {
    const isValidCPFValue = this.isValidCPF(value);

    if (!isValidCPFValue) {
      throw new Error(`invalid CPF value: ${value}`);
    }

    this._value = value;
  }

  get value() {
    return this._value;
  }

  public isValidCPF(cpf: string | number[]) {
    return isValidCPF(cpf);
  }
}

export class RG {
  private readonly _value: string;
  constructor(value: string) {
    const isValidRGValue = RGRegex.test(value);

    if (!isValidRGValue) {
      throw new Error('invalid RG value');
    }

    this._value = value;
  }

  get value() {
    return this._value;
  }
}

export const isValidCPF = (cpf: string | number[]) => {
  if (typeof cpf !== 'string') return false;
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  cpf = cpf.split('').map((el) => +el);

  const rest = (count: number) =>
    (((cpf as number[])
      .slice(0, count - 12)
      .reduce(
        (soma: number, el: number, index: number) =>
          soma + el * (count - index),
        0,
      ) *
      10) %
      11) %
    10;

  return rest(10) === cpf[9] && rest(11) === cpf[10];
};

export const RGRegex =
  /(^[0-9]{1,2}).?([0-9]{3}).?([0-9]{3})-?([0-9]{1}|X|x$)?/;

// isValidCPF(cpf: string) {
//   if (typeof cpf !== 'string') return false;
//   if (cpf.match(/[a-z]/i)) return false;
//   cpf = cpf.replace(/[^\d]+/g, '');
//   if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
//   const cpfOnArray = cpf.split('');
//   const validator = cpfOnArray
//     .filter((digit, index, array) => index >= array.length - 2 && digit)
//     .map((el) => +el);
//   const toValidate = (pop: number) =>
//     cpfOnArray
//       .filter((digit, index, array) => index < array.length - pop && digit)
//       .map((el) => +el);
//   const rest = (count: number, pop: number) =>
//     ((toValidate(pop).reduce((soma, el, i) => soma + el * (count - i), 0) *
//       10) %
//       11) %
//     10;
//   return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
// }
