import { CreatePaymentDTO } from "@/domains/payment/dto";
import { Payment } from "@/domains/payment/entities";
import { IPaymentRepositoryPort } from "@/domains/payment/repositories";
import { ConflictException } from "@nestjs/common";

export class CreatePaymentService {
  constructor(private readonly repository: IPaymentRepositoryPort) {
    this.repository = repository;
  }
  async execute(createPaymentDto: CreatePaymentDTO) {
    const { month, associateId, year } = createPaymentDto;

    const paymentExists = await this.repository.findMany({
      filters: {
        associateId,
        month,
        year,
      },
    });

    if (paymentExists.length) {
      throw new ConflictException({
        message: "Já existe um pagamento para esse mês",
        provider: "CreatePaymentService.execute",
      })
    }

    const payment = Payment.create({
      month,
      associateId,
      year,
    });

    await this.repository.create(payment);
  }
}
