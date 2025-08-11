#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Configuração do WiseBites Backend - Variáveis de Ambiente\n');

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

// Verificar se o arquivo .env já existe
if (fs.existsSync(envPath)) {
  console.log('⚠️  Arquivo .env já existe!');
  console.log('   Se você quiser recriar, delete o arquivo atual primeiro.\n');
  process.exit(0);
}

// Verificar se o arquivo env.example existe
if (!fs.existsSync(envExamplePath)) {
  console.log('❌ Arquivo env.example não encontrado!');
  process.exit(1);
}

try {
  // Copiar env.example para .env
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ Arquivo .env criado com sucesso!');
  console.log('');
  console.log('📝 Próximos passos:');
  console.log('1. Configure o PostgreSQL:');
  console.log('   - Instale o PostgreSQL se ainda não tiver');
  console.log('   - Crie um banco de dados chamado "wisebites"');
  console.log('   - Configure o usuário e senha');
  console.log('');
  console.log('2. Edite o arquivo .env na pasta backend:');
  console.log('   - DB_PASSWORD=sua_senha_do_postgres');
  console.log('   - JWT_SECRET=sua_chave_secreta_aqui');
  console.log('');
  console.log('🔑 Configuração do PostgreSQL:');
  console.log('1. Instale o PostgreSQL: https://www.postgresql.org/download/');
  console.log('2. Durante a instalação, defina uma senha para o usuário postgres');
  console.log('3. Crie o banco de dados: CREATE DATABASE wisebites;');
  console.log('4. Atualize a senha no arquivo .env');
  console.log('');
  console.log('🚀 Após configurar, execute: npm run dev');
  
} catch (error) {
  console.error('❌ Erro ao criar arquivo .env:', error.message);
  process.exit(1);
}
