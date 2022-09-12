import { IDetailUserRepository } from '@/domains/user/contracts/user-repositories';
import { IDetailUserUseCase } from '@/domains/user/contracts/user-usecases';
import { OutputUser } from '@/domains/user/entities/user.entity';

export class DetailUserUseCase implements IDetailUserUseCase {
  constructor(private readonly userRepository: IDetailUserRepository) {}

  async detail(id: string): Promise<OutputUser> {
    const user = await this.userRepository.execute(id);

    return user.toJSON();
  }
}
