/*
  Warnings:

  - A unique constraint covering the columns `[contaId]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cursoId` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instituicaoId` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aluno` ADD COLUMN `contaId` INTEGER NULL,
    ADD COLUMN `cursoId` INTEGER NOT NULL,
    ADD COLUMN `instituicaoId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Professor` (
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `departamento` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `nomeUsuario` VARCHAR(191) NOT NULL,
    `instituicaoId` INTEGER NOT NULL,
    `contaId` INTEGER NULL,

    UNIQUE INDEX `Professor_cpf_key`(`cpf`),
    UNIQUE INDEX `Professor_nomeUsuario_key`(`nomeUsuario`),
    UNIQUE INDEX `Professor_contaId_key`(`contaId`),
    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instituicao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `instituicaoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vantagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `valor` INTEGER NOT NULL,
    `fotoKey` VARCHAR(191) NOT NULL,
    `empresaCnpj` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alunoCpf` VARCHAR(191) NOT NULL,
    `valor` INTEGER NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vantagemId` INTEGER NOT NULL,
    `contaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `saldo` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Aluno_contaId_key` ON `Aluno`(`contaId`);

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `Conta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_instituicaoId_fkey` FOREIGN KEY (`instituicaoId`) REFERENCES `Instituicao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professor` ADD CONSTRAINT `Professor_nomeUsuario_fkey` FOREIGN KEY (`nomeUsuario`) REFERENCES `Usuario`(`nomeUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professor` ADD CONSTRAINT `Professor_instituicaoId_fkey` FOREIGN KEY (`instituicaoId`) REFERENCES `Instituicao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professor` ADD CONSTRAINT `Professor_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `Conta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_instituicaoId_fkey` FOREIGN KEY (`instituicaoId`) REFERENCES `Instituicao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vantagem` ADD CONSTRAINT `Vantagem_empresaCnpj_fkey` FOREIGN KEY (`empresaCnpj`) REFERENCES `Empresa`(`cnpj`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transacao` ADD CONSTRAINT `Transacao_alunoCpf_fkey` FOREIGN KEY (`alunoCpf`) REFERENCES `Aluno`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transacao` ADD CONSTRAINT `Transacao_vantagemId_fkey` FOREIGN KEY (`vantagemId`) REFERENCES `Vantagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transacao` ADD CONSTRAINT `Transacao_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `Conta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
