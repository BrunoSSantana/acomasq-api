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
import { PaymentService } from '@/infra/http/nest/payment/payment.service';
import {
  CreatePaymentDTO,
  ListPaymentDto,
  UpdatePaymentDTO,
} from '@/domains/payment/dtos';
import { Payment } from '@/domains/payment/entities/payment';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiCreatedResponse({
    type: Payment,
  })
  create(@Body() createPaymentDto: CreatePaymentDTO) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll(@Query() listPaymentDto: ListPaymentDto) {
    return this.paymentService.findAll(listPaymentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDTO) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
