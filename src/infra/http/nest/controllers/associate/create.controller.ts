import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ApiBody, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';

import {
  CreateAssociateDTO,
  createAssociateSchema,
} from '@/domains/associate/dto';
import { Associate } from '@/domains/associate/entities/associate';
import { CreateAssociateService } from '@/domains/associate/services/create-associate.service';

const createAssociateValidate = new ZodValidationPipe(createAssociateSchema);

@ApiTags('Associates')
@Controller('associate')
export class CreateAssociateController {
  constructor(
    private readonly createAssociateService: CreateAssociateService,
  ) {}

  @Post()
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
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Associate,
  })
  @UsePipes(createAssociateValidate)
  create(@Body() createAssociateDto: CreateAssociateDTO) {
    return this.createAssociateService.execute(createAssociateDto);
  }
}
