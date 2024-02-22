# Agenda Telefônica

Este é um projeto de agenda de números telefônicos dividido em frontend e backend. O backend foi desenvolvido em Node.js com MySQL, oferecendo operações CRUD (Create, Read, Update, Delete) para contatos e usuários. O frontend foi criado utilizando HTML, CSS e JavaScript, o HTML e CSS foram desenvolvidos por [Makawlly Rocha](https://github.com/Mescaule) e o JavaScript foi feito em PairProgramming. O frontend consome a API do backend e permite que os usuários realizem operações de cadastro, login e manipulação de contatos.

## Backend

O backend oferece os seguintes endpoints:

### Usuários

- **Listar todos os usuários:**
  - Método: GET
  - Rota: `/user`

- **Cadastrar um usuário:**
  - Método: POST
  - Rota: `/user`
  - Corpo da requisição:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

- **Atualizar um usuário:**
  - Método: PUT
  - Rota: `/user/{IDusuário}`
  - Corpo da requisição:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

- **Deletar um usuário:**
  - Método: DELETE
  - Rota: `/user/{IDusuário}`

### Contatos

- **Listar todos os contatos de um usuário:**
  - Método: GET
  - Rota: `/contact`
  - Cabeçalho da requisição:
    ```
    Authorization: Bearer TOKEN
    ```

- **Cadastrar um contato para o usuário:**
  - Método: POST
  - Rota: `/contact`
  - Cabeçalho da requisição:
    ```
    Authorization: Bearer TOKEN
    ```
  - Corpo da requisição:
    ```json
    {
      "contactName": "string",
      "phoneNumber": "string"
    }
    ```

- **Atualizar um contato:**
  - Método: PUT
  - Rota: `/contact/{IDcontato}`
  - Cabeçalho da requisição:
    ```
    Authorization: Bearer TOKEN
    ```
  - Corpo da requisição:
    ```json
    {
      "contactName": "string",
      "phoneNumber": "string"
    }
    ```

- **Deletar um contato:**
  - Método: DELETE
  - Rota: `/contact/{IDcontato}`
  - Cabeçalho da requisição:
    ```
    Authorization: Bearer TOKEN
    ```

### Login

- **Realizar login:**
  - Método: POST
  - Rota: `/login`
  - Corpo da requisição:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

## Frontend

O frontend oferece uma interface amigável para que os usuários possam realizar as operações disponibilizadas pelo backend, como cadastro, login e manipulação de contatos.

---

Este projeto foi desenvolvido como parte do curso Desenvolvimento de sistemas - Senai BA, com contribuições de diferentes membros da equipe.

**Equipe de Desenvolvimento:**
- [Makawlly Rocha](https://github.com/Mescaule) Front-End
- [Filipe Andrade](https://github.com/Filipelaw45) Back-End
- [Mauro Júnior](https://github.com/maurodk) Estrutura do Banco de dados
- Hélio Andrade
- Daniel França
- Claudio Henrique

**Data de Criação:** 18/02/2024
