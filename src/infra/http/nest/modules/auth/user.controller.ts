import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '../../@config/pipes/zod-validation-pipe';
import { CreateUserDTO, createUserSchema } from '@/domains/auth/dto';
import { User } from '@/domains/auth/entities';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({
    type: User,
    examples: {
      'Create User': {
        value: {
          username: 'username',
          password: 'password',
        },
      },
    },
  })
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }
}
