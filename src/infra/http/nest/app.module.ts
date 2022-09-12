import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from '@/infra/http/nest/user/user.module';
import { auth } from '@/infra/http/middlewares/auth.middleware';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(auth).forRoutes('*');
  }
}
