# Estrelinha - NestJS | React
![project stack](https://skillicons.dev/icons?i=azure,ts,nest,prisma,react&perline=12) <br />


## 👨‍🏫 Professor:
Danilo Boechat Seufitelli


## 👨‍💻 Integrantes:
* Gabriel Oliveira 
* Bruno  Duarte  
* Marcos Paulo  
* Samuel Leal

## 💰 Sistema de Moeda Estudantil
O sistema de Moeda Estudantil consiste em criar um sistema que permite o cadastro de alunos, professores e empresas parceiras. 
Os professores recebem moedas para reconhecer o bom desempenho dos alunos, que podem trocar essas moedas por vantagens. 
O sistema deve permitir o envio de moedas, notificações por email, consulta de saldo e transações, além de autenticação para acesso.



## 💻 Tecnologias utilizadas
 - Azure
 - Draw.io
 - NestJS
 - Prisma
 - React
 - TypeScript

## 💿 Como executar 

### Back end
- Primeiro, acesse a pasta API por meio de ```cd implementacao/api```
- Em seguida, instale as dependências com ```npm i```.
- Após isso, crie a conexão local no seu SGBD e o schema, nomeando-o como desejar.
- Crie o arquivo ".env" com base no arquivo ".env.example" disponibilizado no repositório e substitua os dados com a sua conexão (nome do schema, usuário, senha e porta - geralmente 3306).
- Execute o comando ```npx prisma migrate dev``` para aplicar as migrações do schema na sua conexão local do bacno de dados.
- Execute ```npx prisma db seed``` para popular o banco com dados de exemplo.
- Por fim, execute ```npm run start:dev``` para executar o back-end.

### Front end
- Primeiro, acesse a pasta views por meio de ```cd implementacao/views```.
- Em seguida, instale as dependências com ```npm i```.
- Por fim, rode o projeto react com ```npm run dev```.

E você já está pronto para acessar o sistema estrelinha!

