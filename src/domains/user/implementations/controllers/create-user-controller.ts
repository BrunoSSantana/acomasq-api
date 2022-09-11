import { CreateUserDto } from '@/domains/user/contracts/dtos/create-user-dto';
import { ICreateUserController } from '@/domains/user/contracts/user-controller';
import { ICreateUserUseCase } from '@/domains/user/contracts/user-usecases';
import { OutputUser } from '@/domains/user/entities/user.entity';

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  execute(createUserDto: CreateUserDto): Promise<OutputUser> {
    return this.createUserUseCase.create(createUserDto);
  }
}
