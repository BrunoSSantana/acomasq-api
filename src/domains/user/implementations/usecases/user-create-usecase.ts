import { CreateUserDto } from '@/domains/user/contracts/dtos/create-user-dto';
import { ICreateUserRepository } from '@/domains/user/contracts/user-repositories';
import { ICreateUserUseCase } from '@/domains/user/contracts/user-usecases';
import { OutputUser, User } from '@/domains/user/entities/user.entity';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: ICreateUserRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<OutputUser> {
    const user = new User(createUserDto);
    const userCreated = await this.userRepository.execute(user);

    return userCreated.toJSON();
  }
}
