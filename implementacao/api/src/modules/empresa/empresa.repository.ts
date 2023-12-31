import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Empresa, Usuario } from '@prisma/client';
import { CreateVantagemDto } from './dto/CadastroVantagem.dto';

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

  async insertVantagem(vantagem: CreateVantagemDto, imageUrl: string): Promise<void> {
    const insertedVantagem = {...vantagem, empresaCnpj: undefined}
    await this.prisma.vantagem.create({
      data: {
        ...insertedVantagem,
        fotoKey: imageUrl,
        empresa: {
          connect: {
            cnpj: vantagem.empresaCnpj,
          },
        },
      } as any,
    });
  }

}
