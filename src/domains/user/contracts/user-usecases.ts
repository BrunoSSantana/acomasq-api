import { OutputUser } from '@/domains/user/entities/user.entity';
import {
  CreateUserDto,
  ListUserDto,
} from '@/domains/user/contracts/user-controller';

export type InputUpdateUser = {
  name?: string;
  cpf?: string;
  rg?: string;
};

export interface IListUsersUseCase {
  list(listUserDto: ListUserDto): Promise<OutputUser[]>;
}

export interface ICreateUserUseCase {
  create(user: CreateUserDto): Promise<OutputUser>;
}

export interface IUpdateUserUseCase {
  update(id: string, paramsToUpdate: InputUpdateUser): Promise<OutputUser>;
}

export interface IDeleteUserUseCase {
  delete(id: string): Promise<void>;
}

export interface IDetailUserUseCase {
  detail(id: string): Promise<OutputUser>;
}
