import { ApiProperty } from '@nestjs/swagger';

export class UpdatePagamentoDto {
  @ApiProperty({ example: 1, required: false })
  month: number;

  @ApiProperty({ example: 2023, required: false })
  year: number;
}
