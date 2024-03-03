import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Param, Delete, UsePipes } from '@nestjs/common';

import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';

import {
  DeletePaymentByIdDTO,
  deletePaymentByIdSchema,
} from '@/domains/payment/dto';
import { DeletePaymentByIdService } from '@/domains/payment/services';

@ApiTags('Payments')
@Controller('payment')
@ApiBearerAuth()
export class DeletePaymentController {
  constructor(
    private readonly deletePaymentByIdService: DeletePaymentByIdService,
  ) {}

  @Delete(':id')
  @UsePipes(new ZodValidationPipe(deletePaymentByIdSchema))
  remove(@Param('id') params: DeletePaymentByIdDTO) {
    return this.deletePaymentByIdService.execute(params.id);
  }
}
