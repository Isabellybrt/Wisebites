import { Request, Response } from 'express';
import { Cliente } from '../models/Cliente';
import { Usuario } from '../models/Usuario';
import { Op } from 'sequelize';

export const buscarClientes = async (req: Request, res: Response) => {
  const { nome } = req.query;

  try {
    const clientes = await Cliente.findAll({
      include: [
        {
          model: Usuario,
          as: 'usuario',
          where: nome ? {
            nome: { [Op.iLike]: `%${nome}%` }
          } : undefined,
          attributes: ['nome', 'email']
        }
      ],
      attributes: ['id_cliente', 'idade', 'peso_atual', 'altura', 'restricoes', 'objetivo']
    });

    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ erro: 'Erro ao buscar clientes.' });
  }
};
