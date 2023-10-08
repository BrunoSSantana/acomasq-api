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

import { PaymentService } from '@/infra/http/nest/modules/payment/payment.service';
import {
  CreatePaymentDTO,
  ListPaymentDto,
  UpdatePaymentDTO,
  createPaymentSchema,
} from '@/domains/payment/dtos';
import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';
import { Payment } from '@/domains/payment/entities';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  @ApiCreatedResponse({
    type: Payment,
  })
  @UsePipes(new ZodValidationPipe(createPaymentSchema))
  create(@Body() createPaymentDto: CreatePaymentDTO) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiCreatedResponse({
    type: Array<Payment>,
  })
  findAll(@Query() listPaymentDto: ListPaymentDto) {
    return this.paymentService.findAll(listPaymentDto);
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: Payment,
  })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    type: Payment,
  })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDTO) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
