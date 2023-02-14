import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';
import {
  CreateAssociadoDTO,
  ListAssociadoDto,
  UpdateAssociadoDTO,
} from '@/domains/associado/dtos';

@Injectable()
export class AssociadoService {
  constructor(private prisma: PrismaService) {}

  async create(createAssociadoDto: CreateAssociadoDTO) {
    const { cpf, name, rg } = createAssociadoDto;

    try {
      const associado = await this.prisma.associado.create({
        data: {
          id: randomUUID(),
          rg,
          name,
          cpf,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return associado;
    } catch (error) {
      throw new BadRequestException(
        error,
        'Erro ao tentar cria um novo usuário',
      );
    }
  }

  async findAll(listAssociadoDto: ListAssociadoDto) {
    const { skip, take, cpf, name, rg } = listAssociadoDto;

    try {
      const users = await this.prisma.associado.findMany({
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
      const associado = await this.prisma.associado.findUnique({
        where: { id },
      });

      return associado;
    } catch (error) {
      throw new BadRequestException(error, 'Erro ao buscar usuário');
    }
  }

  async update(id: string, updateAssociadoDto: UpdateAssociadoDTO) {
    try {
      const userUpdated = await this.prisma.associado.update({
        where: { id },
        data: { ...updateAssociadoDto },
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
      await this.prisma.associado.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error, 'Erro ao tentar apagar um usuário');
    }
  }
}
