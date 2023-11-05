import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateVantagemDto {
  @IsString()
  @MaxLength(251)
  nome: string;

  @IsInt()
  valor: number;

  @IsInt()
  fotoKey: string;

  @IsString()
  empresaCnpj: string;
}
