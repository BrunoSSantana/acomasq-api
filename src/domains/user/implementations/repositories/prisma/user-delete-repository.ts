import { IDeleteUserRepository } from '@/domains/user/contracts/user-repositories';
import { PrismaRepository } from '@/infra/repositories/prisma/prisma.repository';

export class UserDeleteRepository implements IDeleteUserRepository {
  constructor(private readonly prismaRepositrory: PrismaRepository) {}

  async execute(id: string): Promise<void> {
    await this.prismaRepositrory.user.delete({
      where: { id },
    });
  }
}
