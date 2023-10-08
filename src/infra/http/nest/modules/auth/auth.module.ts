import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from '@/env';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => {
        const privateKey = configService.get('JWT_PRIVATE_KEY', {
          infer: true,
        });

        const publicKey = configService.get('JWT_PUBLIC_KEY', { infer: true });

        return {
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
          signOptions: {
            algorithm: 'RS256',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
