import { IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { UpdateUserDto } from '@/domains/user/contracts/dtos/update-user-dto';

export class UpdateUserNestDto implements UpdateUserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

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
