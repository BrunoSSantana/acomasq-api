// import { createZodDto } from '@anatine/zod-nestjs';
// import { extendApi } from '@anatine/zod-openapi';
// import { z } from 'zod';

// const pagamentoSchema = z.object({
//   month: z.number().gt(0, 'Mês escolhido inválido'),
//   year: z.number().gte(2000),
//   userId: z.string().uuid().default(''),
// });

// type PagamentoDTOType = z.output<typeof pagamentoSchema>;

// export const PagamentoZ = extendApi(pagamentoSchema);

// export class CreatePagamentoZodDTO extends createZodDto(PagamentoZ) {}

// // export class UpdatePagamentoDto extends createZodDto(
// //   PagamentoZ.omit({ userId: true }),
// // ) {}

// // export const GetPagamentosZ = extendApi(
// //   z.object({
// //     cats: extendApi(z.array(z.string()), { description: 'List of cats' }),
// //   }),
// //   { title: 'Get Pagamento Response' },
// // );

// // // export class GetPagamentosDto extends createZodDto(GetPagamentosZ) {}

// // export const CreatePagamentoResponseZ = z.object({
// //   success: z.boolean(),
// //   message: z.string(),
// //   name: z.string(),
// // });

// // export class CreatePagamentoResponseDto extends createZodDto(
// //   CreatePagamentoResponseZ,
// // ) {}

// // export class UpdatePagamentoResponseDto extends createZodDto(
// //   CreatePagamentoResponseZ.omit({ name: true }),
// // ) {}
