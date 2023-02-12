import {
  CreatePagamentoDTO,
  ListPagamentoDto,
  UpdatePagamentoDto,
} from '@/domains/pagamento/dtos';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class PagamentoService {
  constructor(private prisma: PrismaService) {}

  create(createPagamentoDto: CreatePagamentoDTO) {
    const { month, userId, year } = createPagamentoDto;

    return this.prisma.pagamento.create({
      data: {
        id: randomUUID(),
        month,
        userId,
        year,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  findAll(listPagamentoDto: ListPagamentoDto) {
    const { skip, take, month, username, year } = listPagamentoDto;

    return this.prisma.pagamento.findMany({
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
  }

  findOne(id: string) {
    return this.prisma.pagamento.findUnique({ where: { id } });
  }

  update(id: string, updatePagamentoDto: UpdatePagamentoDto) {
    return this.prisma.pagamento.update({
      where: { id },
      data: { ...updatePagamentoDto },
    });
  }

  remove(id: string) {
    return this.prisma.pagamento.delete({ where: { id } });
  }
}
