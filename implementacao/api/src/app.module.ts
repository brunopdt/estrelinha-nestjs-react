import { Module } from '@nestjs/common';
import { AlunoModule } from './modules/aluno/aluno.module';

@Module({
  imports: [AlunoModule],
})
export class AppModule {}
