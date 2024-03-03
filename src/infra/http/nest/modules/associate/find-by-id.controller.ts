import { z } from 'zod';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';

import { findAssociateByIdSchema } from '@/domains/associate/dto';
import { FindAssociateByIdService } from '@/domains/associate/services/find-associate-by-id.service';

const associateByIdValidate = new ZodValidationPipe(findAssociateByIdSchema);

type AssociateById = z.infer<typeof findAssociateByIdSchema>;
@ApiTags('Associates')
@Controller('associate')
export class FindByIdAssociateController {
  constructor(
    private readonly findAssociateByIdService: FindAssociateByIdService,
  ) {}

  @Get(':id')
  @UsePipes(associateByIdValidate)
  findById(@Param(associateByIdValidate) associateById: AssociateById) {
    return this.findAssociateByIdService.execute(associateById.id);
  }
}
