import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CadastroAlunoDTO {
  @IsString()
  @MaxLength(251)
  @IsNotEmpty()
  nome: string;

  @IsString()
  @MaxLength(11)
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  rg: string;

  @IsString()
  @MaxLength(251)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(251)
  @IsNotEmpty()
  endereco: string;

  @IsString()
  @MaxLength(251)
  @IsNotEmpty()
  nomeUsuario: string;

  @IsString()
  @MaxLength(251)
  @IsNotEmpty()
  senha: string;

  @IsInt()
  cursoId: number;

  @IsInt()
  instituicaoId: number;
}
