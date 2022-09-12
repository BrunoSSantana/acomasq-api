import { UpdateUserDto } from '@/domains/user/contracts/dtos/update-user-dto';
import { IUpdateUserRepository } from '@/domains/user/contracts/user-repositories';
import { User } from '@/domains/user/entities/user.entity';
import { PrismaRepository } from '@/infra/repositories/prisma/prisma.repository';

export class UpdateUserRepository implements IUpdateUserRepository {
  constructor(private readonly prisma: PrismaRepository) {}

  public async execute(id: string, params: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: params,
    });

    return new User(user);
  }
}
