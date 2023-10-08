import { BadRequestException } from '@nestjs/common';
import { compare } from 'bcryptjs';

import { CreateUserDTO } from '@/domains/auth/dto';
import { IUserRepository } from '@/domains/auth/repositories';
import { Auth } from '../entities/auth';
import { JwtService } from '@nestjs/jwt';

const provider = 'CreateSessionService.execute';

export class CreateSessionService {
  constructor(
    private repository: IUserRepository,
    // TODO: change to a interface service
    private jwt: JwtService,
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

    const accessToken = this.jwt.sign({ sub: userAlreadyExists.id });

    return new Auth(accessToken);
  }
}
