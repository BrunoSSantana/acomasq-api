import { OutputUser } from '@/domains/user/entities/user.entity';
import { InputUpdateUser } from '@/domains/user/contracts/user-usecases';

export interface ListUserDto {
  name?: string;
  cpf?: string;
  rg?: string;
  createdAt?: Date;
  updatedAt?: Date;
  orderby?: { [key: string]: 'asc' | 'desc' };
  take?: number;
  skip?: number;
}

export interface CreateUserDto {
  name: string;
  cpf: string;
  rg: string;
}

export interface IListUserController {
  execute(listUserDto: ListUserDto): Promise<OutputUser[]>;
}

export interface ICreateUserController {
  execute(user: CreateUserDto): Promise<OutputUser>;
}

export interface IUpdateUserController {
  execute(id: string, paramsToUpdate: InputUpdateUser): Promise<OutputUser>;
}

export interface IDeleteUserController {
  execute(id: string): Promise<void>;
}

export interface IDetailUserController {
  execute(id: string): Promise<OutputUser>;
}
