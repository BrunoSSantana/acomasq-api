import { IS_PUBLIC_KEY } from '@/infra/http/nest/@config/decorators/public.decorator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { JwtAdapter } from '@/infra/http/nest/controllers/auth/jwt.provider';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(
    private authProvider: JwtAdapter,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | any {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log({ isPublic });

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['Authorization'];
    console.log(authorizationHeader);
    const token = authorizationHeader?.split(' ')[1];

    if (authorizationHeader) {
      const tokenMatch = this.authProvider.verify(token);

      return tokenMatch;
    } else {
      throw new UnauthorizedException('No authentication token found');
    }
  }
}
