import { IS_PUBLIC_KEY } from "@/infra/http/nest/@config/decorators/public.decorator";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { JwtAdapter } from "@/infra/providers/jwt.provider";

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

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorizationHeader =
      request.headers["authorization"] || request.headers["Authorization"];
    const token = authorizationHeader?.split(" ")[1];

    console.log({ token });
    if (token) {
      const tokenMatch = this.authProvider.verify(token);
      console.log({ tokenMatch });

      return tokenMatch;
    } else {
      throw new UnauthorizedException("No authentication token found");
    }
  }
}
