import { Request, Response } from 'express';
import { Alimento } from '../models';

export const getAllAlimentos = async (req: Request, res: Response): Promise<void> => {
  try {
    const alimentos = await Alimento.findAll({
      order: [['nome', 'ASC']],
    });

    res.json({ alimentos });
  } catch (error) {
    console.error('Erro ao buscar alimentos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getAlimentoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_alimento } = req.params;

    const alimento = await Alimento.findByPk(id_alimento);
    if (!alimento) {
      res.status(404).json({ message: 'Alimento não encontrado' });
      return;
    }

    res.json({ alimento });
  } catch (error) {
    console.error('Erro ao buscar alimento:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const createAlimento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, calorias } = req.body;

    const alimento = await Alimento.create({
      nome,
      calorias,
    });

    res.status(201).json({ message: 'Alimento criado com sucesso', alimento });
  } catch (error) {
    console.error('Erro ao criar alimento:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const updateAlimento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_alimento } = req.params;
    const { nome, calorias } = req.body;

    const alimento = await Alimento.findByPk(id_alimento);
    if (!alimento) {
      res.status(404).json({ message: 'Alimento não encontrado' });
      return;
    }

    await alimento.update({
      nome,
      calorias,
    });

    res.json({ message: 'Alimento atualizado com sucesso', alimento });
  } catch (error) {
    console.error('Erro ao atualizar alimento:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const deleteAlimento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_alimento } = req.params;

    const alimento = await Alimento.findByPk(id_alimento);
    if (!alimento) {
      res.status(404).json({ message: 'Alimento não encontrado' });
      return;
    }

    await alimento.destroy();

    res.json({ message: 'Alimento removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover alimento:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const searchAlimentos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
      res.status(400).json({ message: 'Query de busca é obrigatória' });
      return;
    }

    const { Op } = require('sequelize');
    const alimentos = await Alimento.findAll({
      where: {
        nome: {
          [Op.iLike]: `%${query}%`,
        },
      },
      order: [['nome', 'ASC']],
    });

    res.json({ alimentos });
  } catch (error) {
    console.error('Erro ao buscar alimentos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
