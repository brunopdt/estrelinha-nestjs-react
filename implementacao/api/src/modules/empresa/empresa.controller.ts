import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/CadastroEmpresa.dto';
import { CreateVantagemDto } from './dto/CadastroVantagem.dto';
import { Empresa } from '@prisma/client';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  async cadastrarEmpresa(@Body() createEmpresaDto: CreateEmpresaDto):Promise<{success: boolean}> {
    await this.empresaService.create(createEmpresaDto);
    return {success: true};
  }

  @Get()
  async findAll(): Promise<Empresa[]> {
    return this.empresaService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(id);
  }

  @Post('transacao')
  async insertVantagem(@Body() body: CreateVantagemDto): Promise<{success: boolean}> {
    await this.empresaService.insertVantagem(body);
    return {success: true};
  }
}
