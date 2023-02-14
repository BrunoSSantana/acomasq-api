import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePagamentoDTO {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  mes: number;

  @ApiProperty({ example: 2023, required: true })
  @IsNumber()
  @IsNotEmpty()
  ano: number;

  @ApiProperty({
    example: 'c44bc5a9-84e5-43f9-a8ce-e7106d1026f6',
    required: true,
  })
  @IsUUID('4')
  @IsNotEmpty()
  associadoId: string;
}
