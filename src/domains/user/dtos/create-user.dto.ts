import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'Maria', required: true })
  name: string;

  @ApiProperty({ example: '00000000000', required: true })
  cpf: string;

  @ApiProperty({ example: '9999137', required: false })
  rg?: string;
}
