import { IsInt, IsString, MaxLength } from "class-validator";

export class CreatePremiacaoDto {
  @IsString()
  @MaxLength(11)
  alunoCpf: string;

  @IsString()
  @MaxLength(11)
  professorCpf: string;

  @IsInt()
  valor: number;
}
