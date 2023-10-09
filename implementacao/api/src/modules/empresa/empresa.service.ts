import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/CadastroEmpresa.dto';
import { EmpresaRepository } from './empresa.repository';
import { Empresa, Usuario } from '@prisma/client';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private readonly empresasRepository: EmpresaRepository) {}

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Usuario> {
    const empresa: Empresa = {
      nomeFantasia: createEmpresaDto.nomeFantasia,
      cnpj: createEmpresaDto.cnpj,
      nomeUsuario: undefined,
    };

    const usuario: Usuario = {
      nomeUsuario: createEmpresaDto.nomeUsuario,
      senha: createEmpresaDto.senha,
    };
    return await this.empresasRepository.cadastraEmpresa(empresa, usuario);
  }

  async getAll(): Promise<Empresa[]> {
    return this.empresasRepository.find();
  }

  async findOne(cnpj: string): Promise<Empresa> {
    return this.empresasRepository.findOne(cnpj);
  }
}
