# Jogo Herói e Vilão [Trabalho Banco de Dados 2º DSM]

## Descrição do Projeto

Este projeto é um jogo simples onde um herói e um vilão se enfrentam. O sistema inclui uma tela de login e cadastro, uma tela de jogo e um dashboard que exibe a vida atual do herói e do vilão, além de mostrar o tipo de ação que cada um realizou em sequência. 

## Funcionalidades

- **Sistema de Login e Cadastro:** Permite que os usuários se cadastrem e façam login.
- **Tela de Jogo:** Permite que os usuários joguem e as ações realizadas pelo herói e pelo vilão sejam salvas no banco de dados.
- **Dashboard:** Exibe a vida atual do herói e do vilão e mostra as ações realizadas por cada um.

## Tecnologias Usadas

- **Frontend:** Vue.js
- **Backend:** Node.js com Express
- **Banco de Dados:** PostgreSQL hospedado no Render
- **Comunicação em Tempo Real:** Socket.io

## Orientações de Utilização

### Pré-requisitos

- Node.js
- NPM ou Yarn
- PostgreSQL

### Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/victorsoaresho/trabalho-jogo-banco-de-dados-fatec/
    cd trabalho-jogo-banco-de-dados-fatec
    ```

2. Instale as dependências do backend:
    ```sh
    cd backend
    npm install
    ```

3. Instale as dependências do frontend:
    ```sh
    cd frontend
    npm install
    ```

### Configuração

1. Crie um banco de dados PostgreSQL no Render e obtenha a URL de conexão.

2. Configure as variáveis de ambiente no arquivo `.env` no diretório `backend`:
    ```sh
    DATABASE_URL=postgres://<USUARIO>:<SENHA>@<HOST>:<PORTA>/<NOME_DO_BANCO>
    ```

### Execução

1. Inicie o backend:
    ```sh
    cd backend
    npm start
    ```

2. Inicie o frontend:
    ```sh
    cd frontend
    npm run serve
    ```

## Prints da Aplicação

### Login e Cadastro
![Login](https://github.com/victorsoaresho/trabalho-jogo-banco-de-dados-fatec/assets/136899628/c3e2fff8-26dc-405d-ba5c-1b8895ee3816)
![Cadastro](https://github.com/victorsoaresho/trabalho-jogo-banco-de-dados-fatec/assets/136899628/38daa814-ce79-443a-a6c7-a6e5bb069172)

### Jogo
![Jogo](https://github.com/victorsoaresho/trabalho-jogo-banco-de-dados-fatec/assets/136899628/32458605-7e2c-4921-b672-ff662dcf9b02)

### Dashboard
![Dashboard](https://github.com/victorsoaresho/trabalho-jogo-banco-de-dados-fatec/assets/136899628/f4781940-aba3-412e-b0bc-764e6113fdd4)

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/sua-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/sua-feature`).
5. Abra um Pull Request.
