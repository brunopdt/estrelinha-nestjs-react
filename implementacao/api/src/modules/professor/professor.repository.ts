import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Transacao } from '@prisma/client'

@Injectable()
export class ProfessorRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getTransactions(nomeUsuario: string): Promise<Transacao[]> {
    const professor = await this.prisma.professor.findFirst({
      where: { nomeUsuario },
      select: {
        conta: {
          select: {
            transacoes: true,
          },
        },
      },
    });

    if (professor)
      return professor.conta.transacoes;
    else throw new BadRequestException('Professor não encontrado');
  }


}
