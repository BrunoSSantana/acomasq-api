import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, UsePipes } from '@nestjs/common';

import { CreatePaymentDTO, createPaymentSchema } from '@/domains/payment/dto';
import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';
import { Payment } from '@/domains/payment/entities';
import { CreatePaymentService } from '@/domains/payment/services';

@ApiTags('Payments')
@Controller('payment')
export class CreatePaymentController {
  constructor(private readonly createPaymentService: CreatePaymentService) {}

  @Post()
  @ApiBody({
    type: Payment,
    schema: {
      properties: {
        name: { type: 'string' },
        cpf: { type: 'string' },
        rg: { type: 'string' },
      },
      required: ['name', 'cpf', 'rg'],
    },
    examples: {
      'Payment 1': {
        value: {
          name: 'Payment 1',
          cpf: '12345678901',
          rg: '123456789',
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: Payment,
  })
  @UsePipes(new ZodValidationPipe(createPaymentSchema))
  create(@Body() createPaymentDto: CreatePaymentDTO) {
    return this.createPaymentService.execute(createPaymentDto);
  }
}
