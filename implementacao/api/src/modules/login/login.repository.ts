import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDTO } from './dto/Login.dto';

@Injectable()
export class LoginRepository {
  constructor(private readonly prisma: PrismaService) {}

  async login(loginDto: LoginDTO): Promise<{Aluno, Empresa, Professor}> {
    return await this.prisma.usuario.findFirstOrThrow({
      select: {
        Aluno: true,
        Empresa: true,
        Professor: true
      },
      where: {
        nomeUsuario: loginDto.nomeUsuario,
        senha: loginDto.senha,
      },
    });
  }
}
