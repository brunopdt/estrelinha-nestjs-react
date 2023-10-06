import { Module } from '@nestjs/common';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { AlunoRepository } from './aluno.repository';
import { PrismaService } from 'prisma/prisma.service';


@Module({
  controllers: [AlunoController],
  providers: [AlunoService, AlunoRepository, PrismaService],
  exports: [AlunoService, AlunoRepository, PrismaService],
})
export class AlunoModule {}
