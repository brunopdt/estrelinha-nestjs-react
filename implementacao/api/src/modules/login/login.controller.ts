import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/Login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDTO: LoginDTO):  Promise<{
    data: {
        Aluno;
        Empresa;
    };
}>{
    const res = await this.loginService.login(loginDTO);

    return {data: res}
  }

}
