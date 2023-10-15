import { IsInt, IsString, MaxLength } from "class-validator";

export class CadastroAlunoDTO {
  @IsString()
  @MaxLength(251)
  nome: string;

  @IsString()
  @MaxLength(11)
  cpf: string;

  @IsString()
  @MaxLength(10)
  rg: string;

  @IsString()
  @MaxLength(251)
  email: string;

  @IsString()
  @MaxLength(251)
  endereco: string;

  @IsString()
  @MaxLength(251)
  nomeUsuario: string;

  @IsString()
  @MaxLength(251)
  senha: string;

  @IsInt()
  cursoId: number;

  @IsInt()
  instituicaoId: number;
}
