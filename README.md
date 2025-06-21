<h1 align="center">

  <img src="https://i.imgur.com/4Qz4zfJ.png" alt="IN8 Logo" width="40" />

  <br>IN8 Teste - Projeto Fullstack<br>

</h1>

  

<p align="center">

  <img alt="Docker" src="https://img.shields.io/badge/Docker-✓-blue?logo=docker">

  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-16+-green?logo=node.js">

</p>

  

---

  

## 🎯 Objetivo

  

Teste técnico para a vaga de **Desenvolvedor Júnior** na [IN8](https://in8.com.br).  

Desenvolvi uma solução fullstack completa com arquitetura moderna e tecnologias robustas.

  

---

  

## 🚀 Começando

  

### 📋 Pré-requisitos

  

- [Docker](https://docs.docker.com/get-docker/)

- [Docker Compose](https://docs.docker.com/compose/install/)

- [Node.js 16+](https://nodejs.org/)

- [PNPM](https://pnpm.io/) *(opcional)*

  

### ⚡ Setup Rápido

  

```bash

# Clone o repositório

git clone https://github.com/seu-usuario/in8-teste.git

cd in8-teste

  

# Inicie todos os serviços com Docker

npm run dev:full

```

  

**Se preferir, você também pode iniciar o projeto sem Docker:**

  

```bash

# Frontend

cd frontend

npm install

npm run dev

```

  

```bash

# Backend

cd backend

npm install

npm run db:dev:restart

npm run start:dev

```

  

---

  

## 🛠️ Tecnologias Principais

  

| Backend | Frontend | Infraestrutura |

|--------|----------|----------------|

| ![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white) | ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) | ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white) |

  

---

  

## 🔍 Detalhes Técnicos

  

<details>

<summary><strong>📚 Arquitetura do Sistema</strong></summary>

  

- Estrutura modular com **NestJS** no backend

- **Next.js** no frontend com rotas protegidas

- Comunicação via REST com validação usando Zod

- Uso de Docker para orquestração

- Banco de dados PostgreSQL com ORM Prisma

  

</details>

  

<details>

<summary><strong>🛡️ Fluxo de Autenticação</strong></summary>

  

- JWT com **access token** e **refresh token**

- Middleware de proteção de rotas

- Integração com `nestjs-passport`

  

</details>

  

---

  

## 📦 Estrutura do Projeto

  

```bash

.

├── backend/       # API NestJS

│   ├── src/

│   │   ├── modules/

│   │   ├── shared/

│   │   └── main.ts

│   └── prisma/

├── frontend/      # Aplicação Next.js

│   ├── components/

│   ├── hooks/

│   └── pages/

└── infra/         # Configurações Docker

```

  

---

  

## 🌟 Funcionalidades Implementadas

  

| Módulo        | Funcionalidades |

|---------------|-----------------|

| **Autenticação** | JWT, proteção de rotas, refresh token |

| **Produtos**     | Catálogo, busca, filtros, avaliações |

| **Pedidos**      | Carrinho persistente, checkout, histórico |

| **Pagamento**    | Simulação (PIX, Cartão), webhooks |

  

---

  

## 🧠 Decisões Técnicas

  

### 🔧 Visão Geral

  

- Priorização de **simplicidade, escalabilidade e manutenibilidade**

- **NestJS** para backend pela modularidade e suporte nativo a TypeScript

- **Next.js + TypeScript** para frontend moderno e escalável

- **Prisma ORM** para modelagem e integração eficiente com o PostgreSQL

- **Docker** para ambientes consistentes

  

### 📌 Detalhes

  

- Uso de **DTOs** no backend para garantir estrutura consistente de dados

- **Validação com Zod** no frontend para segurança no consumo da API

- Criação de **hooks personalizados** para requisições HTTP reutilizáveis

- Abordagem híbrida com uso de **APIs externas e snapshots no backend**

- **Sistema de cache** no backend e **cache local no frontend** (carrinho)

- Autenticação via JWT com `nestjs-passport` para segurança e praticidade

  

---

  

## 📝 Licença

  

Este projeto está licenciado sob a [MIT License](LICENSE).

  

---

  

**Reusmo de decisões técnicas e de design:**

  

Minhas decisões técnicas e de design foram guiadas por princípios de simplicidade, escalabilidade e manutenibilidade. Utilizei tecnologias modernas e bem suportadas, como NestJS para o backend e Next.js para o frontend, garantindo uma experiência de desenvolvimento fluida e eficiente. A escolha do Prisma como ORM facilitou a interação com o banco de dados PostgreSQL, enquanto o Docker garantiu um ambiente consistente e isolado para todos os serviços.

  

**Decisões tecnicas no projeto:**

  

Decidi utilizar o Docker para facilitar o desenvolvimento e a portabilidade do projeto. O Docker permite que o ambiente de desenvolvimento seja facilmente replicado em diferentes máquinas, garantindo consistência e evitando problemas de configuração.

  

No backend, optei por utilizar o NestJS, usei o Prisma como ORM para facilitar a interação com o banco de dados e o PostgreSQL como banco de dados relacional.

  

No frontend, utilizei o React/Next.js com typescript para garantir uma experiência de desenvolvimento mais robusta e escalável. Usando o Tailwind CSS para estilização, proporcionando um design moderno e responsivo. E usei também Shadcn/ui para componentes reutilizáveis e estilizados para agilizar o desenvolvimento. Junto com Zod para a validação de dados enviados para API. Optei por normalizar os dados das duas APIs para facilitar a integração e o consumo dos dados no frontend. E usei o fetch para fazer as requisições HTTP, garantindo uma comunicação eficiente entre o frontend e o backend.

  

No frontend implementei hooks personalizados para encapsular a lógica de requisições HTTP, melhorando a reutilização de código e a organização do projeto.

  

Sobre as APIs: optei por uma abordagem hibrida usando diretamente as APIs no frontend para obter os dados mais recentes. Mas também implementei "snapshots" no backend para garantir que mesmo que se os dados nas APIs externas mudarem, o frontend ainda terá acesso aos dados anteriores. Garantindo um histórico que não é alterado com a API para consultas de compras posteriores.

  

Também implementei um sistema de cache no backend para melhorar a performance e reduzir a carga nas APIs externas. O cache é atualizado periodicamente para garantir que os dados estejam sempre atualizados.

  

Já no frontend, implementei um sistema de cache local para armazenar o carrinho de compras do usuário, garantindo que os dados sejam persistidos mesmo após o fechamento do navegador. Isso melhora a experiência do usuário, permitindo que ele retome a compra de onde parou.

  

Também implementei um sistema de autenticação simples usando JWT para proteger as rotas do backend e garantir que apenas usuários autenticados possam acessar certas funcionalidades, como a criação de pedidos utilizei o nestjs-passport para facilitar a integração com o JWT e garantir uma autenticação segura e eficiente.

  

Usei dtos para garantir que os dados enviados e recebidos pelas APIs estejam sempre no formato esperado, melhorando a validação e a segurança dos dados.
