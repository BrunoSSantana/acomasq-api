import { GetAssociatesRequestDTO } from '@/domains/associate/dto';
import { IAssociateRepositoryPort } from '@/domains/associate/ports';

export class ListAssociateService {
  constructor(private repository: IAssociateRepositoryPort) {}

  async execute(listAssociateDto: GetAssociatesRequestDTO) {
    const { skip, take, cpf, name, rg } = listAssociateDto;

    const associates = await this.repository.findMany({
      name,
      cpf,
      rg,
      take,
      skip,
    });

    return { associates };
  }
}
