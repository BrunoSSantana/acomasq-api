import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UsePipes } from '@nestjs/common';

import { GetPaymentByIdDTO, getPaymentByIdSchema } from '@/domains/payment/dto';
import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';
import { Payment } from '@/domains/payment/entities';

import { FindPaymentByIdService } from '@/domains/payment/services/find-payment-by-id.service';

@ApiTags('Payments')
@Controller('payment')
@ApiBearerAuth()
export class FindByIdPaymentController {
  constructor(
    private readonly findPaymentByIdService: FindPaymentByIdService,
  ) {}

  @Get(':id')
  @ApiCreatedResponse({
    type: Payment,
  })
  @UsePipes(new ZodValidationPipe(getPaymentByIdSchema))
  findOne(@Param('id') params: GetPaymentByIdDTO) {
    return this.findPaymentByIdService.execute(params.id);
  }
}
