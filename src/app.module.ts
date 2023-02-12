import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/infra/http/nest/user/user.module';
import { PagamentoModule } from '@/infra/http/nest/pagamento/pagamento.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, PagamentoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
