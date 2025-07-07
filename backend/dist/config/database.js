"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (typeof process.env.DB_PASS !== 'string') {
    throw new Error('❌ ERRO: DB_PASS não foi carregado corretamente do .env');
}
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', `${process.env.DB_PASS || ''}`, // força string
{
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
});
