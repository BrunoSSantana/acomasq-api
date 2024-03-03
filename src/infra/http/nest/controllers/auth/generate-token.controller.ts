import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '@/infra/http/nest/@config/pipes/zod-validation-pipe';

import { Auth } from '@/domains/auth/entities/auth';
import { CreateSessionDTO, CreateSessionSchema } from '@/domains/auth/dto/auth';
import { CreateSessionService } from '@/domains/auth/services/create-session.service';
import { Public } from '../../@config/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
@Public()
export class GenerateTokenController {
  constructor(private authService: CreateSessionService) {}

  @Post('session')
  @ApiResponse({
    status: 201,
    description: 'The session has been successfully created.',
    type: Auth,
  })
  @ApiBody({
    schema: {},
    examples: {
      'request-body': {
        value: {
          username: 'string',
          password: 'string',
        },
      },
    },
  })
  @UsePipes(new ZodValidationPipe(CreateSessionSchema))
  async createSession(@Body() params: CreateSessionDTO) {
    const { access_token } = await this.authService.execute(params);

    return {
      access_token,
    };
  }
}
