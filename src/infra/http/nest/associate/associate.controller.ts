import { ApiTags } from '@nestjs/swagger';
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
import {
  CreateAssociateDTO,
  ListAssociateDto,
  UpdateAssociateDTO,
} from '@/domains/associate/dtos';
import { AssociateService } from '@/infra/http/nest/associate/associate.service';

@ApiTags('Usuarios')
@Controller('associate')
export class AssociateController {
  constructor(private readonly userService: AssociateService) {}

  @Post()
  create(@Body() createAssociateDto: CreateAssociateDTO) {
    return this.userService.create(createAssociateDto);
  }

  @Get()
  findAll(@Query() listAssociateDto: ListAssociateDto) {
    return this.userService.findAll(listAssociateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssociateDto: UpdateAssociateDTO,
  ) {
    return this.userService.update(id, updateAssociateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
