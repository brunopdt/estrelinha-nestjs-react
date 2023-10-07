import { Module } from '@nestjs/common';
import { AlunoModule } from './modules/aluno/aluno.module';
import { LoginModule } from './modules/login/login.module';
import { EmpresaController } from './modules/empresa/empresa.controller';
import { EmpresaService } from './modules/empresa/empresa.service';
import { EmpresaModule } from './modules/empresa/empresa.module';

@Module({
  imports: [AlunoModule, LoginModule, EmpresaModule],
  controllers: [EmpresaController],
  providers: [EmpresaService],
})
export class AppModule {}
