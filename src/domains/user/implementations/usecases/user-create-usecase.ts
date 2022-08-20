import { CreateUserDto } from '../../contracts/user-controller';
import { ICreateUserRepository } from '../../contracts/user-repositories';
import { ICreateUserUseCase } from '../../contracts/user-usecases';
import { OutputUser, User } from '../../entities/user.entity';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: ICreateUserRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<OutputUser> {
    const user = new User(createUserDto);
    const userCreated = await this.userRepository.execute(user);

    return userCreated.toJSON();
  }
}
