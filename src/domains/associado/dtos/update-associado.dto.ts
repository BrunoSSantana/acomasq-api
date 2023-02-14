import { PartialType } from '@nestjs/swagger';
import { CreateAssociadoDTO } from '@/domains/associado/dtos';

export class UpdateAssociadoDTO extends PartialType(CreateAssociadoDTO) {}
