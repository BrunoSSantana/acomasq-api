import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcryptjs';

import { CreateUserDTO } from '@/domains/auth/dto';
import { IUserRepository } from '@/domains/auth/repositories';
import { User } from '../entities';

const provider = 'CreateUserService.execute';

export class CreateUserService {
  constructor(private repository: IUserRepository) {}

  async execute(createUserDto: CreateUserDTO) {
    const { username, password } = createUserDto;

    const userAlreadyExists = await this.repository.findByUsername(username);

    if (userAlreadyExists) {
      throw new BadRequestException({
        message: 'Já existe um usuário com esse username',
        provider,
      });
    }

    const passwordHashed = await hash(password, 8);

    const userToCreate = User.create({
      username,
      password: passwordHashed,
    });

    try {
      const user = await this.repository.create(userToCreate);

      return user;
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao tentar cria um novo usuário',
        cause: error,
        provider,
      });
    }
  }
}
