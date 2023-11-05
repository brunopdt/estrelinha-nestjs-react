import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CadastroAlunoDTO } from './dto/CadastroAluno.dto';
import { AlunoService } from './aluno.service';
import { Aluno } from '@prisma/client';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) { }

  @Post()
  async cadastrarAluno(@Body() alunoDTO: CadastroAlunoDTO): Promise<{ success: boolean }> {
    await this.alunoService.cadastrarAluno(alunoDTO);
    return { success: true };
  }

  @Get()
  async getAll(): Promise<Aluno[]> {
    return this.alunoService.getAll();
  }

  @Get('premiacoes/:nomeUsuario')
  async getTransactions(@Param('nomeUsuario') nomeUsuario) {
    return this.alunoService.getPremiacoes(nomeUsuario);
  }

  @Get('vantagens')
  async getVantagens() {
    return this.alunoService.getVantagens();
  }
}
