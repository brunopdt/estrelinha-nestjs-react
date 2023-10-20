import { Controller, Get, Param } from '@nestjs/common';
import { Transacao } from '@prisma/client';
import { ProfessorService } from './professor.service';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) { }

  @Get('transacoes/:nomeUsuario')
  async getTransactions(@Param('nomeUsuario') nomeUsuario): Promise<Transacao[]> {
    return this.professorService.getTransactions(nomeUsuario);
  }

}
