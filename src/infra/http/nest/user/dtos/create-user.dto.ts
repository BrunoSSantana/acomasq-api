import { IsString, IsNotEmpty } from 'class-validator';

import { CreateUserDto } from '@/domains/user/contracts/dtos/create-user-dto';

export class CreateUserNestDto implements CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  rg: string;
}
