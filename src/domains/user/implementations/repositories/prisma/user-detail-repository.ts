import { IDetailUserRepository } from '@/domains/user/contracts/user-repositories';
import { User } from '@/domains/user/entities/user.entity';
import { PrismaRepository } from '@/infra/repositories/prisma/prisma.repository';

export class UserDetailRepository implements IDetailUserRepository {
  constructor(private readonly prisma: PrismaRepository) {}

  async execute(id: string): Promise<User> {
    const userFinded = await this.prisma.user.findFirst({
      where: { id },
    });

    const user = new User(userFinded);

    return user;
  }
}
