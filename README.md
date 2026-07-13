# auth-api

API de autenticação completa com JWT, roles e refresh token.

## 🚀 Tecnologias

- Node.js + Express
- TypeScript
- PostgreSQL + Prisma
- JWT (JSON Web Token)
- Zod (validação)
- Docker

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js 18+
- Docker

### Passo a passo

```bash
# clone o repositório
git clone https://github.com/guilherme-corsino/auth-api.git
cd auth-api

# instale as dependências
npm install

# configure as variáveis de ambiente
cp .env.example .env

# suba o banco de dados
docker-compose up -d

# rode as migrations
npx prisma migrate dev

# rode o servidor
npm run dev
```

## 📦 Endpoints

### Auth
| Method | Route | Descrição |
|--------|-------|-----------|
| POST | /auth/register | Cadastro de usuário |
| POST | /auth/login | Login e geração de token |
| POST | /auth/refresh | Renovar token |
| POST | /auth/logout | Logout |

### Usuários
| Method | Route | Descrição |
|--------|-------|-----------|
| GET | /usuarios | Listar usuários (admin) |
| GET | /usuarios/:id | Buscar usuário |

## 🔐 Autenticação

A API usa JWT com refresh token. O access token expira em 15 minutos e o refresh token em 7 dias — padrão usado em aplicações profissionais.

## 📁 Estrutura

```
auth-api/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── database/
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── docker-compose.yml
├── .env.example
└── README.md
```