import { UpdateUserDto } from '@/domains/user/contracts/dtos/update-user-dto';
import { IUpdateUserRepository } from '@/domains/user/contracts/user-repositories';
import { IUpdateUserUseCase } from '@/domains/user/contracts/user-usecases';
import { OutputUser } from '@/domains/user/entities/user.entity';

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private readonly userRepository: IUpdateUserRepository) {}

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<OutputUser> {
    const user = await this.userRepository.execute(id, updateUserDto);

    return user.toJSON();
  }
}
