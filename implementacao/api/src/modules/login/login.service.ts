import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/Login.dto';
import { LoginRepository } from './login.repository';

@Injectable()
export class LoginService {
  constructor(private readonly loginRepository:LoginRepository ) {}

  async login(loginDto: LoginDTO): Promise<{Aluno, Empresa, Professor}> {
    try{
      return await this.loginRepository.login(loginDto);
    } catch (e) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
  }
}
