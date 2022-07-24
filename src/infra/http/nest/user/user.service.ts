import { CreateUserDto } from '@/domains/user/dto/create-user.dto';
import { UpdateUserDto } from '@/domains/user/dto/update-user.dto';
import { PrismaRepository } from '@/infra/repositories/prisma/prisma.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly repository: PrismaRepository) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
