/*
  Warnings:

  - Made the column `contaId` on table `aluno` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contaId` on table `professor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `aluno` DROP FOREIGN KEY `Aluno_contaId_fkey`;

-- DropForeignKey
ALTER TABLE `professor` DROP FOREIGN KEY `Professor_contaId_fkey`;

-- AlterTable
ALTER TABLE `aluno` MODIFY `contaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `professor` MODIFY `contaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `Conta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professor` ADD CONSTRAINT `Professor_contaId_fkey` FOREIGN KEY (`contaId`) REFERENCES `Conta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
