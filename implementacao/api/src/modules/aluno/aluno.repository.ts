import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Aluno, Usuario } from '@prisma/client'

@Injectable()
export class AlunoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrarAluno(aluno: Aluno, usuario: Usuario): Promise<Usuario> {
    return await this.prisma.usuario.create({
      data: {
        ...usuario,
        Aluno: {
          create: {
            ...aluno,
          }
        }
      },
      include: {
        Aluno: true,
      }
    });
  }
}
