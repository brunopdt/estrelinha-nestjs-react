import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Premiacao } from '@prisma/client';
import { ProfessorService } from './professor.service';
import { CreatePremiacaoDto } from './dto/CadastroAluno.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) { }

  @Get('transacoes/:nomeUsuario')
  async getTransactions(@Param('nomeUsuario') nomeUsuario): Promise<Premiacao[]> {
    return this.professorService.getTransactions(nomeUsuario);
  }

  @Post('transacoes/:nomeUsuario')
  async premiar(@Body() createPremiacaoDto: CreatePremiacaoDto): Promise<Premiacao> {
    return this.professorService.premiar(createPremiacaoDto);
  }

}
