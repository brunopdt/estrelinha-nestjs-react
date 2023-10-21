import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Premiacao } from '@prisma/client'

@Injectable()
export class ProfessorRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getTransactions(nomeUsuario: string): Promise<Premiacao[]> {
    const professor = await this.prisma.professor.findFirst({
      where: { nomeUsuario },
      select: {
        premiacoes: true,
      },
    });

    if (professor)
      return professor.premiacoes;
    else throw new BadRequestException('Professor não encontrado');
  }


}
