import { Module } from '@nestjs/common';
import { AlunoModule } from './modules/aluno/aluno.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [AlunoModule, LoginModule],
})
export class AppModule {}
