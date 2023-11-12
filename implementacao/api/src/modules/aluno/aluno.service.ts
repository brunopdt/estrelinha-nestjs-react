import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CadastroAlunoDTO } from './dto/CadastroAluno.dto';
import { AlunoRepository } from './aluno.repository';
import { Aluno, Transacao, Usuario, Vantagem } from '@prisma/client'

@Injectable()
export class AlunoService {
  constructor(private readonly alunoRepository: AlunoRepository) { }

  async cadastrarAluno(alunoDTO: CadastroAlunoDTO): Promise<Aluno> {

    const alunoExistente = await this.alunoRepository.findAlunoByCpf(alunoDTO.cpf);
    if (alunoExistente) throw new ConflictException('Já existe um aluno cadastrado com esse CPF');

    const aluno: Partial<Aluno> = {
      cpf: alunoDTO.cpf,
      email: alunoDTO.email,
      endereco: alunoDTO.endereco,
      nome: alunoDTO.nome,
      rg: alunoDTO.rg,
    }

    const usuario: Usuario = {
      nomeUsuario: alunoDTO.nomeUsuario,
      senha: alunoDTO.senha,
    }

    const foreignKeys: Partial<Aluno> = {
      cursoId: alunoDTO.cursoId,
      instituicaoId: alunoDTO.instituicaoId,
    }

    return await this.alunoRepository.cadastrarAluno(aluno, usuario, foreignKeys);
  }

  async getAll(): Promise<Aluno[]> {
    return await this.alunoRepository.getAll();
  }

  async getPremiacoes(nomeUsuario: string) {
    return await this.alunoRepository.getPremiacoes(nomeUsuario);
  }

  async getTransacoes(nomeUsuario: string): Promise<Transacao[]> {
    return await this.alunoRepository.getTransacoes(nomeUsuario);
  }

  async getVantagens(): Promise<Vantagem[]> {
    return await this.alunoRepository.getVantagens();
  }

  async comprarVantagem(nomeUsuario: string, vantagemId: number): Promise<void> {
    const aluno = await this.alunoRepository.findAlunoByNomeUsuario(nomeUsuario);
    if(!aluno) throw new BadRequestException('Aluno não encontrado');

    return await this.alunoRepository.comprarVantagem(nomeUsuario, vantagemId, aluno);
  }
}
