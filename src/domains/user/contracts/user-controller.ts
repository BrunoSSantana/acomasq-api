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

export interface IListUserController {
  list(listUserDto: ListUserDto): Promise<OutputUser[]>;
}

export interface ICreateUserController {
  create(user: OutputUser): Promise<OutputUser>;
}

export interface IUpdateUserController {
  update(id: string, paramsToUpdate: InputUpdateUser): Promise<OutputUser>;
}

export interface IDeleteUserController {
  delete(id: string): Promise<void>;
}

export interface IDetailUserController {
  detail(id: string): Promise<OutputUser>;
}
