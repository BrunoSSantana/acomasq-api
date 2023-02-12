import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreatePagamentoDTO {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  month: number;

  @ApiProperty({ example: 2023, required: true })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: 'c44bc5a9-84e5-43f9-a8ce-e7106d1026f6',
    required: true,
  })
  @IsUUID('4')
  @IsNotEmpty()
  userId: string;
}
