import {
  CreatePagamentoDTO,
  ListPagamentoDto,
  UpdatePagamentoDTO,
} from '../../../../domains/pagamento/dtos';
import { PrismaService } from '../../../../infra/repositories/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class PagamentoService {
  constructor(private prisma: PrismaService) {}

  async create(createPagamentoDto: CreatePagamentoDTO) {
    const { month, userId, year } = createPagamentoDto;

    try {
      const pagamento = await this.prisma.pagamento.create({
        data: {
          id: randomUUID(),
          month,
          userId,
          year,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return pagamento;
    } catch (error) {
      throw new BadRequestException(error, 'Erro ao tentar criar pagamento');
    }
  }

  async findAll(listPagamentoDto: ListPagamentoDto) {
    try {
      const { skip, take, month, username, year } = listPagamentoDto;

      const pagamentos = await this.prisma.pagamento.findMany({
        take,
        skip,
        where: {
          month: month && +month,
          year: year && +year,
          user: {
            name: { contains: username, mode: 'insensitive' },
          },
        },
      });

      return pagamentos;
    } catch (error) {
      throw new BadRequestException(error, 'Erro ao listar pagamentos');
    }
  }

  async findOne(id: string) {
    try {
      const pagamento = await this.prisma.pagamento.findUnique({
        where: { id },
      });

      return pagamento;
    } catch (error) {
      throw new BadRequestException(
        error,
        'Error ao tentar buscar um pagamento ',
      );
    }
  }

  async update(id: string, updatePagamentoDTO: UpdatePagamentoDTO) {
    try {
      const pagamentoUpdated = await this.prisma.pagamento.update({
        where: { id },
        data: updatePagamentoDTO,
      });

      return pagamentoUpdated;
    } catch (error) {
      throw new BadRequestException(
        error,
        'Erro ao tentar atualizar um pagamento',
      );
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.pagamento.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Erro ao tentar apagar um pagamento');
    }
  }
}
