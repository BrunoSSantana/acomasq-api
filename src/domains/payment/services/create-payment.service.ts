import { Payment } from '@/domains/payment/entities';
import { CreatePaymentDTO } from '@/domains/payment/dto';
import { IPaymentRepositoryPort } from '@/domains/payment/repositories';

export class CreatePaymentService {
  constructor(private readonly repository: IPaymentRepositoryPort) {
    this.repository = repository;
  }
  async execute(createPaymentDto: CreatePaymentDTO) {
    const { month, associateId, year } = createPaymentDto;

    const payment = Payment.create({
      month,
      associateId,
      year,
    });

    await this.repository.create(payment);
  }
}
