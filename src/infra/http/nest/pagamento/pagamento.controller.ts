import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
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
import { PagamentoService } from '@/infra/http/nest/pagamento/pagamento.service';
import {
  CreatePagamentoDTO,
  ListPagamentoDto,
  UpdatePagamentoDTO,
} from '@/domains/pagamento/dtos';
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
    @Body() updatePagamentoDto: UpdatePagamentoDTO,
  ) {
    return this.pagamentoService.update(id, updatePagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentoService.remove(id);
  }
}
