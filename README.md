# 🥗 Wisebites
Wisebites é uma aplicação web voltada para nutricionistas que desejam cadastrar e acompanhar seus pacientes de forma digital, prática e eficiente.

Este projeto foi desenvolvido como trabalho final da disciplina de Engenharia de Software.

---

## Visão Geral
O Wisebites foi criado para facilitar o gerenciamento de pacientes por nutricionistas, oferecendo uma plataforma para cadastro, acompanhamento, planejamento nutricional e análise de refeições via IA (reconhecimento de alimentos).

O sistema é dividido em **backend** (API REST) e **frontend** (interface web). A integração com modelos do Hugging Face permite detectar alimentos em imagens e estimar calorias como auxílio ao nutricionista.

---

## Arquitetura do Projeto
- **Backend:** API REST com Node.js + TypeScript, Express e Sequelize (PostgreSQL).
- **Frontend:** Aplicação web (React + Vite ou equivalente) que consome a API.
- **IA / Integração:** Hugging Face (modelo de detecção de objetos) para identificar alimentos em imagens.

---

## Tecnologias Utilizadas

### Backend
- Node.js (>=16)
- TypeScript
- Express
- Sequelize (ORM)
- PostgreSQL
- JWT (autenticação)
- bcryptjs (hash de senhas)
- Multer (upload de arquivos)
- Helmet (security headers)
- CORS

### Frontend
- React (com Vite)
- Axios
- Tailwind CSS (opcional)
- Hugging Face API (modelos de detecção)

---

## Pré-requisitos
- Node.js (versão 16 ou superior)
- PostgreSQL
- npm ou yarn
- (Opcional) Conta e API Key do Hugging Face para produção

---

## Instalação e Configuração

### 1. Configurar e instalar o backend
```bash
cd backend
npm install
cp env.example .env
```
Exemplo de `.env` (backend):
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wisebites
DB_USER=postgres
DB_PASSWORD=sua_senha

JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRES_IN=24h

PORT=3001
NODE_ENV=development

UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

**Configure o banco de dados PostgreSQL:**
   - Crie um banco de dados chamado `wisebites`
   - Execute os scripts SQL fornecidos para criar as tabelas

### 2. Configurar e instalar o frontend
```bash
cd ../frontend
npm install
cp .env.example .env
```
Exemplo de `.env` (frontend):
```env
VITE_HUGGINGFACE_API_KEY=sua_api_key_aqui
```

---

## Execução do Projeto

### Backend
```bash
# Em /backend
npm run dev      # modo desenvolvimento (com nodemon/ts-node)
npm run build    # build para produção (gera dist/)
npm start        # iniciar aplicação em produção
```

### Frontend
```bash
# Em /frontend
npm run dev
npm run build
npm run preview  # visualizar build localmente
```

---

## Funcionalidades principais
- Registro e autenticação de usuários (JWT)
- Perfis de Cliente e Nutricionista
- CRUD de alimentos (apenas nutricionistas podem criar/editar/remover)
- Registro e histórico de peso
- Registro de alimentos extras consumidos
- Criação de planos nutricionais e refeições
- Agendamentos de atendimentos
- Upload de imagens para estimativa de calorias / identificação de alimentos (IA)
- Sistema de fallback com dados simulados quando IA estiver indisponível

---

## Configuração Hugging Face (Frontend)
- Modelo principal: `facebook/detr-resnet-50` (detecção de objetos)
- Modelo alternativo (fallback): `microsoft/DialoGPT-medium` (uso excepcional)
- Sem API Key: demo pública (limite ~30.000 requisições/mês)
- Com API Key: melhor performance e mais disponibilidade

### Passos recomendados
1. Crie conta em https://huggingface.co
2. Vá em Settings → Access Tokens → New token (permissão *read*)
3. Adicione token em `frontend/.env` como `VITE_HUGGINGFACE_API_KEY`
4. Trate erros 503 (modelo carregando) exibindo uma mensagem amigável e opção de retry

---

## Estrutura de Pastas (resumo)
```
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   └── index.ts
├── uploads/
├── dist/
└── package.json

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
├── public/
└── package.json
```

---


## Segurança
- Senhas com bcrypt
- JWT com expiração
- Helmet para cabeçalhos de segurança
- CORS configurado (em produção restringir origem)
- Validar entradas (evitar injections)
- Rate limiting recomendado em endpoints públicos

---

## Autores
- Isabelly  
- Larissa  
- Guilherme  
- Júlio

---

## Observações finais

Este projeto Wisebites foi desenvolvido com foco em fornecer uma solução prática e eficiente para nutricionistas que desejam acompanhar seus pacientes de forma digital.  

O uso de tecnologias modernas como Node.js, TypeScript, React e integração com IA por meio do Hugging Face demonstra o compromisso com inovação e qualidade.

Agradecemos o interesse e esperamos que o Wisebites possa ajudar a transformar a prática nutricional para melhor!
