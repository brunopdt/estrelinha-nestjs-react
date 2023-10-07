import { IsString, MaxLength } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  @MaxLength(251)
  nomeUsuario: string;

  @IsString()
  @MaxLength(251)
  nomeFantasia: string;

  @IsString()
  @MaxLength(14)
  cnpj: string;

  @IsString()
  @MaxLength(251)
  senha: string;
}
