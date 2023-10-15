import { Module } from '@nestjs/common';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';
import { PrismaService } from 'prisma/prisma.service';
import { CursoRepository } from './curso.repository';


@Module({
  controllers: [CursoController],
  providers: [CursoService, PrismaService, CursoRepository],
  exports: [CursoService, PrismaService, CursoRepository],
})
export class CursoModule {}
