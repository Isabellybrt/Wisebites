import { Request, Response } from 'express';
import { PlanoNutricionalModel } from '../models/PlanoNutricional';
import { RefeicaoModel } from '../models/Refeicao';

export const criarPlanoNutricional = async (req: Request, res: Response) => {
  try {
    const { id_cliente, dataCriacao, refeicoes } = req.body;

    if (!id_cliente || isNaN(Number(id_cliente))) {
      return res.status(400).json({ erro: 'id_cliente inválido' });
    }

    const plano = await PlanoNutricionalModel.create({
      id_cliente: Number(id_cliente),
      dataCriacao,
    });

    const id_planoNutricional = plano.id_planoNutricional;

    for (const tipo in refeicoes) {
      for (const r of refeicoes[tipo]) {
        await RefeicaoModel.create({
          horario: r.horario,
          descricao: r.descricao,
          porcoes: r.porcoes,
          id_planoNutricional,
        });
      }
    }

    res.status(201).json({ mensagem: 'Plano criado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno ao salvar plano.' });
  }
};