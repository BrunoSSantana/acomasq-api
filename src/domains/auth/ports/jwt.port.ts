import { Auth, Payload } from '@/domains/auth/entities/auth';

export interface IJwtPort {
  sign(payload: Payload<{ sub: string }>): Auth;
  verify(token: Auth): Payload<{ sub: string }>;
}
