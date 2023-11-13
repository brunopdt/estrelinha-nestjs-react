import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Aluno, Transacao, Usuario, Vantagem } from '@prisma/client'

@Injectable()
export class AlunoRepository {
  constructor(private readonly prisma: PrismaService) { }

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
        conta: { create: {} },
        usuario: {
          create: {
            ...usuario
          }
        },
      } as Aluno,
    });
  }

  async findAlunoByNomeUsuario(nomeUsuario: string): Promise<Aluno> {
    return await this.prisma.aluno.findUnique({
      where: {
        nomeUsuario,
      },
      include: {
        conta: true
      }
    });
  }

  async getAll(): Promise<Aluno[]> {
    return await this.prisma.aluno.findMany({ orderBy: { conta: { saldo: 'desc' } }, include: { conta: true } })
  }

  async getPremiacoes(nomeUsuario: string) {
    const aluno = await this.prisma.aluno.findFirst({
      where: { nomeUsuario },
      select: {
        premiacoes: {include: {professor: {select: {nome: true}}}},
        conta: {
          select: {
            saldo: true
          }
        } 
      },
    });

    if (aluno)
      return {
        premiacoes: aluno.premiacoes,
        saldo: aluno.conta.saldo
      };
    else throw new BadRequestException('Aluno não encontrado');
  }

  async getTransacoes(nomeUsuario: string): Promise<Transacao[]> {
    const aluno = await this.prisma.aluno.findFirst({
      where: { nomeUsuario },
      select: {
        transacoes: {include: {vantagem: {select: {nome: true}}}},
        conta: {
          select: {
            saldo: true
          }
        } 
      },
    });

    if (aluno)
      return aluno.transacoes;
    else throw new BadRequestException('Aluno não encontrado');
  }

  async getVantagens() {
    return await this.prisma.vantagem.findMany({ include: { empresa: true } });
  }

  async getVantagemById(id: number) {
    return await this.prisma.vantagem.findUnique({ where: { id }, include: { empresa: true } });
  }

  async comprarVantagem(nomeUsuario: string, vantagem: Vantagem, aluno): Promise<void> {
    await this.prisma.$transaction(
      async (tx) => {
        if(aluno.conta.saldo < vantagem.valor) throw new BadRequestException('Saldo insuficiente');

        await tx.aluno.update({
          where: { nomeUsuario },
          data: {
            conta: {
              update: {
                saldo: {
                  decrement: vantagem.valor,
                },
              },
            },
          },
        });

        await tx.transacao.create({
          data: {
            aluno: {
              connect: {
                nomeUsuario,
              },
            },
            vantagem: {
              connect: {
                id: vantagem.id,
              },
            },
            valor: vantagem.valor,
            data: new Date(),
            Conta: {
              connect: {
                id: aluno.contaId,
              },
            },
          },
        });
      },
    );
  }
}
