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
      telefone,
      especialidade
    } = req.body;

    const tipo_usuario = 'nutricionista';

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

    await Nutricionista.create({
      id_nutricionista: newUser.id_usuario,
      especialidade
    });

    res.status(201).json({ message: 'Nutricionista cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno' });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, senha } = req.body;

    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ message: 'Usuário não encontrado' });
      return;
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      res.status(401).json({ message: 'Senha incorreta' });
      return;
    }

    res.status(200).json({
      message: 'Login bem-sucedido',
      tipo_usuario: user.tipo_usuario
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno ao fazer login' });
  }
};