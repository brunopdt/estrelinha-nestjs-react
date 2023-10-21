import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfessorRepository } from './professor.repository';
import { CreatePremiacaoDto } from './dto/CadastroAluno.dto';
import { Premiacao } from '@prisma/client';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) { }

  async getTransactions(nomeUsuario: string) {
    return await this.professorRepository.getTransactions(nomeUsuario);
  }

  async premiar(createPremiacaoDto: CreatePremiacaoDto): Promise<Premiacao> {
    try {
      throw Error(`Not implemented - ${createPremiacaoDto.alunoCpf}}`)
      //dar um get na conta e subtrair o valor do professor, adicionar o valor no aluno.
    } catch {
      throw new BadRequestException('Erro ao premiar aluno');
    }
  }
}
