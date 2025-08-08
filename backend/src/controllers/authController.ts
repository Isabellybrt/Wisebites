import { Request, Response } from 'express';
import { Usuario, Cliente, Nutricionista } from '../models';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import { RegisterRequest, LoginRequest } from '../types';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      nome,
      email,
      senha,
      tipo_usuario,
      telefone,
      idade,
      pesoAtual,
      altura,
      restricoes,
      objetivo,
      especialidade,
    }: RegisterRequest = req.body;

    // Verificar se o email já existe
    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email já cadastrado' });
      return;
    }

    // Hash da senha
    const hashedPassword = await hashPassword(senha);

    // Criar usuário
    const user = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
      tipo_usuario,
      telefone,
    });

    // Criar perfil específico baseado no tipo de usuário
    if (tipo_usuario === 'cliente') {
      await Cliente.create({
        id_cliente: user.id_usuario,
        idade,
        pesoAtual,
        altura,
        restricoes,
        objetivo,
      });
    } else if (tipo_usuario === 'nutricionista') {
      await Nutricionista.create({
        id_nutricionista: user.id_usuario,
        especialidade,
      });
    }

    // Gerar token
    const token = generateToken({
      id_usuario: user.id_usuario,
      email: user.email,
      tipo_usuario: user.tipo_usuario,
    });

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id_usuario: user.id_usuario,
        nome: user.nome,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
        telefone: user.telefone,
      },
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, senha }: LoginRequest = req.body;

    // Buscar usuário com dados específicos do tipo
    const user = await Usuario.findOne({ 
      where: { email },
      include: [
        {
          model: Cliente,
          as: 'cliente',
        },
        {
          model: Nutricionista,
          as: 'nutricionista',
        },
      ],
    });
    
    if (!user) {
      res.status(401).json({ message: 'Email ou senha inválidos' });
      return;
    }

    // Verificar senha
    const isValidPassword = await comparePassword(senha, user.senha);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Email ou senha inválidos' });
      return;
    }

    // Gerar token
    const token = generateToken({
      id_usuario: user.id_usuario,
      email: user.email,
      tipo_usuario: user.tipo_usuario,
    });

    // Preparar resposta baseada no tipo de usuário
    const userResponse: any = {
      id_usuario: user.id_usuario,
      nome: user.nome,
      email: user.email,
      tipo_usuario: user.tipo_usuario,
      telefone: user.telefone,
    };

    // Adicionar dados específicos do tipo de usuário
    if (user.tipo_usuario === 'paciente' && (user as any).cliente) {
      userResponse.cliente = (user as any).cliente;
    } else if (user.tipo_usuario === 'nutricionista' && (user as any).nutricionista) {
      userResponse.nutricionista = (user as any).nutricionista;
    }

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id_usuario;
    
    const user = await Usuario.findByPk(userId, {
      include: [
        {
          model: Cliente,
          as: 'cliente',
        },
        {
          model: Nutricionista,
          as: 'nutricionista',
        },
      ],
    });

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    res.json({
      user: {
        id_usuario: user.id_usuario,
        nome: user.nome,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
        telefone: user.telefone,
        cliente: (user as any).cliente,
        nutricionista: (user as any).nutricionista,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
