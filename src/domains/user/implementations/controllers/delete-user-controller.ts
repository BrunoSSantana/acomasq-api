import { IDeleteUserController } from '@/domains/user/contracts/user-controller';
import { IDeleteUserUseCase } from '@/domains/user/contracts/user-usecases';

export class DeleteUserController implements IDeleteUserController {
  constructor(private readonly deleteUserUseCase: IDeleteUserUseCase) {}

  execute(id: string): Promise<void> {
    return this.deleteUserUseCase.delete(id);
  }
}
