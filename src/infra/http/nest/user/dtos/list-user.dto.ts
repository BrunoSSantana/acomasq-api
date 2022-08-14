import { ListUserDto } from '@/domains/user/contracts/user-controller';

export class ListUserNestDto implements ListUserDto {
  name?: string;
  cpf?: string;
  rg?: string;
  createdAt?: Date;
  updatedAt?: Date;
  orderby?: { [key: string]: 'asc' | 'desc' };
  take?: number;
  skip?: number;
}
