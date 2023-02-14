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
  CreateAssociadoDTO,
  ListAssociadoDto,
  UpdateAssociadoDTO,
} from '@/domains/associado/dtos';
import { AssociadoService } from '@/infra/http/nest/associado/associado.service';

@ApiTags('Usuarios')
@Controller('associado')
export class AssociadoController {
  constructor(private readonly userService: AssociadoService) {}

  @Post()
  create(@Body() createAssociadoDto: CreateAssociadoDTO) {
    return this.userService.create(createAssociadoDto);
  }

  @Get()
  findAll(@Query() listAssociadoDto: ListAssociadoDto) {
    return this.userService.findAll(listAssociadoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssociadoDto: UpdateAssociadoDTO,
  ) {
    return this.userService.update(id, updateAssociadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
