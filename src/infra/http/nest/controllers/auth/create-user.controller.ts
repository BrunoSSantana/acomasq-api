import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";

import { CreateUserDTO, createUserSchema } from "@/domains/auth/dto";
import { CreateUserService } from "@/domains/auth/services";
import { Public } from "@/infra/http/nest/@config/decorators";
import { ZodValidationPipe } from "@/infra/http/nest/@config/pipes/zod-validation-pipe";
import { generateSchema } from "@anatine/zod-openapi";

const createUserValidate = new ZodValidationPipe(createUserSchema);
const createUserSwaggerSchema = generateSchema(createUserSchema);

@ApiTags("Users")
@Controller("users")
@Public()
export class CreateUserController {
  constructor(private readonly userService: CreateUserService) {}

  @Post()
  @HttpCode(204)
  @ApiBody({
    schema: createUserSwaggerSchema,
    examples: {
      _default: {
        value: {
          username: "username",
          password: "password",
        },
      },
    },
  })
  @UsePipes(createUserValidate)
  async create(@Body() createUserDto: CreateUserDTO) {
    await this.userService.execute(createUserDto);
  }
}
