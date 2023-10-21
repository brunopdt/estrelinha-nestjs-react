import { BadRequestException, Injectable } from '@nestjs/common';
import { Aluno } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProfessorRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getTransactions(nomeUsuario: string) {
    const professor = await this.prisma.professor.findFirst({
      where: { nomeUsuario },
      select: {
        premiacoes: true,
        conta: {
          select: {
            saldo: true
          }
        } 
      },
    });

    if (professor)
      return {
        premiacoes: professor.premiacoes,
        saldo: professor.conta.saldo
      };
    else throw new BadRequestException('Professor não encontrado');
  }


  async getAlunoById(cpf: string): Promise<Aluno> {
    const aluno = await this.prisma.aluno.findFirst({
      where: { cpf },
    });

    if (aluno)
      return aluno;
    else throw new BadRequestException('Aluno não encontrado');
  }

  async getProfessorById(cpf: string) {
    const professor = await this.prisma.professor.findFirst({
      where: { cpf },
      include: {
        conta: {
          select: {
            saldo: true
          }
        }
      }
    });

    if (professor)
      return professor;
    else throw new BadRequestException('Professor não encontrado');
  }

  async premiar(alunoCpf: string, professorCpf: string, valor: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.aluno.update({
        where: { cpf: alunoCpf },
        data: {
          conta: {
            update: {
              saldo: {
                increment: valor
              }
            }
          }
        }
      });

      await tx.professor.update({
        where: { cpf: professorCpf },
        data: {
          conta: {
            update: {
              saldo: {
                decrement: valor
              }
            }
          }
        }
      });

      await tx.premiacao.create({
        data: {
          valor,
          aluno: {
            connect: {
              cpf: alunoCpf
            }
          },
          professor: {
            connect: {
              cpf: professorCpf
            }
          }
        }
      });
    });
  }
}