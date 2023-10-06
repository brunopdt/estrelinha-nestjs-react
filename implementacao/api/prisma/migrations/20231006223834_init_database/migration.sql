-- CreateTable
CREATE TABLE `Aluno` (
    `cpf` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `nomeUsuario` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Aluno_cpf_key`(`cpf`),
    UNIQUE INDEX `Aluno_rg_key`(`rg`),
    UNIQUE INDEX `Aluno_nomeUsuario_key`(`nomeUsuario`),
    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa` (
    `cnpj` VARCHAR(191) NOT NULL,
    `nomeFantasia` VARCHAR(191) NOT NULL,
    `nomeUsuario` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Empresa_cnpj_key`(`cnpj`),
    UNIQUE INDEX `Empresa_nomeUsuario_key`(`nomeUsuario`),
    PRIMARY KEY (`cnpj`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `nomeUsuario` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_nomeUsuario_key`(`nomeUsuario`),
    PRIMARY KEY (`nomeUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_nomeUsuario_fkey` FOREIGN KEY (`nomeUsuario`) REFERENCES `Usuario`(`nomeUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_nomeUsuario_fkey` FOREIGN KEY (`nomeUsuario`) REFERENCES `Usuario`(`nomeUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
