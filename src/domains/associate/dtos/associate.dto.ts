import { PaymentZ } from '@/domains/payment/dtos';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
export class CreateAssociateDTO {
  name: string;
  cpf: string;
  rg?: string;
}

export const AssociateZ = extendApi(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    cpf: z.string(),
    rg: z.string(),
    payments: z.array(PaymentZ),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  {
    title: 'Associate',
    description: 'A associate',
  },
);

export class AssociateDTO extends createZodDto(AssociateZ) {}

export class UpdateAssociateDTO extends createZodDto(
  AssociateZ.omit({ createdAt: true, payments: true, updatedAt: true }),
) {}

export const GetAssociatesRequestZ = extendApi(
  z.object({
    skip: extendApi(z.number(), {
      description: 'pagination skip',
    }),
    take: extendApi(z.number(), {
      description: 'pagination take',
      default: 10,
      minimum: 1,
      maximum: 100,
      example: 10,
      required: ['take is required'],
    }),
    name: extendApi(z.string(), {
      description: 'associate name',
      example: 'John Doe',
      minLength: 3,
      maxLength: 255,
      pattern: '^[a-zA-Z0-9 ]*$',
    }),
    cpf: extendApi(z.string(), {
      description: 'associate cpf',
      example: '000.000.000-00',
      minLength: 11,
      maxLength: 11,
      required: ['cpf is required'],
      pattern: '^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}$',
    }),
    rg: extendApi(z.string(), {
      description: 'associate rg',
      example: '00.000.000-0',
      minLength: 9,
      maxLength: 9,
      required: ['rg is required'],
    }),
  }),
  { title: 'Get Associate Response' },
);

export const GetAssociatesResponseZ = extendApi(
  z.object({
    associates: extendApi(z.array(AssociateZ), {
      description: 'List of associates',
    }),
  }),
  { title: 'Get Associate Response' },
);

export class GetAssociatesResponseDTO extends createZodDto(
  GetAssociatesResponseZ,
) {}

export class GetAssociatesRequestDTO extends createZodDto(
  GetAssociatesRequestZ,
) {}

export const CreateAssociateResponseZ = z.object({
  success: z.boolean(),
  message: z.string(),
  associate: AssociateZ,
});

export class CreateAssociateResponseDTO extends createZodDto(
  CreateAssociateResponseZ,
) {}

export class UpdateAssociateResponseDTO extends createZodDto(
  CreateAssociateResponseZ.omit({ associate: true }),
) {}
