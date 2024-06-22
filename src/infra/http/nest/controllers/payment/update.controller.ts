import { Body, Controller, Param, Patch, UsePipes } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";

import { UpdatePaymentDTO, updatePaymentSchema } from "@/domains/payment/dto";
import { Payment } from "@/domains/payment/entities";
import { ZodValidationPipe } from "@/infra/http/nest/@config/pipes/zod-validation-pipe";

import { UpdatePaymentService } from "@/domains/payment/services/update-payment.service";

@ApiTags("Payments")
@Controller("payment")
@ApiBearerAuth()
export class UpdatePaymentController {
  constructor(private readonly updatePaymentService: UpdatePaymentService) {}

  @Patch(":id")
  @ApiCreatedResponse({
    type: Payment,
  })
  @UsePipes(new ZodValidationPipe(updatePaymentSchema))
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDTO) {
    return this.updatePaymentService.execute(id, updatePaymentDto);
  }
}
