import { Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

class AuthDTO {
  access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private jwt: JwtService) {}

  @Post('session')
  @ApiResponse({
    status: 201,
    description: 'The session has been successfully created.',
    type: AuthDTO,
  })
  async session() {
    const access_token = this.jwt.sign({ sub: 'user-id' });

    return {
      access_token,
    };
  }
}
