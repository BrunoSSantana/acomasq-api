import { PrismaService } from '@/infra/repositories/prisma/prisma.service';

import { User } from '@/domains/auth/entities';
import { IUserRepositoryPort } from '@/domains/auth/ports';

export class UserRepositoryPrismaAdapter implements IUserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: User): Promise<User> {
    const userCreated = await this.prisma.user.create({
      data: {
        password: params.password!,
        username: params.username,
      },
    });

    return User.create(userCreated);
  }
  async findByUsername(username: User['username']): Promise<User | null> {
    const userFound = await this.prisma.user.findUnique({
      where: { username },
    });

    return userFound ? User.create(userFound) : null;
  }
  async findById(userId: User['id']): Promise<User | null> {
    const userFound = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    return userFound ? User.create(userFound) : null;
  }
  async delete(userId: User['id']): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
