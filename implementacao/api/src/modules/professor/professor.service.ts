import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from './professor.repository';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) { }

  async getTransactions(nomeUsuario: string) {
    return await this.professorRepository.getTransactions(nomeUsuario);
  }
}
