import { IDetailUserRepository } from '../../contracts/user-repositories';
import { IDetailUserUseCase } from '../../contracts/user-usecases';
import { OutputUser } from '../../entities/user.entity';

export class DetailUserUseCase implements IDetailUserUseCase {
  constructor(private readonly userRepository: IDetailUserRepository) {}

  async detail(id: string): Promise<OutputUser> {
    const user = await this.userRepository.execute(id);

    return user.toJSON();
  }
}
