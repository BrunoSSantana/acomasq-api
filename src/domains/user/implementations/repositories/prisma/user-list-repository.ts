import {
  IListUsersRepository,
  InputGetUser,
  InputPagination,
} from '@/domains/user/contracts/user-repositories';
import { User } from '@/domains/user/entities/user.entity';
import { PrismaRepository } from '@/infra/repositories/prisma/prisma.repository';

export class ListUsersRepository implements IListUsersRepository {
  constructor(private readonly prisma: PrismaRepository) {}

  public async execute(
    params: InputGetUser,
    pagination: InputPagination,
  ): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: params,
      // orderBy: pagination.orderby,
      skip: pagination.skip,
      take: pagination.take,
    });

    return users.map((user) => new User(user));
  }
}
