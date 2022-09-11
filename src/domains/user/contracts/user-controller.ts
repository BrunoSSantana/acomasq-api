import { OutputUser } from '@/domains/user/entities/user.entity';
import { InputUpdateUser } from '@/domains/user/contracts/user-usecases';
import { ListUserDto } from './dtos/list-user-dto';
import { CreateUserDto } from './dtos/create-user-dto';

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
