import { Body, Controller, Post } from '@nestjs/common';
import { CadastroAlunoDTO } from './dto/CadastroAluno.dto';
import { AlunoService } from './aluno.service';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  async cadastrarAluno(@Body() alunoDTO: CadastroAlunoDTO): Promise<{ success: boolean }> {
    await this.alunoService.cadastrarAluno(alunoDTO);
    return { success: true };
  }

}
