import { z } from 'zod';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Param, Delete, UsePipes, HttpCode } from '@nestjs/common';

import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';

import { findAssociateByIdSchema } from '@/domains/associate/dto';
import { DeleteAssociateByIdService } from '@/domains/associate/services/delete-associate-by-id.service';

const associateByIdValidate = new ZodValidationPipe(findAssociateByIdSchema);

type AssociateById = z.infer<typeof findAssociateByIdSchema>;
@ApiTags('Associates')
@Controller('associate')
@ApiBearerAuth()
export class DeleteAssociateController {
  constructor(
    private readonly deleteAssociateByIdService: DeleteAssociateByIdService,
  ) {}

  @Delete(':id')
  @UsePipes(associateByIdValidate)
  @HttpCode(204)
  remove(@Param(associateByIdValidate) associateById: AssociateById) {
    return this.deleteAssociateByIdService.execute(associateById.id);
  }
}
