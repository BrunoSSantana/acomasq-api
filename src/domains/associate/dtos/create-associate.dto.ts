import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssociateDTO {
  @ApiProperty({ example: 'Maria', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '00000000000', required: true })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ example: '9999137', required: false })
  @IsString()
  @IsOptional()
  rg?: string;
}
