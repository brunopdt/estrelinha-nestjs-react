import { Conta, PrismaClient, Professor, Usuario } from '@prisma/client';

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

    const usuarios: Usuario[] = [
      {
        nomeUsuario: "usuario1",
        senha: "12345",
      },
      {
        nomeUsuario: "usuario2",
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
      }
    ]

    const cursos = [
      {
        nome: 'Ciência da Computação',
        instituicaoId: 1,
      },
      {
        nome: 'Engenharia',
        instituicaoId: 1,
      },
      {
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
        nomeUsuario: "usuario1",
      },
      {
        cpf: "123456",
        departamento: "filosofia",
        endereco: "rua 2",
        nome: "professor 2",
        instituicaoId: 1,
        contaId: 2,
        nomeUsuario: "usuario2",
      }
    ]
    await prisma.instituicao.createMany({ data: instituicoes });
    await prisma.usuario.createMany({ data: usuarios });
    await prisma.conta.createMany({ data: contas });
    await prisma.professor.createMany({ data: professores });
    await prisma.curso.createMany({ data: cursos });
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error) => console.error(error));
