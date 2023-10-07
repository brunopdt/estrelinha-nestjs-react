import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/CadastroEmpresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  async cadastrarEmpresa(@Body() createEmpresaDto: CreateEmpresaDto):Promise<{success: boolean}> {
    await this.empresaService.create(createEmpresaDto);
    return {success: true};
  }

  @Get()
  findAll() {
    return this.empresaService.getAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(+id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(+id, updateEmpresaDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(+id);
  }
}
