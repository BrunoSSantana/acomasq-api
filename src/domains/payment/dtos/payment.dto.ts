import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const PaymentZ = extendApi(
  z.object({
    id: z.string().uuid(),
    month: z.number().min(1).max(12),
    year: z.number().min(1900).max(2100),
    associateId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  {
    title: 'Payment',
    description: 'A payment',
  },
);

export class PaymentDTO extends createZodDto(PaymentZ) {}

export class UpdatePaymentDTO extends createZodDto(
  PaymentZ.omit({ createdAt: true, associateId: true }),
) {}

export const GetPaymentsZ = extendApi(
  z.object({
    payments: extendApi(z.array(PaymentZ), {
      description: 'List of payments',
    }),
  }),
  { title: 'Get Payment Response' },
);

export class GetPaymentsDTO extends createZodDto(GetPaymentsZ) {}

export const CreatePaymentResponseZ = z.object({
  success: z.boolean(),
  message: z.string(),
  payment: PaymentZ,
});

export class CreatePaymentResponseDTO extends createZodDto(
  CreatePaymentResponseZ,
) {}

export class UpdatePaymentResponseDTO extends createZodDto(
  CreatePaymentResponseZ.omit({ payment: true }),
) {}
