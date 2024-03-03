import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';

import {
  GetAssociatesRequestDTO,
  getAssociatesRequestSchema,
} from '@/domains/associate/dto';
import { ListAssociateService } from '@/domains/associate/services/list-associate.service';

const findAssociateValidate = new ZodValidationPipe(getAssociatesRequestSchema);

@ApiTags('Associates')
@Controller('associate')
@ApiBearerAuth()
export class FindAllAssociateController {
  constructor(private readonly listAssociateService: ListAssociateService) {}

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
}
