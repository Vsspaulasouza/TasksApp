<h1 align="center">TasksApp</h1>
 
---
 
## 📝 Tabela de conteúdo
-   [Sobre](#about)
-   [Preview](#demo)
-   [Construído usando](#built_using)
-   [Rodando o projeto](#getting_started)
-   [Autor](#authors)
 
## 🧐 Sobre <a name = "about"></a>
 
Um app para gerenciar tarefas, feito com o objetivo de aprender um pouco mais sobre o desenvolvimento Backend.
 
## 🎥 Preview <a name = "demo"></a>
 
<a href="https://github.com/Vsspaulasouza/TasksApp">
<img src="./tasks.png" alt="Tasks"></img>
</a>
 
## ⛏️ Construído usando <a name = "built_using"></a>
 
-   [NestJs](https://nestjs.com/) - Um framework Node.js para construir aplicações do lado do servidor
-   [React](https://react.dev/) - Framework Javascript para criação de aplicações web
 
 
## 🏁 Rodando o projeto <a name = "getting_started"></a>
 
Siga as seguintes instruções para rodar a aplicação em sua máquina.

### Pré-requisitos

Para executar esse projeto, você vai precisar do [Node](https://nodejs.org/pt-br/), seu gerenciador de pacotes(npm), o [Docker](https://www.docker.com/) e o Docker Compose instalado em sua máquina.

Faça o clone do projeto e siga para seção **Backend** para rodar o servidor e **Frontend** para rodar a interface da aplicação

```shell
gh repo clone Vsspaulasouza/TasksApp
```

### Backend

Abra a pasta do projeto e acesse a pasta da api

```shell
cd task-api
```

Instale todas as dependências do projeto

```shell
npm i
```

Configure o arquivo `docker-compose.yml` de acordo com as suas preferências

```yml
# docker-compose.yml example
services:
  dev-db:
    image: postgres:13
    ports:
      - YOUR_PORT
    environment:
      - POSTGRES_USER= YOUR_USERNAME
      - POSTGRES_PASSWORD= YOUR_PASSWORD
      - POSTGRES_DB= YOUR_DB_NAME
    networks:
      - myNetwork
networks:
  myNetwork:
```

Crie um arquivo `.env`, ele deve ter todas as variáveis presentes no arquivo `.env.example`. Certifique-se de que a DATABASE_URL esteja de acordo com o que está definido no `docker-compose.yml`

```dosini
# .env.example, committed to repo
DATABASE_URL="postgresql://username:password@localhost:port/database_name"
JWT_SECRET="SecretKey"
```

Agora, é necessário subir o banco de dados e realizar as migrações

```shell
npm run db:dev:restart
```

Após isso, basta executar o projeto

```shell
npm run start
```

Pronto, a sua aplicação estará rodando em seu ambiente local no endereço http://localhost:3000.

### Frontend

Abra a pasta do projeto e acesse a pasta da aplicação frontend

```shell
cd task-frontend
```

Instale todas as dependências do projeto

```shell
npm i
```

Após instalar as dependências, basta executar o projeto

```shell
npm run dev
```

Após isso será gerado um link para acesso à aplicação rodando em seu ambiente local.

---

## ✍️ Autor <a name = "authors"></a>

| [<img src="https://avatars.githubusercontent.com/u/69551648?v=4" width=115>](https://github.com/Vsspaulasouza) |
| -------------------------------------------------------------------------------------------------------------- |

| [Vinícius Soares](https://github.com/Vsspaulasouza)
