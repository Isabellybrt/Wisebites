import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import { Nutricionista } from '../models/Nutricionista';
import { Cliente } from '../models/Cliente';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      nome,
      email,
      senha,
      tipo_usuario,
      telefone,
      especialidade,
      idade,
      peso_atual,
      altura,
      restricoes,
      objetivo
    } = req.body;

    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email já cadastrado' });
      return;
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
      tipo_usuario,
      telefone
    });

    if (tipo_usuario === 'nutricionista') {
      await Nutricionista.create({
        id_nutricionista: newUser.id_usuario,
        especialidade
      });
    }

    if (tipo_usuario === 'cliente') {
      await Cliente.create({
        id_cliente: newUser.id_usuario,
        idade,
        peso_atual,
        altura,
        restricoes,
        objetivo
      });
    }

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno' });
  }
};
