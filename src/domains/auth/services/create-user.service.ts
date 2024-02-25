import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcryptjs';

import { User } from '@/domains/auth/entities';
import { CreateUserDTO } from '@/domains/auth/dto';
import { IUserRepositoryPort } from '@/domains/auth/ports';

const provider = 'CreateUserService.execute';

export class CreateUserService {
  constructor(private repository: IUserRepositoryPort) {}

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

    const user = await this.repository.create(userToCreate);

    return user;
  }
}
