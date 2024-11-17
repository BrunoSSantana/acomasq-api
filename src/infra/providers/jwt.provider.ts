import { Auth, Payload } from "@/domains/auth/entities/auth";
import { IJwtPort } from "@/domains/auth/ports";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAdapter implements IJwtPort {
  constructor(private readonly jwtProvider: JwtService) {}

  sign(payload: Payload<{ sub: string }>): Auth {
    try {
      const authToken = this.jwtProvider.sign(payload);
      return new Auth(authToken);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Não foi possível gerar o token",
      });
    }
  }
  verify(token: Auth): Payload<{ sub: string }> {
    const SECRET_KEY = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const PUBLIC_KEY = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, "\n");
    console.log({ token, SECRET_KEY, PUBLIC_KEY });
    try {
      const payload = this.jwtProvider.verify(token.access_token, {
        secret: SECRET_KEY,
        publicKey: PUBLIC_KEY,
      });
      return {
        sub: payload.sub,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: "Não foi possível verificar o token",
      });
    }
  }
}
