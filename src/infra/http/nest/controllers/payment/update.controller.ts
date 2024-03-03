import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Body, Patch, Param, UsePipes } from '@nestjs/common';

import { UpdatePaymentDTO, updatePaymentSchema } from '@/domains/payment/dto';
import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';
import { Payment } from '@/domains/payment/entities';

import { UpdatePaymentService } from '@/domains/payment/services/update-payment.service';

@ApiTags('Payments')
@Controller('payment')
@ApiBearerAuth()
export class UpdatePaymentController {
  constructor(private readonly updatePaymentService: UpdatePaymentService) {}

  @Patch(':id')
  @ApiCreatedResponse({
    type: Payment,
  })
  @UsePipes(new ZodValidationPipe(updatePaymentSchema))
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDTO) {
    return this.updatePaymentService.execute(id, updatePaymentDto);
  }
}
