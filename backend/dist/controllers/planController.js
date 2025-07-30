"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarPlanoNutricional = void 0;
const PlanoNutricional_1 = require("../models/PlanoNutricional");
const Refeicao_1 = require("../models/Refeicao");
const criarPlanoNutricional = async (req, res) => {
    try {
        const { id_cliente, dataCriacao, refeicoes } = req.body;
        if (!id_cliente || isNaN(Number(id_cliente))) {
            return res.status(400).json({ erro: 'id_cliente inválido' });
        }
        const plano = await PlanoNutricional_1.PlanoNutricionalModel.create({
            id_cliente: Number(id_cliente),
            dataCriacao,
        });
        const id_planoNutricional = plano.id_planoNutricional;
        for (const tipo in refeicoes) {
            for (const r of refeicoes[tipo]) {
                await Refeicao_1.RefeicaoModel.create({
                    horario: r.horario,
                    descricao: r.descricao,
                    porcoes: r.porcoes,
                    id_planoNutricional,
                });
            }
        }
        res.status(201).json({ mensagem: 'Plano criado com sucesso!' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro interno ao salvar plano.' });
    }
};
exports.criarPlanoNutricional = criarPlanoNutricional;
