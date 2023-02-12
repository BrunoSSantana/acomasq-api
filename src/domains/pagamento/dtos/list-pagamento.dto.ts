import { ApiProperty } from '@nestjs/swagger';

export class ListPagamentoDto {
  @ApiProperty({ example: 1, required: false })
  month?: number;

  @ApiProperty({ example: 2023, required: false })
  year?: number;

  @ApiProperty({ example: 'Maria', required: false })
  username?: string;

  @ApiProperty({ example: 0, required: false })
  skip?: number = 0;

  @ApiProperty({ example: 10, required: false })
  take?: number = 10;
}
