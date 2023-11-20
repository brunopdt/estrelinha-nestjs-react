import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/CadastroEmpresa.dto';
import { EmpresaRepository } from './empresa.repository';
import { Empresa, Usuario } from '@prisma/client';
import { CreateVantagemDto } from './dto/CadastroVantagem.dto';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable()
export class EmpresaService {
  constructor(private readonly empresasRepository: EmpresaRepository) { }

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Usuario> {
    const empresaExistente = await this.findOne(createEmpresaDto.cnpj);
    if (empresaExistente) throw new ConflictException('Já existe uma empresa cadastrada com esse CNPJ');

    const empresa: Empresa = {
      nomeFantasia: createEmpresaDto.nomeFantasia,
      cnpj: createEmpresaDto.cnpj,
      email: 'mp6046969@gmail.com',
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
    const blobServiceClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=estrelinha;AccountKey=OKG7phoBGXMgHkmFTGcye6mae5Dg8PqZpcxoHGy/ssefL4y6LhLclmNWrtB69LuKXzeWPqz6+sOb+AStxviuzg==;EndpointSuffix=core.windows.net");
    const containerClient = blobServiceClient.getContainerClient('estrelinha');
    const blobName = `${transacao.empresaCnpj}-${transacao.nome}-${transacao.valor}.jpg`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const imageBuffer = Buffer.from(transacao.fotoKey, 'base64');
  
    await blockBlobClient.uploadData(imageBuffer);
  
    const imageUrl = blockBlobClient.url;
  
    await this.empresasRepository.insertVantagem(transacao, imageUrl);
  }
}
