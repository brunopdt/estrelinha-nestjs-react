import { Module } from '@nestjs/common';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { AlunoRepository } from './aluno.repository';

@Module({
  controllers: [AlunoController],
  providers: [AlunoService, AlunoRepository],
  exports: [AlunoService, AlunoRepository],
})
export class AlunoModule {}
