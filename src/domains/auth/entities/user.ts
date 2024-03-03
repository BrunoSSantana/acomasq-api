import { randomUUID } from 'node:crypto';

export type UserType = {
  id: string;
  username: string;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserInput = {
  id: string;
  username: string;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCreateInput = {
  username: string;
  password: string;
};

export class User implements UserType {
  id: string;
  username: string;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;

  private constructor(params: UserInput) {
    this.id = params.id;
    this.username = params.username;
    this.password = params.password;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static create(params: UserCreateInput) {
    return new User({
      id: randomUUID(),
      ...params,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static toDomain(input: UserInput): User {
    return new User({
      id: input.id,
      username: input.username,
      password: input.password,
      createdAt: new Date(input.createdAt),
      updatedAt: new Date(input.updatedAt),
    });
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
