import { Associate } from '@/domains/associate/entities/associate';
import {
  CreateAssociateInput,
  IAssociateRepository,
  ListAssociateInput,
  UpdateAssociateInput,
} from '@/domains/associate/repositories/associate.repository';
import { PrismaService } from '../../prisma.service';

export class PrismaAssociateRepository implements IAssociateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(params: CreateAssociateInput): Promise<Associate> {
    const associateCreated = await this.prisma.associate.create({
      data: params,
    });

    return Associate.create(associateCreated);
  }

  async findMany(params: ListAssociateInput): Promise<Associate[]> {
    const { take, skip, ...restOfWhere } = params;
    const associatesFound = await this.prisma.associate.findMany({
      where: {
        ...restOfWhere,
      },
      take,
      skip,
    });

    return associatesFound.map(Associate.create);
  }

  async findById(associateId: string): Promise<Associate | null> {
    const associateFound = await this.prisma.associate.findUnique({
      where: { id: associateId },
    });

    return associateFound ? Associate.create(associateFound) : null;
  }

  async delete(associateId: string): Promise<void> {
    await this.prisma.associate.delete({
      where: {
        id: associateId,
      },
    });
  }

  async update(params: UpdateAssociateInput): Promise<Associate> {
    const { associateId: id, ...dataToUpdate } = params;

    const associatedUpdated = await this.prisma.associate.update({
      where: { id },
      data: dataToUpdate,
    });

    return Associate.create(associatedUpdated);
  }
}
