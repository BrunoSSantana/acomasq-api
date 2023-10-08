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
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

import {
  CreateAssociateDTO,
  GetAssociatesRequestDTO,
  UpdateAssociateDTO,
  createAssociateSchema,
  getAssociatesRequestSchema,
} from '@/domains/associate/dto';
import { CreateAssociateService } from '@/domains/associate/services/create-associate.service';
import { UpdateAssociateService } from '@/domains/associate/services/update-associate.service';
import { ListAssociateService } from '@/domains/associate/services/list-associate.service';
import { DeleteAssociateByIdService } from '@/domains/associate/services/delete-associate-by-id.service';
import { FindAssociateByIdService } from '@/domains/associate/services/find-associate-by-id.service';
import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';
import { Associate } from '@/domains/associate/entities/associate';

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
  @UsePipes(new ZodValidationPipe(createAssociateSchema))
  create(@Body() createAssociateDto: CreateAssociateDTO) {
    return this.createAssociateService.execute(createAssociateDto);
  }

  @Get()
  @UsePipes(new ZodValidationPipe(getAssociatesRequestSchema))
  findAll(@Query() listAssociateDto: GetAssociatesRequestDTO) {
    return this.listAssociateService.execute(listAssociateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findAssociateByIdService.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssociateDto: UpdateAssociateDTO,
  ) {
    return this.updateAssociateService.execute(id, updateAssociateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteAssociateByIdService.execute(id);
  }
}
