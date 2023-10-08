import { Auth, Payload } from '@/domains/auth/entities/auth';
import { IJwtPort } from '@/domains/auth/ports';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAdapter implements IJwtPort {
  constructor(private readonly jwtProvider: JwtService) {}

  sign(payload: Payload<{ sub: string }>): Auth {
    try {
      const authToken = this.jwtProvider.sign(payload);
      return new Auth(authToken);
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Não foi possível gerar o token',
      });
    }
  }
  verify(token: Auth): Payload<{ sub: string }> {
    try {
      const payload = this.jwtProvider.verify(token.access_token);
      return {
        sub: payload.sub,
      };
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Não foi possível verificar o token',
      });
    }
  }
}
