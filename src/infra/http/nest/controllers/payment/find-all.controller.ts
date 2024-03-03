import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';

import { Payment } from '@/domains/payment/entities';
import { GetPaymentsDTO, getPaymentsSchema } from '@/domains/payment/dto';
import { ListPaymentService } from '@/domains/payment/services/list-payment.service';

@ApiTags('Payments')
@Controller('payment')
export class FindAllPaymentController {
  constructor(private readonly listPaymentService: ListPaymentService) {}

  @Get()
  @ApiCreatedResponse({
    type: Array<Payment>,
  })
  @UsePipes(new ZodValidationPipe(getPaymentsSchema))
  findAll(@Query() listPaymentDto: GetPaymentsDTO) {
    return this.listPaymentService.execute(listPaymentDto);
  }
}
