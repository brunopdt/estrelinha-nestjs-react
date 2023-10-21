-- CreateTable
CREATE TABLE `Premiacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` INTEGER NOT NULL,
    `alunoCpf` VARCHAR(191) NOT NULL,
    `professorCpf` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Premiacao` ADD CONSTRAINT `Premiacao_alunoCpf_fkey` FOREIGN KEY (`alunoCpf`) REFERENCES `Aluno`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Premiacao` ADD CONSTRAINT `Premiacao_professorCpf_fkey` FOREIGN KEY (`professorCpf`) REFERENCES `Professor`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;
