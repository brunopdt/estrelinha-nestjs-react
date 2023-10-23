import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfessorRepository } from './professor.repository';
import { CreatePremiacaoDto } from './dto/CadastroAluno.dto';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) { }

  async getTransactions(nomeUsuario: string) {
    return await this.professorRepository.getTransactions(nomeUsuario);
  }

  async premiar(createPremiacaoDto: CreatePremiacaoDto): Promise<void> {
    if(createPremiacaoDto.valor <= 0) throw new BadRequestException('Valor inválido, deve ser maior que 0');

    await this.professorRepository.getAlunoById(createPremiacaoDto.alunoCpf);
    const professor = await this.professorRepository.getProfessorById(createPremiacaoDto.professorCpf);

    if (professor.conta.saldo < createPremiacaoDto.valor)
      throw new BadRequestException('Saldo insuficiente');

    await this.professorRepository.premiar(createPremiacaoDto.alunoCpf, createPremiacaoDto.professorCpf, createPremiacaoDto.valor);
  }
}
