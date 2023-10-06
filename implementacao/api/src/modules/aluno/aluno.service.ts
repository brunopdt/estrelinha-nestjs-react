import { Injectable } from '@nestjs/common';
import { CadastroAlunoDTO } from './dto/CadastroAluno.dto';
import { AlunoRepository } from './aluno.repository';
import { Aluno, Usuario } from '@prisma/client'

@Injectable()
export class AlunoService {
  constructor(private readonly alunoRepository: AlunoRepository) {}

  async cadastrarAluno(alunoDTO: CadastroAlunoDTO): Promise<Usuario> {
    const aluno: Aluno = {
      cpf: alunoDTO.cpf,
      email: alunoDTO.email,
      endereco: alunoDTO.endereco,
      nome: alunoDTO.nome,
      rg: alunoDTO.rg,
      nomeUsuario: undefined,
    }

    const usuario: Usuario = {
      nomeUsuario: alunoDTO.nomeUsuario,
      senha: alunoDTO.senha,
    }
    return await this.alunoRepository.cadastrarAluno(aluno, usuario);
  }
}
