import { Controller, Get } from '@nestjs/common';
import { CursoService } from './curso.service';
import { Curso } from '@prisma/client';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Get()
  async login():  Promise<Curso[]>{
    return await this.cursoService.findAll();
  }
}
