import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcryptjs";

import { CreateUserDTO } from "@/domains/auth/dto";
import { IJwtPort } from "@/domains/auth/ports";
import { IUserRepositoryPort } from "@/domains/auth/ports";

const provider = "CreateSessionService.execute";

export class CreateSessionService {
  constructor(
    private repository: IUserRepositoryPort,
    private jwt: IJwtPort,
  ) {}

  async execute(createUserDto: CreateUserDTO) {
    const { username, password } = createUserDto;

    const userAlreadyExists = await this.repository.findByUsername(username);

    if (!userAlreadyExists) {
      throw new UnauthorizedException({
        message: "Credenciais inválidas",
        provider,
      });
    }

    const passwordIsCorrect = await compare(
      password,
      userAlreadyExists.password!,
    );

    if (!passwordIsCorrect) {
      throw new UnauthorizedException({
        message: "Credenciais inválidas",
        provider,
      });
    }

    const authToken = this.jwt.sign({ sub: userAlreadyExists.id });

    return authToken;
  }
}
