import { z } from 'zod';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiCreatedResponse,
  ApiQuery,
} from '@nestjs/swagger';

import {
  CreateAssociateDTO,
  GetAssociatesRequestDTO,
  UpdateAssociateDTO,
  createAssociateSchema,
  findAssociateByIdSchema,
  getAssociatesRequestSchema,
  updateAssociateSchema,
} from '@/domains/associate/dto';
import { CreateAssociateService } from '@/domains/associate/services/create-associate.service';
import { UpdateAssociateService } from '@/domains/associate/services/update-associate.service';
import { ListAssociateService } from '@/domains/associate/services/list-associate.service';
import { DeleteAssociateByIdService } from '@/domains/associate/services/delete-associate-by-id.service';
import { FindAssociateByIdService } from '@/domains/associate/services/find-associate-by-id.service';
import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';
import { Associate } from '@/domains/associate/entities/associate';

const createAssociateValidate = new ZodValidationPipe(createAssociateSchema);
const associateByIdValidate = new ZodValidationPipe(findAssociateByIdSchema);
const findAssociateValidate = new ZodValidationPipe(getAssociatesRequestSchema);
const updateAssociateValidate = new ZodValidationPipe(updateAssociateSchema);

type AssociateById = z.infer<typeof findAssociateByIdSchema>;
@ApiTags('Associates')
@Controller('associate')
export class AssociateController {
  constructor(
    private readonly createAssociateService: CreateAssociateService,
    private readonly updateAssociateService: UpdateAssociateService,
    private readonly listAssociateService: ListAssociateService,
    private readonly deleteAssociateByIdService: DeleteAssociateByIdService,
    private readonly findAssociateByIdService: FindAssociateByIdService,
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

  @Get()
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'cpf',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'rg',
    required: false,
    type: String,
  })
  @UsePipes(findAssociateValidate)
  findAll(@Query() listAssociateDto: GetAssociatesRequestDTO) {
    return this.listAssociateService.execute(listAssociateDto);
  }

  @Get(':id')
  @UsePipes(associateByIdValidate)
  findOne(@Param(associateByIdValidate) associateById: AssociateById) {
    return this.findAssociateByIdService.execute(associateById.id);
  }

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

  @Delete(':id')
  @UsePipes(associateByIdValidate)
  @HttpCode(204)
  remove(@Param(associateByIdValidate) associateById: AssociateById) {
    return this.deleteAssociateByIdService.execute(associateById.id);
  }
}
