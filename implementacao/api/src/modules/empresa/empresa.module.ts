import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { EmpresaRepository } from './empresa.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [EmpresaController],
  providers: [EmpresaService, EmpresaRepository, PrismaService],
  exports: [EmpresaService, EmpresaRepository, PrismaService],
})
export class EmpresaModule {}
