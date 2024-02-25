import { Injectable } from '@nestjs/common';
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
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUniqueOrThrow({
      where: { id },
    });

    return payment;
  }

  async update(id: string, updatePaymentDTO: UpdatePaymentDTO) {
    const paymentUpdated = await this.prisma.payment.update({
      where: { id },
      data: updatePaymentDTO,
    });

    return paymentUpdated;
  }

  async remove(id: string) {
    await this.prisma.payment.delete({ where: { id } });
  }
}
