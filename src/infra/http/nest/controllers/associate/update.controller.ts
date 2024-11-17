import { Body, Controller, HttpCode, Param, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { z } from "zod";

import { ZodValidationPipe } from "@/infra/http/nest/@config/pipes/zod-validation-pipe";

import {
  UpdateAssociateDTO,
  findAssociateByIdSchema,
  updateAssociateSchema,
} from "@/domains/associate/dto";
import { Associate } from "@/domains/associate/entities/associate";
import { UpdateAssociateService } from "@/domains/associate/services/update-associate.service";
import { generateSchema } from "@anatine/zod-openapi";

const updateAssociateValidate = new ZodValidationPipe(updateAssociateSchema);
const associateByIdValidate = new ZodValidationPipe(findAssociateByIdSchema);

const updateAssociateSwaggerSchema = generateSchema(updateAssociateSchema);

type AssociateById = z.infer<typeof findAssociateByIdSchema>;
@ApiTags("Associates")
@Controller("associate")
@ApiBearerAuth()
export class UpdateAssociateController {
  constructor(
    private readonly updateAssociateService: UpdateAssociateService,
  ) {}

  @Patch(":id")
  @ApiBody({
    type: Associate,
    schema: updateAssociateSwaggerSchema,
    examples: {
      _default: {
        value: {
          name: "Associate 2",
          cpf: "12345678901",
          rg: "123456789",
        },
      },
    },
  })
  @HttpCode(204)
  async update(
    @Param(associateByIdValidate) associateById: AssociateById,
    @Body(updateAssociateValidate) updateAssociateDto: UpdateAssociateDTO,
  ) {
    await this.updateAssociateService.execute(
      associateById.id,
      updateAssociateDto,
    );
  }
}
