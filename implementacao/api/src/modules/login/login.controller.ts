import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/Login.dto';
import { LoginService } from './login.service';
import { Aluno, Empresa } from '@prisma/client';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDTO: LoginDTO):  Promise<Empresa | Aluno>{
    const res = await this.loginService.login(loginDTO);

    return res?.Aluno ?? res?.Empresa
  }

}
