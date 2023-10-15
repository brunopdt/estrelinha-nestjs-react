import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Aluno, Usuario } from '@prisma/client'

@Injectable()
export class AlunoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAlunoByCpf(cpf: string): Promise<Aluno> {
    return await this.prisma.aluno.findUnique({
      where: {
        cpf,
      },
    });
  }

  async cadastrarAluno(aluno: Partial<Aluno>, usuario: Usuario, foreignKeys: Partial<Aluno>): Promise<Aluno> {
    return await this.prisma.aluno.create({
      data: {
        ...aluno,
        instituicao: {
          connect: { id: foreignKeys.instituicaoId },
        },
        curso: {
          connect: { id: foreignKeys.cursoId },
        },
        conta: {create:{}},
        usuario: {
          create: {
            ...usuario
          }
        },
      } as Aluno,
    });
  }
}
