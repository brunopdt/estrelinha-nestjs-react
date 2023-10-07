import { IsString, MaxLength } from "class-validator";

export class LoginDTO {
  @IsString()
  @MaxLength(251)
  nomeUsuario: string;

  @IsString()
  @MaxLength(251)
  senha: string;
}
