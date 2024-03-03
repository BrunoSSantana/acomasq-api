import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
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

import {
  CreatePaymentDTO,
  DeletePaymentByIdDTO,
  GetPaymentByIdDTO,
  GetPaymentsDTO,
  UpdatePaymentDTO,
  createPaymentSchema,
  deletePaymentByIdSchema,
  getPaymentByIdSchema,
  getPaymentsSchema,
  updatePaymentSchema,
} from '@/domains/payment/dto';
import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';
import { Payment } from '@/domains/payment/entities';
import {
  CreatePaymentService,
  DeletePaymentByIdService,
} from '@/domains/payment/services';
import { UpdatePaymentService } from '@/domains/payment/services/update-payment.service';
import { ListPaymentService } from '@/domains/payment/services/list-payment.service';
import { FindPaymentByIdService } from '@/domains/payment/services/find-payment-by-id.service';

@ApiTags('Payments')
@Controller('payment')
export class FindByIdPaymentController {
  constructor(
    private readonly createPaymentService: CreatePaymentService,
    private readonly findPaymentByIdService: FindPaymentByIdService,
    private readonly listPaymentService: ListPaymentService,
    private readonly updatePaymentService: UpdatePaymentService,
    private readonly deletePaymentByIdService: DeletePaymentByIdService,
  ) {}

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

  @Get()
  @ApiCreatedResponse({
    type: Array<Payment>,
  })
  @UsePipes(new ZodValidationPipe(getPaymentsSchema))
  findAll(@Query() listPaymentDto: GetPaymentsDTO) {
    return this.listPaymentService.execute(listPaymentDto);
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: Payment,
  })
  @UsePipes(new ZodValidationPipe(getPaymentByIdSchema))
  findOne(@Param('id') params: GetPaymentByIdDTO) {
    return this.findPaymentByIdService.execute(params.id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    type: Payment,
  })
  @UsePipes(new ZodValidationPipe(updatePaymentSchema))
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDTO) {
    return this.updatePaymentService.execute(id, updatePaymentDto);
  }

  @Delete(':id')
  @UsePipes(new ZodValidationPipe(deletePaymentByIdSchema))
  remove(@Param('id') params: DeletePaymentByIdDTO) {
    return this.deletePaymentByIdService.execute(params.id);
  }
}
