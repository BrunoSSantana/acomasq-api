import {
  CreateUserDto,
  ICreateUserController,
} from '../../contracts/user-controller';
import { ICreateUserUseCase } from '../../contracts/user-usecases';
import { OutputUser } from '../../entities/user.entity';

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  execute(createUserDto: CreateUserDto): Promise<OutputUser> {
    return this.createUserUseCase.create(createUserDto);
  }
}
