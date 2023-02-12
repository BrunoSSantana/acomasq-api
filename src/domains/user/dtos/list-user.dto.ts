import { ApiProperty } from '@nestjs/swagger';

export class ListUserDto {
  @ApiProperty({ example: 'Maria', required: false })
  name?: string;

  @ApiProperty({ example: '00000000000', required: false })
  cpf?: string;

  @ApiProperty({ example: '9999137', required: false })
  rg?: string;

  @ApiProperty({ example: 0, required: false })
  skip?: number = 0;

  @ApiProperty({ example: 10, required: false })
  take?: number = 10;
}
