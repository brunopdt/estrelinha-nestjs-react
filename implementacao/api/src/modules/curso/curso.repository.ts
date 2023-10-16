import { Injectable } from '@nestjs/common';
import { Curso } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CursoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Curso[]> {
    return await this.prisma.curso.findMany();
  }
}
