import { z } from 'zod';
import { PaymentSchema } from '@/domains/payment/dto';
import { RGRegex, isValidCPF } from '../entities/associate';

export const AssociateSchema = z.object({
  id: z.string().uuid({ message: 'UUID is not valid' }),
  name: z.string(),
  cpf: z.string().refine(isValidCPF, { message: 'this cpf is not valid' }),
  rg: z.string().regex(RGRegex, { message: 'this RG is not valid' }),
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

export const updateAssociateSchema = z.object({
  name: z.string().nullish(),
  cpf: z
    .string()
    .refine(isValidCPF, { message: 'this cpf is not valid' })
    .nullish(),
  rg: z.string().regex(RGRegex, { message: 'this RG is not valid' }).nullish(),
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

export const findAssociateByIdSchema = AssociateSchema.pick({ id: true });
