import { randomUUID } from 'node:crypto';

type UserType = {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type InputUser = {
  id?: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User implements UserType {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(params: InputUser) {
    this.id = params.id || randomUUID();
    this.username = params.username;
    this.password = params.password;
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }

  static create(params: InputUser) {
    return new User(params);
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
