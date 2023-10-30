import { Aluno, Conta, Premiacao, PrismaClient, Professor, Usuario } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {

    // await prisma.aluno.deleteMany({});
    // await prisma.curso.deleteMany({});
    // await prisma.professor.deleteMany({});
    // await prisma.usuario.deleteMany({});
    // await prisma.conta.deleteMany({});
    // await prisma.instituicao.deleteMany({});
    // return;

    const instituicoes = [
      { id: 1 },
    ]

    const alunos: Aluno[] = [
      {
        contaId: 3,
        cursoId: 1,
        cpf: "1234567890",
        email: "aluno@email.com",
        endereco: "rua 3",
        instituicaoId: 1,
        nome: "aluno 1",
        nomeUsuario: "aluno1",
        rg: "123456",
      },
      {
        contaId: 4,
        cursoId: 1,
        cpf: "123",
        email: "aluno2@email.com",
        endereco: "rua 2",
        instituicaoId: 1,
        nome: "aluno 2",
        nomeUsuario: "aluno2",
        rg: "1234567",
      }
    ]

    const usuarios: Usuario[] = [
      {
        nomeUsuario: "prof1",
        senha: "12345",
      },
      {
        nomeUsuario: "prof2",
        senha: "12345",
      },
      {
        nomeUsuario: "aluno1",
        senha: "12345",
      },
      {
        nomeUsuario: "aluno2",
        senha: "12345",
      }
    ];

    const contas: Conta[] = [
      {
        id: 1,
        saldo: 100,
      },
      {
        id: 2,
        saldo: 100,
      },
      {
        id: 3,
        saldo: 0,
      },
      {
        id: 4,
        saldo: 0,
      }
    ]

    const cursos = [
      {
        id: 1,
        nome: 'Ciência da Computação',
        instituicaoId: 1,
      },
      {
        id: 2,
        nome: 'Engenharia',
        instituicaoId: 1,
      },
      {
        id: 3,
        nome: 'Medicina',
        instituicaoId: 1,
      },
    ];

    const professores: Professor[] = [
      {
        cpf: "12345",
        departamento: "computação",
        endereco: "rua 1",
        nome: "professor 1",
        instituicaoId: 1,
        contaId: 1,
        nomeUsuario: "prof1",
      },
      {
        cpf: "123456",
        departamento: "filosofia",
        endereco: "rua 2",
        nome: "professor 2",
        instituicaoId: 1,
        contaId: 2,
        nomeUsuario: "prof2",
      }
    ]

    const premiacoes: Premiacao[] = [
      {
        alunoCpf: "1234567890",
        id: 1,
        professorCpf: "12345",
        descricao: "ótimo comportamento",
        valor: 10,
      },
      {
        alunoCpf: "123",
        id: 2,
        professorCpf: "123456",
        descricao: "alunx muitx bonite",
        valor: 20,
      },
    ]

    await prisma.instituicao.createMany({ data: instituicoes });
    await prisma.usuario.createMany({ data: usuarios });
    await prisma.conta.createMany({ data: contas });
    await prisma.professor.createMany({ data: professores });
    await prisma.curso.createMany({ data: cursos });
    await prisma.aluno.createMany({ data: alunos });
    await prisma.premiacao.createMany({ data: premiacoes });
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error) => console.error(error));
