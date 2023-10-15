import { Injectable } from '@nestjs/common';
import { CursoRepository } from './curso.repository';
import { Curso } from '@prisma/client';

@Injectable()
export class CursoService {
  constructor(private readonly cursoRepository:CursoRepository ) {}

  async findAll(): Promise<Curso[]> {
    return await this.cursoRepository.findAll();
  }
}
