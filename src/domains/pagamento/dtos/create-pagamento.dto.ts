import { ApiProperty } from '@nestjs/swagger';

export class CreatePagamentoDTO {
  @ApiProperty({ example: 1, required: true })
  month: number;

  @ApiProperty({ example: 2023, required: true })
  year: number;

  @ApiProperty({
    example: 'c44bc5a9-84e5-43f9-a8ce-e7106d1026f6',
    required: true,
  })
  userId: string;
}
