"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarClientes = void 0;
const Cliente_1 = require("../models/Cliente");
const Usuario_1 = require("../models/Usuario");
const sequelize_1 = require("sequelize");
const buscarClientes = async (req, res) => {
    const { nome } = req.query;
    try {
        const clientes = await Cliente_1.Cliente.findAll({
            include: [{
                    model: Usuario_1.Usuario,
                    as: 'usuario',
                    where: {
                        nome: { [sequelize_1.Op.iLike]: `%${nome}%` }
                    },
                    attributes: ['nome']
                }],
            attributes: ['id_cliente', 'idade', 'peso_atual', 'altura', 'restricoes', 'objetivo']
        });
        res.json(clientes);
    }
    catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ erro: 'Erro ao buscar clientes.' });
    }
};
exports.buscarClientes = buscarClientes;
