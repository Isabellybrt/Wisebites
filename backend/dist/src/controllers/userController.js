"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const Usuario_1 = require("../models/Usuario");
const Nutricionista_1 = require("../models/Nutricionista");
const Cliente_1 = require("../models/Cliente");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = async (req, res) => {
    try {
        const { nome, email, senha, tipo_usuario, telefone, especialidade, idade, pesoAtual, altura, restricoes, objetivo } = req.body;
        const existingUser = await Usuario_1.Usuario.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'Email já cadastrado' });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(senha, 10);
        const newUser = await Usuario_1.Usuario.create({ nome, email, senha: hashedPassword, tipo_usuario, telefone });
        if (tipo_usuario === 'nutricionista') {
            await Nutricionista_1.Nutricionista.create({ id_nutricionista: newUser.id_usuario, especialidade });
        }
        if (tipo_usuario === 'cliente') {
            await Cliente_1.Cliente.create({ id_cliente: newUser.id_usuario, idade, pesoAtual, altura, restricoes, objetivo });
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno' });
    }
};
exports.register = register;
