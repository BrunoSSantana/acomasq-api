import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssociadoModule } from '@/infra/http/nest/associado/associado.module';
import { PagamentoModule } from '@/infra/http/nest/pagamento/pagamento.module';

@Module({
  imports: [ConfigModule.forRoot(), AssociadoModule, PagamentoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
