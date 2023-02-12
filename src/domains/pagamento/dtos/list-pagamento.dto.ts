export class ListPagamentoDto {
  month?: number;
  year?: number;
  username?: string;
  skip?: number = 0;
  take?: number = 10;
}
