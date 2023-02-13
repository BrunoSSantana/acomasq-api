import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';
import { CreateUserDTO, ListUserDto, UpdateUserDTO } from '@/domains/user/dtos';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDTO) {
    const { cpf, name, rg } = createUserDto;

    try {
      const user = await this.prisma.user.create({
        data: {
          id: randomUUID(),
          rg,
          name,
          cpf,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(
        error,
        'Erro ao tentar cria um novo usuário',
      );
    }
  }

  async findAll(listUserDto: ListUserDto) {
    const { skip, take, cpf, name, rg } = listUserDto;

    try {
      const users = await this.prisma.user.findMany({
        take,
        skip,
        where: {
          name: { contains: name, mode: 'insensitive' },
          cpf: { contains: cpf, mode: 'insensitive' },
          rg: { contains: rg, mode: 'insensitive' },
        },
      });

      return users;
    } catch (error) {
      throw new BadRequestException(error, 'Erro ao listar usuários');
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      return user;
    } catch (error) {
      throw new BadRequestException(error, 'Erro ao buscar usuário');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDTO) {
    try {
      const userUpdated = await this.prisma.user.update({
        where: { id },
        data: { ...updateUserDto },
      });

      return userUpdated;
    } catch (error) {
      throw new BadRequestException(
        error,
        'Error ao tentar atualizar um usuário',
      );
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error, 'Erro ao tentar apagar um usuário');
    }
  }
}
