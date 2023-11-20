import { Module } from '@nestjs/common';
import { AlunoModule } from './modules/aluno/aluno.module';
import { LoginModule } from './modules/login/login.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { CursoModule } from './modules/curso/curso.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AlunoModule, LoginModule, EmpresaModule, CursoModule, ProfessorModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule { }
