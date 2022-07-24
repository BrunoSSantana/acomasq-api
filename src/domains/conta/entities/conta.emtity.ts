import { User, OutputUser } from '@/domains/user/entities/user.entity';
import { randomUUID } from 'crypto';

type InputConta = {
  id?: string;
  month: number;
  year: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type OutputConta = {
  id: string;
  month: number;
  year: number;
  user?: OutputUser;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Conta {
  id: string;
  month: number;
  year: number;
  user?: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(input: InputConta) {
    this.id = input.id || randomUUID();
    this.month = input.month;
    this.year = input.year;
    this.userId = input.userId;
    this.createdAt = input.createdAt || new Date();
    this.updatedAt = input.updatedAt || new Date();
  }

  static create(input: InputConta): OutputConta {
    return new Conta(input);
  }

  updateDate(month: number, year: number): void {
    this.month = month;
    this.year = year;
    this.updatedAt = new Date();
  }

  updateUser(userId: string): void {
    this.userId = userId;
    this.updatedAt = new Date();
  }

  toJSON(): OutputConta {
    return {
      id: this.id,
      month: this.month,
      year: this.year,
      user: this.user.toJSON(),
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
