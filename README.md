# IN8 Teste - Projeto Fullstack
IN8 Teste - Projeto Fullstack
📝 Descrição
Teste técnico para a vaga de Desenvolvedor Júnior na IN8. Projeto fullstack com:

Backend: NestJS + Prisma + PostgreSQL

Frontend: Next.js (React) + TypeScript + Tailwind CSS

🚀 Como Executar
Pré-requisitos
Docker e Docker Compose instalados

Node.js (v16+)

⚡ Comandos Rápidos
bash
# Instalar dependências e iniciar tudo (primeira execução)
npm run dev:full

# Iniciar apenas os containers (após a primeira execução)
npm run dev

# Parar todos os containers
npm run down

# Executar migrations do Prisma
npm run prisma:migrate

# Acessar Prisma Studio (http://localhost:5555)
npm run prisma:studio
🔧 Fluxo de Desenvolvimento
Ambiente Inicial:

bash
npm run dev:full  # Instala dependências e sobe todos os serviços
Durante o Desenvolvimento:

bash
npm run dev  # Reinicia os containers com as alterações
Ao adicionar novas dependências:

bash
npm run install:all && npm run dev:full
Acesse as aplicações:

Frontend: http://localhost:3001

Backend: http://localhost:3000

Banco de Dados: postgresql://postgres:123@localhost:5432/nest

🗃️ Diagrama do Banco de Dados
Diagram
Code











<sub>Visualize interativamente no Mermaid Live Editor</sub>

🛠️ Decisões Técnicas
Backend
NestJS: Estrutura modular e escalável

Prisma ORM: Type-safe database client

PostgreSQL: Banco de dados relacional robusto

JWT: Autenticação segura com nestjs-passport

Cache: Implementado para APIs externas

DTOs: Validação de dados com class-validator

Frontend
Next.js: SSR e rotas dinâmicas

TypeScript: Tipagem estática

Tailwind CSS: Estilização utilitária

Shadcn/ui: Componentes acessíveis

Zod: Validação de formulários

Hooks Customizados: Lógica reutilizável

Cache Local: Persistência do carrinho

Infraestrutura
Docker: Ambiente consistente entre desenvolvedores

Approach Híbrido:

APIs consumidas diretamente no frontend para dados atualizados

Snapshots no backend para histórico de pedidos

🌟 Features Implementadas
Autenticação JWT

Carrinho persistente (localStorage)

Integração com múltiplas APIs externas

Sistema de avaliação de produtos

Dashboard de pedidos

Pagamento simulado (PIX/Cartão)

📌 Melhorias Futuras
Testes automatizados (Jest + Cypress)

CI/CD pipeline

Deploy em cloud (AWS/GCP)

Sistema de notificações em tempo real

📊 Estrutura do Projeto
text
in8-teste/
├── backend/       # NestJS + Prisma
├── frontend/      # Next.js + Tailwind
└── docker-compose.yml

Decisões tecnicas no projeto:
Decidi utilizar o Docker para facilitar o desenvolvimento e a portabilidade do projeto. O Docker permite que o ambiente de desenvolvimento seja facilmente replicado em diferentes máquinas, garantindo consistência e evitando problemas de configuração.

Resumo:
No backend, optei por utilizar o NestJS, usei o Prisma como ORM para facilitar a interação com o banco de dados e o PostgreSQL como banco de dados relacional. 
No frontend, utilizei o React/Next.js com typescript para garantir uma experiência de desenvolvimento mais robusta e escalável. Usando o Tailwind CSS para estilização, proporcionando um design moderno e responsivo. E usei também Shadcn/ui para componentes reutilizáveis e estilizados para agilizar o desenvolvimento. Junto com Zod para a validação de dados enviados para API. Optei por normalizar os dados das duas APIs para facilitar a integração e o consumo dos dados no frontend. E usei o fetch para fazer as requisições HTTP, garantindo uma comunicação eficiente entre o frontend e o backend.

No frontend implementei hooks personalizados para encapsular a lógica de requisições HTTP, melhorando a reutilização de código e a organização do projeto. 

Sobre as APIs: optei por uma abordagem hibrida usando diretamente as APIs no frontend para obter os dados mais recentes. Mas também implementei "snapshots" no backend para garantir que mesmo que se os dados nas APIs externas mudarem, o frontend ainda terá acesso aos dados anteriores. Garantindo um histórico que não é alterado com a API para consultas de compras posteriores.
Também implementei um sistema de cache no backend para melhorar a performance e reduzir a carga nas APIs externas. O cache é atualizado periodicamente para garantir que os dados estejam sempre atualizados.
Já no frontend, implementei um sistema de cache local para armazenar o carrinho de compras do usuário, garantindo que os dados sejam persistidos mesmo após o fechamento do navegador. Isso melhora a experiência do usuário, permitindo que ele retome a compra de onde parou. 
Também implementei um sistema de autenticação simples usando JWT para proteger as rotas do backend e garantir que apenas usuários autenticados possam acessar certas funcionalidades, como a criação de pedidos utilizei o nestjs-passport para facilitar a integração com o JWT e garantir uma autenticação segura e eficiente.

Usei dtos para garantir que os dados enviados e recebidos pelas APIs estejam sempre no formato esperado, melhorando a validação e a segurança dos dados. 


