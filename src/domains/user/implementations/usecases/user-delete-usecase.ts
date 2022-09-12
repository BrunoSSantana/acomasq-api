import { IDeleteUserRepository } from '../../contracts/user-repositories';
import { IDeleteUserUseCase } from '../../contracts/user-usecases';

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly userRepository: IDeleteUserRepository) {}

  async delete(id: string): Promise<void> {
    await this.userRepository.execute(id);
  }
}
