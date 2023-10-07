import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDTO } from './dto/Login.dto';

@Injectable()
export class LoginRepository {
  constructor(private readonly prisma: PrismaService) {}

  async login(loginDto: LoginDTO): Promise<{Aluno, Empresa}> {
    return await this.prisma.usuario.findFirstOrThrow({
      select: {
        Aluno: true,
        Empresa: true,
      },
      where: {
        nomeUsuario: loginDto.nomeUsuario,
        senha: loginDto.senha,
      },
    });
  }
}
