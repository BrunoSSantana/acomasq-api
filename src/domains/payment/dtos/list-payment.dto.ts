import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ListPaymentDto {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  mes?: number;

  @ApiProperty({ example: 2023, required: false })
  @IsNumber()
  @IsOptional()
  ano?: number;

  @ApiProperty({ example: 'Maria', required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  skip?: number = 0;

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  @IsOptional()
  take?: number = 10;
}