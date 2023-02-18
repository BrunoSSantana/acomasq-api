import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';
import {
  CreateAssociateDTO,
  ListAssociateDto,
  UpdateAssociateDTO,
} from '@/domains/associate/dtos';

@Injectable()
export class AssociateService {
  constructor(private repository: PrismaService) {}

  async create(createAssociateDto: CreateAssociateDTO) {
    const { cpf, name, rg } = createAssociateDto;

    try {
      const associate = await this.repository.associate.create({
        data: {
          id: randomUUID(),
          rg,
          name,
          cpf,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return associate;
    } catch (error) {
      throw new BadRequestException(
        error,
        'Erro ao tentar cria um novo usuário',
      );
    }
  }

  async findAll(listAssociateDto: ListAssociateDto) {
    const { skip, take, cpf, name, rg } = listAssociateDto;

    try {
      const users = await this.repository.associate.findMany({
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
      const associate = await this.repository.associate.findUnique({
        where: { id },
      });

      return associate;
    } catch (error) {
      throw new BadRequestException(error, 'Erro ao buscar usuário');
    }
  }

  async update(id: string, updateAssociateDto: UpdateAssociateDTO) {
    try {
      const userUpdated = await this.repository.associate.update({
        where: { id },
        data: { ...updateAssociateDto },
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
      await this.repository.associate.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error, 'Erro ao tentar apagar um usuário');
    }
  }
}
