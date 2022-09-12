import { IListUsersRepository } from '@/domains/user/contracts/user-repositories';
import { IListUsersUseCase } from '@/domains/user/contracts/user-usecases';
import { OutputUser } from '@/domains/user/entities/user.entity';
import { ListUserDto } from '@/domains/user/contracts/dtos/list-user-dto';

export class ListUsersUseCase implements IListUsersUseCase {
  constructor(private readonly userRepository: IListUsersRepository) {}

  public async list(listUserDto: ListUserDto): Promise<OutputUser[]> {
    const { take, skip, ...paramsToList } = listUserDto;

    const users = await this.userRepository.execute(paramsToList, {
      take,
      skip,
      // orderby,
    });

    return users.map((user) => user.toJSON());
  }
}
