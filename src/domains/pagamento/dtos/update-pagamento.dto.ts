import { OmitType, PartialType } from '@nestjs/swagger';
import { CreatePagamentoDTO } from '@/domains/pagamento/dtos';

export class UpdatePagamentoDTO extends PartialType(
  OmitType(CreatePagamentoDTO, ['userId'] as const),
) {}
