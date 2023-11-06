import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/CadastroEmpresa.dto';
import { EmpresaRepository } from './empresa.repository';
import { Empresa, Usuario } from '@prisma/client';
import { CreateVantagemDto } from './dto/CadastroVantagem.dto';
import * as azurestorage from 'azure-storage';

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
    const blobSvc = azurestorage.createBlobService("DefaultEndpointsProtocol=https;AccountName=estrelinha;AccountKey=OKG7phoBGXMgHkmFTGcye6mae5Dg8PqZpcxoHGy/ssefL4y6LhLclmNWrtB69LuKXzeWPqz6+sOb+AStxviuzg==;EndpointSuffix=core.windows.net");
    const fileName = `${transacao.empresaCnpj}-${transacao.nome}-${transacao.valor}.jpg`;
    const containerName = 'estrelinha';
    const imageBuffer = transacao.fotoKey;

    await blobSvc.createBlockBlobFromText(containerName, fileName, imageBuffer, () => {});
    const imageUrl = await blobSvc.getUrl(containerName, fileName);

    await this.empresasRepository.insertVantagem(transacao, imageUrl);
  }
}
