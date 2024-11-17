import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiTags,
} from "@nestjs/swagger";

import { ZodValidationPipe } from "@/infra/http/nest/@config/pipes/zod-validation-pipe";

import {
  CreateAssociateDTO,
  createAssociateSchema,
} from "@/domains/associate/dto";
import { Associate } from "@/domains/associate/entities/associate";
import { CreateAssociateService } from "@/domains/associate/services/create-associate.service";
import { generateSchema } from "@anatine/zod-openapi";

const createAssociateValidate = new ZodValidationPipe(createAssociateSchema);
const createAssociateSwaggerSchema = generateSchema(createAssociateSchema);

@ApiTags("Associates")
@Controller("associate")
@ApiBearerAuth()
export class CreateAssociateController {
  constructor(
    private readonly createAssociateService: CreateAssociateService,
  ) {}

  @Post()
  @ApiBody({
    type: Associate,
    schema: createAssociateSwaggerSchema,
    examples: {
      _default: {
        value: {
          name: "Associate 1",
          cpf: "12345678901",
          rg: "123456789",
        },
      },
    },
  })
  @ApiNoContentResponse({
    description: "The associate has been successfully created.",
  })
  @HttpCode(204)
  @UsePipes(createAssociateValidate)
  async create(@Body() createAssociateDto: CreateAssociateDTO) {
    await this.createAssociateService.execute(createAssociateDto);
  }
}
