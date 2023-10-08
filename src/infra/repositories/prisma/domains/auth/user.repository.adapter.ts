import { BadRequestException } from '@nestjs/common';

import { PrismaService } from '@/infra/repositories/prisma/prisma.service';

import { User } from '@/domains/auth/entities';
import { IUserRepositoryPort } from '@/domains/auth/ports';

export class UserRepositoryPrismaAdapter implements IUserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: User): Promise<User> {
    try {
      const userCreated = await this.prisma.user.create({
        data: {
          password: params.password,
          username: params.username,
        },
      });

      return User.create(userCreated);
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao tentar cria um novo usuário',
        cause: error,
        provider: 'Prisma.UserRepository.create',
      });
    }
  }
  async findByUsername(username: User['username']): Promise<User | null> {
    try {
      const userFound = await this.prisma.user.findUnique({
        where: { username },
      });

      return userFound ? User.create(userFound) : null;
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao tentar buscar usuário pelo username',
        cause: error,
        provider: 'Prisma.UserRepository.findByUsername',
      });
    }
  }
  async findById(userId: User['id']): Promise<User | null> {
    try {
      const userFound = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      return userFound ? User.create(userFound) : null;
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao tentar buscar usuário pelo id',
        cause: error,
        provider: 'Prisma.UserRepository.findById',
      });
    }
  }
  async delete(userId: User['id']): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new BadRequestException({
        message: 'Erro ao tentar remover usuário',
        cause: error,
        provider: 'Prisma.UserRepository.delete',
      });
    }
  }
}
