import { IUpdateUserController } from '@/domains/user/contracts/user-controller';
import { IUpdateUserUseCase } from '@/domains/user/contracts/user-usecases';
import { OutputUser } from '@/domains/user/entities/user.entity';
import { UpdateUserDto } from '@/domains/user/contracts/dtos/update-user-dto';

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUsersUseCase: IUpdateUserUseCase) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<OutputUser> {
    return this.updateUsersUseCase.update(id, updateUserDto);
  }
}
