import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  CreatePaymentDTO,
  // ListPaymentDto,
  UpdatePaymentDTO,
} from '@/domains/payment/dto';
import { PrismaService } from '@/infra/repositories/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDTO) {
    const { month, associateId, year } = createPaymentDto;

    try {
      const payment = await this.prisma.payment.create({
        data: {
          id: randomUUID(),
          month,
          associateId,
          year,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return payment;
    } catch (error) {
      throw new BadRequestException(error, 'Erro ao tentar criar payment');
    }
  }

  // async findAll(listPaymentDto: ListPaymentDto) {
  //   try {
  //     const { skip, take, month, username, year } = listPaymentDto;

  //     const payments = await this.prisma.payment.findMany({
  //       take,
  //       skip,
  //       where: {
  //         month: month && +month,
  //         year: year && +year,
  //         associate: {
  //           name: { contains: username, mode: 'insensitive' },
  //         },
  //       },
  //     });

  //     return payments;
  //   } catch (error) {
  //     throw new BadRequestException(error, 'Erro ao listar payments');
  //   }
  // }

  async findOne(id: string) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: { id },
      });

      return payment;
    } catch (error) {
      throw new BadRequestException(
        error,
        'Error ao tentar buscar um payment ',
      );
    }
  }

  async update(id: string, updatePaymentDTO: UpdatePaymentDTO) {
    try {
      const paymentUpdated = await this.prisma.payment.update({
        where: { id },
        data: updatePaymentDTO,
      });

      return paymentUpdated;
    } catch (error) {
      throw new BadRequestException(
        error,
        'Erro ao tentar atualizar um payment',
      );
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.payment.delete({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Erro ao tentar apagar um payment');
    }
  }
}
