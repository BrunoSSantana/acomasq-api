import { BadRequestException } from '@nestjs/common';
import { compare } from 'bcryptjs';

import { IJwtPort } from '@/domains/auth/ports';
import { CreateUserDTO } from '@/domains/auth/dto';
import { IUserRepository } from '@/domains/auth/repositories';

const provider = 'CreateSessionService.execute';

export class CreateSessionService {
  constructor(
    private repository: IUserRepository,
    private jwt: IJwtPort,
  ) {}

  async execute(createUserDto: CreateUserDTO) {
    const { username, password } = createUserDto;

    const userAlreadyExists = await this.repository.findByUsername(username);

    if (!userAlreadyExists) {
      throw new BadRequestException({
        message: 'Não existe um usuário com esse username',
        provider,
      });
    }

    const passwordIsCorrect = await compare(
      password,
      userAlreadyExists.password,
    );

    if (!passwordIsCorrect) {
      throw new BadRequestException({
        message: 'Senha incorreta',
        provider,
      });
    }

    const authToken = this.jwt.sign({ sub: userAlreadyExists.id });

    return authToken;
  }
}
