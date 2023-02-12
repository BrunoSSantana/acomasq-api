import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ListUserDto {
  @ApiProperty({ example: 'Maria', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '00000000000', required: false })
  @IsString()
  @IsOptional()
  cpf?: string;

  @ApiProperty({ example: '9999137', required: false })
  @IsString()
  @IsOptional()
  rg?: string;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  skip?: number = 0;

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  take?: number = 10;
}
