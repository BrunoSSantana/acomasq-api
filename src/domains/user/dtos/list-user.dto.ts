export class ListUserDto {
  name?: string;
  cpf?: string;
  rg?: string;
  skip?: number = 0;
  take?: number = 10;
}
