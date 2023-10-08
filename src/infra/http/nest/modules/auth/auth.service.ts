import { CreateSessionDTO } from '@/domains/auth/dto/auth';
import { Auth } from '@/domains/auth/entities/auth';
import { CreateSessionService } from '@/domains/auth/services/create-session.service';
import { BadRequestException, Injectable } from '@nestjs/common';

// TODO: change service name
@Injectable()
export class AuthService {
  constructor(private readonly authService: CreateSessionService) {}

  async auth(params: CreateSessionDTO): Promise<Auth> {
    try {
      const { access_token } = await this.authService.execute(params);

      return {
        access_token,
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Error ao criar sessão',
        cause: error,
      });
    }
  }
}
