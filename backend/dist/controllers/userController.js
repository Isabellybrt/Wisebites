"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const Usuario_1 = require("../models/Usuario");
const Nutricionista_1 = require("../models/Nutricionista");
const Cliente_1 = require("../models/Cliente");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = async (req, res) => {
    try {
        const { nome, email, senha, tipo_usuario, telefone, especialidade, idade, peso_atual, altura, restricoes, objetivo } = req.body;
        const existingUser = await Usuario_1.Usuario.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'Email já cadastrado' });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(senha, 10);
        const newUser = await Usuario_1.Usuario.create({
            nome,
            email,
            senha: hashedPassword,
            tipo_usuario,
            telefone
        });
        if (tipo_usuario === 'nutricionista') {
            await Nutricionista_1.Nutricionista.create({
                id_nutricionista: newUser.id_usuario,
                especialidade
            });
        }
        if (tipo_usuario === 'cliente') {
            await Cliente_1.Cliente.create({
                id_cliente: newUser.id_usuario,
                idade,
                peso_atual,
                altura,
                restricoes,
                objetivo
            });
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await Usuario_1.Usuario.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ message: 'Usuário não encontrado' });
            return;
        }
        const senhaCorreta = await bcrypt_1.default.compare(senha, user.senha);
        if (!senhaCorreta) {
            res.status(401).json({ message: 'Senha incorreta' });
            return;
        }
        res.status(200).json({
            message: 'Login bem-sucedido',
            tipo_usuario: user.tipo_usuario
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno ao fazer login' });
    }
};
exports.login = login;
