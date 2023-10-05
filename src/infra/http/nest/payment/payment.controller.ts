import { ZodValidationPipe } from '@anatine/zod-nestjs';

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
  UsePipes,
} from '@nestjs/common';

import { PaymentService } from '@/infra/http/nest/payment/payment.service';
import {
  GetPaymentsDTO,
  ListPaymentDto,
  PaymentDTO,
  UpdatePaymentDTO,
  UpdatePaymentResponseDTO,
} from '@/domains/payment/dtos';

@ApiTags('Payments')
@Controller('payment')
@UsePipes(ZodValidationPipe)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiCreatedResponse({
    type: PaymentDTO,
  })
  create(@Body() createPaymentDto: PaymentDTO) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiCreatedResponse({
    type: GetPaymentsDTO,
  })
  findAll(@Query() listPaymentDto: ListPaymentDto) {
    return this.paymentService.findAll(listPaymentDto);
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: PaymentDTO,
  })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    type: UpdatePaymentResponseDTO,
  })
  update(@Param('id') id: string, @Body() updatePaymentDto: PaymentDTO) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
