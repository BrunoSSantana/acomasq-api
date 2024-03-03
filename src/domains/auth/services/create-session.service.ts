import { compare } from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';

import { IJwtPort } from '@/domains/auth/ports';
import { CreateUserDTO } from '@/domains/auth/dto';
import { IUserRepositoryPort } from '@/domains/auth/ports';

const provider = 'CreateSessionService.execute';

export class CreateSessionService {
  constructor(
    private repository: IUserRepositoryPort,
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
      userAlreadyExists.password!,
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
