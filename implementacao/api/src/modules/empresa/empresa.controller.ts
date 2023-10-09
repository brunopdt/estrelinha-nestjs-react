import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/CadastroEmpresa.dto';

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
}
