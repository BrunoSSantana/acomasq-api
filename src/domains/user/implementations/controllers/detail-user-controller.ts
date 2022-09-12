import { IDetailUserController } from '@/domains/user/contracts/user-controller';
import { IDetailUserUseCase } from '@/domains/user/contracts/user-usecases';
import { OutputUser } from '@/domains/user/entities/user.entity';

export class DetailUserController implements IDetailUserController {
  constructor(private readonly detailUserUseCase: IDetailUserUseCase) {}

  execute(id: string): Promise<OutputUser> {
    return this.detailUserUseCase.detail(id);
  }
}
