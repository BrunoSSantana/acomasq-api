import { z } from 'zod';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Patch, Param, HttpCode } from '@nestjs/common';

import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';

import {
  UpdateAssociateDTO,
  findAssociateByIdSchema,
  updateAssociateSchema,
} from '@/domains/associate/dto';
import { Associate } from '@/domains/associate/entities/associate';
import { UpdateAssociateService } from '@/domains/associate/services/update-associate.service';

const updateAssociateValidate = new ZodValidationPipe(updateAssociateSchema);
const associateByIdValidate = new ZodValidationPipe(findAssociateByIdSchema);

type AssociateById = z.infer<typeof findAssociateByIdSchema>;
@ApiTags('Associates')
@Controller('associate')
@ApiBearerAuth()
export class UpdateAssociateController {
  constructor(
    private readonly updateAssociateService: UpdateAssociateService,
  ) {}

  @Patch(':id')
  @ApiBody({
    type: Associate,
    schema: {
      properties: {
        name: { type: 'string' },
        cpf: { type: 'string' },
        rg: { type: 'string' },
      },
      required: ['name', 'cpf', 'rg'],
    },
    examples: {
      'Associate 1': {
        value: {
          name: 'Associate 1',
          cpf: '12345678901',
          rg: '123456789',
        },
      },
    },
  })
  @HttpCode(204)
  async update(
    @Param(associateByIdValidate) associateById: AssociateById,
    @Body(updateAssociateValidate) updateAssociateDto: UpdateAssociateDTO,
  ) {
    await this.updateAssociateService.execute(
      associateById.id,
      updateAssociateDto,
    );
  }
}
