import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Empresa, Usuario } from '@prisma/client';

@Injectable()
export class EmpresaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastraEmpresa(empresa: Empresa, usuario: Usuario): Promise<Usuario> {
    return await this.prisma.usuario.create({
      data: {
        ...usuario,
        Empresa: {
          create: {
            ...empresa,
          },
        },
      },
      include: {
        Empresa: true,
      },
    });
  }
  async find(): Promise<Empresa[]> {
    return this.prisma.empresa.findMany();
  }

  async findOne(cnpj: string): Promise<Empresa> {
    return this.prisma.empresa.findUnique({
      where: { cnpj },
    });
  }

}
