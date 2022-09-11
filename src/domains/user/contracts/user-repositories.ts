import { User } from '@/domains/user/entities/user.entity';
import { UpdateUserDto } from './dtos/update-user-dto';

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
  execute(params: InputGetUser, pagination: InputPagination): Promise<User[]>;
}

export interface ICreateUserRepository {
  execute(user: User): Promise<User>;
}

export interface IUpdateUserRepository {
  execute(id: string, updateUserDto: UpdateUserDto): Promise<User>;
}

export interface IDeleteUserRepository {
  execute(id: string): Promise<void>;
}

export interface IDetailUserRepository {
  execute(id: string): Promise<User>;
}
