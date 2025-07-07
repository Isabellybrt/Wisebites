import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

if (typeof process.env.DB_PASS !== 'string') {
  throw new Error('❌ ERRO: DB_PASS não foi carregado corretamente do .env');
}

export const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  `${process.env.DB_PASS || ''}`, // força string
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);
