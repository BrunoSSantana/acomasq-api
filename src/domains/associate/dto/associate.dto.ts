import { z } from 'zod';
import { PaymentSchema } from '@/domains/payment/dto';

export const AssociateSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  cpf: z.string(),
  rg: z.string(),
  payments: z.array(PaymentSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AssociateDTO = z.infer<typeof AssociateSchema>;

export const createAssociateSchema = AssociateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  payments: true,
});

export type CreateAssociateDTO = z.infer<typeof createAssociateSchema>;

export const updateAssociateSchema = AssociateSchema.omit({
  createdAt: true,
  payments: true,
});

export type UpdateAssociateDTO = z.infer<typeof updateAssociateSchema>;

export const getAssociatesRequestSchema = z.object({
  name: z.string().optional(),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  take: z.coerce.number().optional().default(10),
  skip: z.coerce.number().optional().default(0),
});

export type GetAssociatesRequestDTO = z.infer<
  typeof getAssociatesRequestSchema
>;
