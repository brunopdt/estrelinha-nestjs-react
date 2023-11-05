import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/CadastroEmpresa.dto';
import { EmpresaRepository } from './empresa.repository';
import { Empresa, Usuario } from '@prisma/client';
import { CreateVantagemDto } from './dto/CadastroVantagem.dto';

@Injectable()
export class EmpresaService {
  constructor(private readonly empresasRepository: EmpresaRepository) {}

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Usuario> {
    const empresaExistente = await this.findOne(createEmpresaDto.cnpj);
    if(empresaExistente) throw new ConflictException('Já existe uma empresa cadastrada com esse CNPJ');

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

  async insertVantagem(transacao: CreateVantagemDto): Promise<void> {
    await this.empresasRepository.insertVantagem(transacao);
  }
}
