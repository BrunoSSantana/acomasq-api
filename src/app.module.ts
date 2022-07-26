import { Module } from '@nestjs/common';
import { UserModule } from '@/infra/http/nest/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
