import { CreateUserDTO } from "@/domains/auth/dto";
import { PrismaService } from "@/infra/repositories/prisma/prisma.service";
import { faker } from "@faker-js/faker/locale/pt_BR";
export async function createTestUser(
  prismaService: PrismaService,
  userData: CreateUserDTO,
) {
  return prismaService.user.create({
    data: userData,
  });
}

export function generateUserData(): CreateUserDTO {
  return {
    username: faker.person.firstName(),
    password: faker.internet.password(),
  };
}
