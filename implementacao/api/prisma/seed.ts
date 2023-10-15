import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {

    const instituicoes = [
      {},
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

    await prisma.instituicao.createMany({ data: instituicoes });
    await prisma.curso.createMany({ data: cursos });
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error) => console.error(error));
