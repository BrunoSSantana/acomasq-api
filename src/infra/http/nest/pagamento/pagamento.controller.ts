import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatePagamentoDTO,
  // CreatePagamentoDTO,
  ListPagamentoDto,
  UpdatePagamentoDto,
} from '@/domains/pagamento/dtos';
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
import { PagamentoService } from './pagamento.service';
import { Pagamento } from '@/domains/pagamento/entities/pagamento.entity';

@ApiTags('Pagamentos')
@Controller('pagamento')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post()
  @ApiCreatedResponse({
    type: Pagamento,
  })
  create(@Body() createPagamentoDto: CreatePagamentoDTO) {
    return this.pagamentoService.create(createPagamentoDto);
  }

  @Get()
  findAll(@Query() listPagamentoDto: ListPagamentoDto) {
    return this.pagamentoService.findAll(listPagamentoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagamentoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePagamentoDto: UpdatePagamentoDto,
  ) {
    return this.pagamentoService.update(id, updatePagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentoService.remove(id);
  }
}
