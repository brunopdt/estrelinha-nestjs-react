import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CadastroAlunoDTO } from './dto/CadastroAluno.dto';
import { AlunoService } from './aluno.service';
import { Aluno, Transacao, Vantagem } from '@prisma/client';
import { CompraVantagemDTO } from './dto/CompraVantagem.dto.';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) { }

  @Post()
  async cadastrarAluno(@Body() alunoDTO: CadastroAlunoDTO): Promise<{ success: boolean }> {
    await this.alunoService.cadastrarAluno(alunoDTO);
    return { success: true };
  }

  @Post('comprar-vantagem/:nomeUsuario')
  async comprarVantagem(@Param('nomeUsuario') nomeUsuario, @Body() compraVantagemDTO: CompraVantagemDTO): Promise<{ success: boolean }> {
    await this.alunoService.comprarVantagem(nomeUsuario, compraVantagemDTO.vantagemId);
    return { success: true };
  }

  @Get()
  async getAll(): Promise<Aluno[]> {
    return this.alunoService.getAll();
  }

  @Get('premiacoes/:nomeUsuario')
  async getPremiacoes(@Param('nomeUsuario') nomeUsuario) {
    return this.alunoService.getPremiacoes(nomeUsuario);
  }

  @Get('transacoes/:nomeUsuario')
  async getTransacoes(@Param('nomeUsuario') nomeUsuario): Promise<Transacao[]> {
    return this.alunoService.getTransacoes(nomeUsuario);
  }

  @Get('vantagens')
  async getVantagens(): Promise<Vantagem[]> {
    return this.alunoService.getVantagens();
  }
}
