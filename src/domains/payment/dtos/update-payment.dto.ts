import { OmitType, PartialType } from '@nestjs/swagger';
import { CreatePaymentDTO } from '@/domains/payment/dtos';

export class UpdatePaymentDTO extends PartialType(
  OmitType(CreatePaymentDTO, ['associateId'] as const),
) {}
