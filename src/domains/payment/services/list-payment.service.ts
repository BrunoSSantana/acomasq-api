import { GetPaymentsDTO } from '@/domains/payment/dto';
import { IPaymentRepositoryPort } from '@/domains/payment/ports';

export class ListPaymentService {
  constructor(private repository: IPaymentRepositoryPort) {}

  async execute(listPaymentDto: GetPaymentsDTO) {
    const { associateId, month, year } = listPaymentDto;

    const payment = await this.repository.findMany({
      filters: {
        associateId,
        month,
        year,
      },
    });

    return payment;
  }
}
