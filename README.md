# in8-teste

Teste tecnico para a vaga dev juior na in8

para inciar:
Fluxo Recomendado para Desenvolvimento:
Primeira execução:

bash
npm run dev:full
(Isso instalará dependências e construirá tudo)

Após fazer alterações no código:

bash
npm run dev
(Apenas reinicia os containers)

Quando adicionar novas dependências:

bash
npm run install:all && npm run dev:full


# Fluxo de desenvolvimento
# 1. Instalar dependências
npm install
# 2. Iniciar o ambiente de desenvolvimento
npm run dev
# 3. Acessar a aplicação
# 4. Fazer alterações no código
# 5. Verificar as alterações em tempo real
# 6. Parar o ambiente de desenvolvimento


Decisões tecnicas no projeto:
Decidi utilizar o Docker para facilitar o desenvolvimento e a portabilidade do projeto. O Docker permite que o ambiente de desenvolvimento seja facilmente replicado em diferentes máquinas, garantindo consistência e evitando problemas de configuração.

Resumo:
No backend, optei por utilizar o NestJS, usei o Prisma como ORM para facilitar a interação com o banco de dados e o PostgreSQL como banco de dados relacional. 
No frontend, utilizei o React/Next.js com typescript para garantir uma experiência de desenvolvimento mais robusta e escalável. Usando o Tailwind CSS para estilização, proporcionando um design moderno e responsivo. E usei também Shadcn/ui para componentes reutilizáveis e estilizados para agilizar o desenvolvimento. Junto com Zod para a validação de dados enviados para API. Optei por normalizar os dados das duas APIs para facilitar a integração e o consumo dos dados no frontend. E usei o fetch para fazer as requisições HTTP, garantindo uma comunicação eficiente entre o frontend e o backend.

Sobre as APIs: optei por uma abordagem hibrida usando diretamente as APIs no frontend para obter os dados mais recentes. Mas também implementei "snapshots" no backend para garantir que mesmo que se os dados nas APIs externas mudarem, o frontend ainda terá acesso aos dados anteriores. Garantindo um histórico que não é alterado com a API para consultas de compras posteriores.
Também implementei um sistema de cache no backend para melhorar a performance e reduzir a carga nas APIs externas. O cache é atualizado periodicamente para garantir que os dados estejam sempre atualizados.
Já no frontend, implementei um sistema de cache local para armazenar o carrinho de compras do usuário, garantindo que os dados sejam persistidos mesmo após o fechamento do navegador. Isso melhora a experiência do usuário, permitindo que ele retome a compra de onde parou. 
Também implementei um sistema de autenticação simples usando JWT para proteger as rotas do backend e garantir que apenas usuários autenticados possam acessar certas funcionalidades, como a criação de pedidos utilizei o nestjs-passport para facilitar a integração com o JWT e garantir uma autenticação segura e eficiente.

Usei dtos para garantir que os dados enviados e recebidos pelas APIs estejam sempre no formato esperado, melhorando a validação e a segurança dos dados. 
