import { CreateUserDto } from '@/domains/user/contracts/user-controller';

export class CreateUserNestDto implements CreateUserDto {
  name: string;
  cpf: string;
  rg: string;
}
