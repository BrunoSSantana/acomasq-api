import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateAssociateDTO,
  ListAssociateDto,
  UpdateAssociateDTO,
} from '@/domains/associate/dtos';
import { CreateAssociateService } from '@/domains/associate/services/create-associate.service';
import { UpdateAssociateService } from '@/domains/associate/services/update-associate.service';
import { ListAssociateService } from '@/domains/associate/services/list-associate.service';
import { DeleteAssociateByIdService } from '@/domains/associate/services/delete-associate-by-id.service';
import { FindAssociateByIdService } from '@/domains/associate/services/find-associate-by-id.service';

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
  create(@Body() createAssociateDto: CreateAssociateDTO) {
    return this.createAssociateService.execute(createAssociateDto);
  }

  @Get()
  findAll(@Query() listAssociateDto: ListAssociateDto) {
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
