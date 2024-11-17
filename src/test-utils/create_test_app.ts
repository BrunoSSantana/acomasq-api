import { AppModule } from "@/app.module";
import {
  HttpExceptionFilter,
  PrismaClientExceptionFilter,
} from "@/infra/http/nest/@config/filter-exceptions";
import { PrismaService } from "@/infra/repositories/prisma/prisma.service";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";

export async function createTestApp(): Promise<{
  app: INestApplication;
  prismaService: PrismaService;
}> {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  const prismaService = moduleFixture.get(PrismaService);
  const configService: ConfigService = app.get(ConfigService);
  const GLOBAL_PREFIX = configService.get("GLOBAL_PREFIX");

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(),
    new HttpExceptionFilter(),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  await prismaService.user.deleteMany();
  await app.init();

  return { app, prismaService };
}
