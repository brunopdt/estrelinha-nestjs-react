import { Module } from '@nestjs/common';
import { AlunoModule } from './modules/aluno/aluno.module';
import { LoginModule } from './modules/login/login.module';
import { EmpresaModule } from './modules/empresa/empresa.module';

@Module({
  imports: [AlunoModule, LoginModule, EmpresaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
