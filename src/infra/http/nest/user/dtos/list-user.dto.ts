import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

import { ListUserDto } from '@/domains/user/contracts/dtos/list-user-dto';

export const validationNumber = (value: number) => {
  console.log({ value });

  if (isNaN(value)) {
    return null;
  }
  return Number(value);
};

export class ListUserNestDto implements ListUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  rg?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  // orderby?: { [key: string]: 'asc' | 'desc' };

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => validationNumber(value))
  take?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => validationNumber(value))
  skip?: number;
}
