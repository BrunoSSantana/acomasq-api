import { PartialType } from '@nestjs/mapped-types';
import { CreatePagamentoDto } from '@/domains/pagamento/dtos';

export class UpdatePagamentoDto extends PartialType(CreatePagamentoDto) {}
