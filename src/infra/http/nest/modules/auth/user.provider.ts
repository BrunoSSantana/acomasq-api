import { CreateUserDTO } from '@/domains/auth/dto';
import { User } from '@/domains/auth/entities';
import { CreateUserService } from '@/domains/auth/services';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UserProvider {
  constructor(private readonly createUserService: CreateUserService) {}

  async create(params: CreateUserDTO): Promise<User> {
    try {
      const userCreated = await this.createUserService.execute(params);

      return User.create(userCreated);
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao tentar cria um novo usuário',
        cause: error,
      });
    }
  }
}
