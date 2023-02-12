import { CreateUserDto, ListUserDto, UpdateUserDto } from '@/domains/user/dtos';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const { cpf, name, rg } = createUserDto;

    return this.prisma.user.create({
      data: {
        id: randomUUID(),
        rg,
        name,
        cpf,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  findAll(listUserDto: ListUserDto) {
    const { skip, take, cpf, name, rg } = listUserDto;
    return this.prisma.user.findMany({
      take,
      skip,
      where: {
        name: { contains: name, mode: 'insensitive' },
        cpf: { contains: cpf, mode: 'insensitive' },
        rg: { contains: rg, mode: 'insensitive' },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
