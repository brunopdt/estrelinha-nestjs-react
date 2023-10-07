import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaDto } from './CadastroEmpresa.dto';

export class UpdateEmpresaDto extends PartialType(CreateEmpresaDto) {}
