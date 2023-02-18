import { PartialType } from '@nestjs/swagger';
import { CreateAssociateDTO } from '@/domains/associate/dtos';

export class UpdateAssociateDTO extends PartialType(CreateAssociateDTO) {}
