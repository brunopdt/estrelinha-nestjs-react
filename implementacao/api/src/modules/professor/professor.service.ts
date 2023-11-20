import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfessorRepository } from './professor.repository';
import { CreatePremiacaoDto } from './dto/CadastroAluno.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) { }

  async getTransactions(nomeUsuario: string) {
    return await this.professorRepository.getTransactions(nomeUsuario);
  }

  async premiar(createPremiacaoDto: CreatePremiacaoDto): Promise<void> {
    if(createPremiacaoDto.valor <= 0) throw new BadRequestException('Valor inválido, deve ser maior que 0');

    const aluno = await this.professorRepository.getAlunoById(createPremiacaoDto.alunoCpf);
    const professor = await this.professorRepository.getProfessorById(createPremiacaoDto.professorCpf);

    if (professor.conta.saldo < createPremiacaoDto.valor)
      throw new BadRequestException('Saldo insuficiente');

    await this.professorRepository.premiar(createPremiacaoDto.alunoCpf, createPremiacaoDto.professorCpf, createPremiacaoDto.valor, createPremiacaoDto.descricao);

    this.sendMail(aluno.email, aluno.nome, createPremiacaoDto.valor.toString(), createPremiacaoDto.descricao);
  }

  sendMail = (email: string, nomeAluno: string, valorPremio: string, motivo: string) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bruno.pduarte0@gmail.com',
        pass: 'ovfc yzei muuv bndt'
      }
    });

    const mailOptions = {
      from: 'bruno.pduarte0@gmail.com',
      to: `${email}`,
      subject: 'Premiação',
      text: `Parabéns ${nomeAluno}! Você acabou de ser premiado em ${valorPremio} Uhuuuu!\nMotivo: ${motivo}`
    };
    

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
