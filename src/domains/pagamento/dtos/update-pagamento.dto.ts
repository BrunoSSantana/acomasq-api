import { OmitType, PartialType } from '@nestjs/swagger';
import { CreatePagamentoDTO } from './create-pagamento.dto';

export class UpdatePagamentoDTO extends PartialType(
  OmitType(CreatePagamentoDTO, ['userId'] as const),
) {}
