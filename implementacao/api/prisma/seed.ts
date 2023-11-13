import { Aluno, Conta, Empresa, Premiacao, PrismaClient, Professor, Usuario, Vantagem } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {

    await prisma.premiacao.deleteMany({});
    await prisma.aluno.deleteMany({});
    await prisma.curso.deleteMany({});
    await prisma.professor.deleteMany({});
    await prisma.usuario.deleteMany({});
    await prisma.conta.deleteMany({});
    await prisma.instituicao.deleteMany({}); 
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
        nome: "Everson",
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
        nome: "Joana",
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
      },
      {
        nomeUsuario: "empresa1",
        senha: "12345",
      },
      {
        nomeUsuario: "empresa2",
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
        saldo: 50,
      },
      {
        id: 4,
        saldo: 20,
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
        nome: "Rafael",
        instituicaoId: 1,
        contaId: 1,
        nomeUsuario: "prof1",
      },
      {
        cpf: "123456",
        departamento: "filosofia",
        endereco: "rua 2",
        nome: "Ana",
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
        valor: 50,
      },
      {
        alunoCpf: "123",
        id: 2,
        professorCpf: "123456",
        descricao: "alunx muitx bonite",
        valor: 20,
      },
    ]

    const empresas: Empresa[] = [
      {
       cnpj: "1234567890",
       nomeFantasia: "Bitz",
       nomeUsuario: "empresa1",
      },
      {
        cnpj: "0987654321",
        nomeFantasia: "Tech",
        nomeUsuario: "empresa2",
       },
    ]

    const vantagens: Vantagem[] = [
      {
        empresaCnpj: "1234567890",
        fotoKey: "https://estrelinha.blob.core.windows.net/estrelinha/1234567890-miata-1.jpg",
        id: 1,
        nome: "Carrinho da Hot Wheels",
        valor: 2,
      },
      {
        empresaCnpj: "1234567890",
        fotoKey: "https://estrelinha.blob.core.windows.net/estrelinha/1234567890-miata-1.jpg",
        id: 2,
        nome: "Pista Ataque do Tubarão",
        valor: 8,
      },
      {
        empresaCnpj: "0987654321",
        fotoKey: "https://estrelinha.blob.core.windows.net/estrelinha/1234567890-dente%20de%20le%C3%A3o-78.jpg",
        id: 3,
        nome: "Audi RS 5 Coupé",
        valor: 800000,
      },
      {
        empresaCnpj: "0987654321",
        fotoKey: "https://estrelinha.blob.core.windows.net/estrelinha/1234567890-dente%20de%20le%C3%A3o-78.jpg",
        id: 4,
        nome: "Borboleta de brinquedo",
        valor: 5,
      },
    ]

    await prisma.instituicao.createMany({ data: instituicoes });
    await prisma.usuario.createMany({ data: usuarios });
    await prisma.conta.createMany({ data: contas });
    await prisma.professor.createMany({ data: professores });
    await prisma.curso.createMany({ data: cursos });
    await prisma.aluno.createMany({ data: alunos });
    await prisma.premiacao.createMany({ data: premiacoes });
    await prisma.empresa.createMany({ data: empresas });
    await prisma.vantagem.createMany({ data: vantagens });
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error) => console.error(error));
