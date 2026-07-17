# auth-api

API de autenticação completa com JWT, refresh token, roles e documentação Swagger.

## 🌐 Produção

**API:** https://zippy-enchantment-production-dce7.up.railway.app/health  
**Documentação Swagger:** https://zippy-enchantment-production-dce7.up.railway.app/docs

## 🚀 Tecnologias

- Node.js + Express
- TypeScript
- PostgreSQL + Prisma ORM
- JWT (JSON Web Token)
- Bcrypt (hash de senha)
- Zod (validação de dados)
- Cookie HttpOnly (refresh token seguro)
- Swagger (documentação interativa)
- Docker

## 🔐 Funcionalidades

- Cadastro com senha hasheada via bcrypt
- Login com geração de access token (15min) e refresh token (7 dias)
- Refresh token armazenado em cookie HttpOnly — protegido contra XSS
- Renovação automática de token via /auth/refresh
- Logout com invalidação do refresh token no banco
- Sistema de roles — ADMIN e USER
- Rotas protegidas por middleware de autenticação JWT
- Validação de dados em todas as rotas com Zod

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

Acesse em: http://localhost:3000  
Documentação: http://localhost:3000/docs

## 📦 Endpoints

### Auth
| Method | Route | Descrição |
|--------|-------|-----------|
| POST | /auth/register | Cadastro de usuário |
| POST | /auth/login | Login e geração de tokens |
| POST | /auth/refresh | Renovar access token |
| POST | /auth/logout | Logout e invalidação do token |

### Usuários
| Method | Route | Descrição | Auth |
|--------|-------|-----------|------|
| GET | /usuarios/me | Dados do usuário logado | USER/ADMIN |
| GET | /usuarios | Listar todos os usuários | ADMIN |

### Sistema
| Method | Route | Descrição |
|--------|-------|-----------|
| GET | /health | Status da API |
| GET | /docs | Documentação Swagger |

## 🔑 Como usar a autenticação

```bash
# 1. Cadastre um usuário
POST /auth/register
{ "nome": "Guilherme", "email": "gui@email.com", "senha": "123456" }

# 2. Faça login
POST /auth/login
{ "email": "gui@email.com", "senha": "123456" }
# retorna: { accessToken, usuario }

# 3. Use o token nas rotas protegidas
GET /usuarios/me
Authorization: Bearer SEU_ACCESS_TOKEN
```

## 📁 Estrutura

```
auth-api/
├── src/
│   ├── config/
│   │   └── swagger.ts
│   ├── controllers/
│   │   └── authController.ts
│   ├── database/
│   │   └── prisma.ts
│   ├── middlewares/
│   │   ├── auth.ts
│   │   ├── role.ts
│   │   └── validate.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   └── usuario.ts
│   ├── schemas/
│   │   └── authSchema.ts
│   ├── services/
│   │   └── authService.ts
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── docker-compose.yml
├── .env.example
└── README.md
```