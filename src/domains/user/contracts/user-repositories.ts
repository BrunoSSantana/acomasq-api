import { User } from '@/domains/user/entities/user.entity';

export type InputGetUser = {
  uid?: string;
  name?: string;
  cpf?: string;
  rg?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type InputPagination = {
  orderby?: { [key: string]: 'asc' | 'desc' };
  skip?: number;
  take?: number;
};

export interface IListUsersRepository {
  list(params: InputGetUser, pagination: InputPagination): Promise<User[]>;
}

export interface ICreateUserRepository {
  create(user: User): Promise<User>;
}

export interface IUpdateUserRepository {
  update(user: User): Promise<User>;
}

export interface IDeleteUserRepository {
  delete(id: string): Promise<void>;
}

export interface IDetailUserRepository {
  detail(id: string): Promise<User>;
}
