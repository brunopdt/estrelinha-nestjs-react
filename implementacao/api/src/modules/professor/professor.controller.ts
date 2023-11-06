import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreatePremiacaoDto } from './dto/CadastroAluno.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) { }

  @Get('transacoes/:nomeUsuario')
  async getTransactions(@Param('nomeUsuario') nomeUsuario) {
    return this.professorService.getTransactions(nomeUsuario);
  }

  @Post('premiar')
  async premiar(@Body() createPremiacaoDto: CreatePremiacaoDto): Promise<void> {
    return this.professorService.premiar(createPremiacaoDto);
  }
}
