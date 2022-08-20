import { ICreateUserRepository } from '@/domains/user/contracts/user-repositories';
import { User } from '@/domains/user/entities/user.entity';
import { PrismaClient } from '@prisma/client';

export class CreateUserRepository implements ICreateUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(user: User): Promise<User> {
    const userCreated = await this.prisma.user.create({
      data: {
        id: user.id,
        uid: user.uid,
        name: user.name,
        cpf: user.cpf,
        rg: user.rg,
      },
    });

    const newUser = new User(userCreated);

    return newUser;
  }
}
