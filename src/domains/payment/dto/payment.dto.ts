import { z } from 'zod';

export const PaymentSchema = z.object({
  id: z.string().uuid(),
  month: z.number().min(1).max(12),
  year: z.number().min(1900).max(2100),
  associateId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PaymentDTO = z.infer<typeof PaymentSchema>;

export const createPaymentSchema = PaymentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreatePaymentDTO = z.infer<typeof createPaymentSchema>;

export const updatePaymentSchema = PaymentSchema.omit({
  createdAt: true,
  associateId: true,
});

export type UpdatePaymentDTO = z.infer<typeof updatePaymentSchema>;

export const getPaymentByIdSchema = z.object({
  id: z.string().uuid(),
});

export type GetPaymentByIdDTO = z.infer<typeof getPaymentByIdSchema>;

export const getPaymentsSchema = PaymentSchema.omit({
  createdAt: true,
  updatedAt: true,
}).partial();

export type GetPaymentsDTO = z.infer<typeof getPaymentsSchema>;

export const deletePaymentByIdSchema = z.object({
  id: z.string().uuid(),
});

export type DeletePaymentByIdDTO = z.infer<typeof deletePaymentByIdSchema>;
