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

class PaymentDTO {
  id: string;
  month: number;
  year: number;
  associateId: string;
  createdAt: Date;
  updatedAt: Date;
}

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  @ApiCreatedResponse({
    type: PaymentDTO,
  })
  @UsePipes(new ZodValidationPipe(createPaymentSchema))
  create(@Body() createPaymentDto: CreatePaymentDTO) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiCreatedResponse({
    type: Array<PaymentDTO>,
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
    type: PaymentDTO,
  })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDTO) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
