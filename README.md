# Projeto de Contas a Pagar

## Setup Inicial
1. Clone o repositório
2. Instale dependências:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
3. Inicie o MongoDB via Docker
   docker run -d -p 27017:27017 --name mongo_dev mongo:6
4. Inicie o servidor:
   cd backend
   cp .env
   npm run dev
5. Inicie o frontend:
   cd frontend
   cp .env
   npm run dev
6. Produção do Docker:
   docker-compose up --build -d
   docker-compose ps

## Estrutura de Containers:

frontend: Aplicação React (porta 80)

backend: API Node.js (porta 3000)

mongo: Banco de dados

redis: Cache (se configurado)

## Comandos Úteis:

cd frontend && npm test --> Rodar testes frontend

cd backend && npm test --> Rodar testes backend

docker-compose down -v --> Limpar containers Docker

docker-compose pull && docker-compose up -d --> Atualizar versão do Docker

docker-compose logs -f backend --> Ver logs do backend

## Acessando a Aplicação:

1. Desenvolvimento: http://localhost:5173 (frontend) e http://localhost:3000 (backend)
2. Produção: http://localhost:80 (frontend) e http://localhost:3000 (backend)

## Solução de Problemas Comuns:

docker ps --> Verificar se os containers estão em execução

docker-compose up --force-recreate - d --> Forçar a recriação dos containers

frontend/.env --> Configuração do frontend

backend/.env --> Configuração do backend

No backend: CORS_ORIGINS=http://localhost:5173,http://localhost:80 --> Configuração de origens permitidas

## Primeiro Acesso:
1. Acesse a aplicação em http://localhost:5173/login
2. Cadastre um usuário admin:
   |
   V
   docker exec -it mongo_dev mongosh
   db.usuarios.insertOne({
      nome: "Admin",
      email: "admin@exemplo.com",
      senha: "$2a$10$EXAMPLEHASH", # senha: admin123
      role: "admin"
   })
   Utilizando o MongoDB Shell.

## Configuração HTTPS (opcional):

1. Gere certificados com LetsEncrypt:
   docker run -it --rm -p 80:80 -v $(pwd)/nginx/certs:/etc/letsencrypt certbot/certbot certonly --standalone -d seu-dominio.com

## Próximos Passos após Inicialização:
1. Configure um domínio personalizado
2. Implemente monitoramento
3. Configure backups automáticos
4. Adicione CI/CD para deploy automático

