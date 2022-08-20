import { IDetailUserController } from '../../contracts/user-controller';
import { IDetailUserUseCase } from '../../contracts/user-usecases';
import { OutputUser } from '../../entities/user.entity';

export class DetailUserController implements IDetailUserController {
  constructor(private readonly detailUserUseCase: IDetailUserUseCase) {}

  execute(id: string): Promise<OutputUser> {
    return this.detailUserUseCase.detail(id);
  }
}
