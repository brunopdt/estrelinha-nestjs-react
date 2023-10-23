import { Module } from '@nestjs/common';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { ProfessorRepository } from './professor.repository';
import { PrismaService } from 'prisma/prisma.service';


@Module({
  controllers: [ProfessorController],
  providers: [ProfessorService, ProfessorRepository, PrismaService],
  exports: [ProfessorService, ProfessorRepository, PrismaService],
})
export class ProfessorModule { }
