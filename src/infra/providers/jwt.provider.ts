import { Auth, Payload } from "@/domains/auth/entities/auth";
import { IJwtPort } from "@/domains/auth/ports";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAdapter implements IJwtPort {
  constructor(private readonly jwtProvider: JwtService) {}

  sign(payload: Payload<{ sub: string }>): Auth {
    try {
      const privateKey = Buffer.from(
        process.env.JWT_PRIVATE_KEY as string,
        "base64",
      );

      const authToken = this.jwtProvider.sign(payload, {
        privateKey,
        expiresIn: "1d",
      });
      return new Auth(authToken);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Não foi possível gerar o token",
      });
    }
  }
  verify(token: Auth): Payload<{ sub: string }> {
    const cert: string = process.env.JWT_PUBLIC_KEY as string;
    const publicKey = Buffer.from(cert, "base64");
    try {
      const payload = this.jwtProvider.verify(token.access_token, {
        publicKey,
      });

      return {
        sub: payload.sub,
      };
    } catch (error) {
      throw new UnauthorizedException({
        message: "Não foi possível verificar o token",
      });
    }
  }
}
