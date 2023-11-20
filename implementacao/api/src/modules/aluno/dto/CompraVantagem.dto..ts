import { IsInt } from "class-validator";

export class CompraVantagemDTO {
  @IsInt()
  vantagemId: number;
}
