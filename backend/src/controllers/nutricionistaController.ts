import { Request, Response } from 'express';
import { Nutricionista, Cliente, PlanoNutricional, Refeicao, Alimento, RefeicaoAlimentos, Atendimento, Usuario, RegistroRefeicao } from '../models';
import { AuthRequest } from '../types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

export const getNutricionistaProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;
    
    const nutricionista = await Nutricionista.findOne({
      where: { id_nutricionista: userId },
      include: [
        {
          model: Atendimento,
          as: 'atendimentos',
          include: [
            {
              model: Cliente,
              as: 'cliente',
            },
          ],
        },
      ],
    });

    if (!nutricionista) {
      res.status(404).json({ message: 'Nutricionista não encontrado' });
      return;
    }

    res.json({ nutricionista });
  } catch (error) {
    console.error('Erro ao buscar perfil do nutricionista:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const updateNutricionistaProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;
    const { especialidade } = req.body as any;

    const nutricionista = await Nutricionista.findOne({ where: { id_nutricionista: userId } });
    if (!nutricionista) {
      res.status(404).json({ message: 'Nutricionista não encontrado' });
      return;
    }

    await nutricionista.update({
      especialidade,
    });

    res.json({ message: 'Perfil atualizado com sucesso', nutricionista });
  } catch (error) {
    console.error('Erro ao atualizar perfil do nutricionista:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getClientes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const nutricionistaId = req.user!.id_usuario;

    // Buscar atendimentos do nutricionista para obter os clientes associados
    const atendimentos = await Atendimento.findAll({
      where: { id_nutricionista: nutricionistaId },
      include: [
        {
          model: Cliente,
          as: 'cliente',
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['nome', 'email', 'telefone'],
            },
            {
              model: PlanoNutricional,
              as: 'planoNutricional',
            },
          ],
        },
      ],
    });

    // Extrair clientes únicos dos atendimentos
    const clientes = atendimentos.map(atendimento => (atendimento as any).cliente);

    res.json({ clientes });
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getClienteById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id_cliente } = req.params as any;

    const cliente = await Cliente.findByPk(id_cliente, {
      include: [
        {
          model: PlanoNutricional,
          as: 'planoNutricional',
          include: [
            {
              model: Refeicao,
              as: 'refeicoes',
              include: [
                {
                  model: Alimento,
                  as: 'alimentos',
                },
              ],
            },
          ],
        },
      ],
    });

    if (!cliente) {
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }

    res.json({ cliente });
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const createPlanoNutricional = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log('📝 Dados recebidos para criar plano:', req.body);
    const { id_cliente, nome, descricao, dataCriacao, refeicoes } = req.body as any;

    // Validar dados obrigatórios
    if (!id_cliente) {
      console.log('❌ ID do cliente não fornecido');
      res.status(400).json({ message: 'ID do cliente é obrigatório' });
      return;
    }

    // Verificar se o cliente existe
    const cliente = await Cliente.findByPk(id_cliente);
    if (!cliente) {
      console.log('❌ Cliente não encontrado:', id_cliente);
      res.status(400).json({ message: 'Cliente não encontrado' });
      return;
    }

    // Verificar se o cliente já tem um plano
    const existingPlano = await PlanoNutricional.findOne({
      where: { id_cliente },
    });

    if (existingPlano) {
      console.log('❌ Cliente já possui plano:', id_cliente);
      res.status(400).json({ message: 'Cliente já possui um plano nutricional' });
      return;
    }

    console.log('✅ Criando plano para cliente:', id_cliente);
    // Criar plano nutricional
    const planoNutricional = await PlanoNutricional.create({
      id_cliente,
      nome,
      descricao,
      dataCriacao: dataCriacao || new Date(),
    });
    
    console.log('✅ Plano criado:', planoNutricional.id_planoNutricional);

    // Criar refeições se fornecidas
    if (refeicoes && Array.isArray(refeicoes)) {
      console.log('🍽️ Criando refeições:', refeicoes.length);
      for (const refeicao of refeicoes) {
        const { horario, descricao, porcoes, alimentos } = refeicao;
        console.log('📝 Criando refeição:', { horario, descricao, porcoes });

        const novaRefeicao = await Refeicao.create({
          id_planoNutricional: planoNutricional.id_planoNutricional,
          horario,
          descricao,
          porcoes,
        });

        console.log('✅ Refeição criada:', novaRefeicao.id_refeicao);

        // Associar alimentos à refeição
        if (alimentos && Array.isArray(alimentos)) {
          for (const alimentoId of alimentos) {
            await RefeicaoAlimentos.create({
              id_refeicao: novaRefeicao.id_refeicao,
              id_alimento: alimentoId,
            });
          }
        }
      }
    } else {
      console.log('⚠️ Nenhuma refeição fornecida');
    }

    console.log('✅ Plano nutricional criado com sucesso');
    res.status(201).json({ message: 'Plano nutricional criado com sucesso', planoNutricional });
  } catch (error) {
    console.error('Erro ao criar plano nutricional:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const updatePlanoNutricional = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id_planoNutricional } = req.params as any;
    const { refeicoes } = req.body as any;

    const planoNutricional = await PlanoNutricional.findByPk(id_planoNutricional);
    if (!planoNutricional) {
      res.status(404).json({ message: 'Plano nutricional não encontrado' });
      return;
    }

    // Atualizar refeições
    if (refeicoes && Array.isArray(refeicoes)) {
      // Remover refeições existentes
      await Refeicao.destroy({
        where: { id_planoNutricional },
      });

      // Criar novas refeições
      for (const refeicao of refeicoes) {
        const { horario, descricao, porcoes, alimentos } = refeicao;

        const novaRefeicao = await Refeicao.create({
          id_planoNutricional,
          horario,
          descricao,
          porcoes,
        });

        // Associar alimentos à refeição
        if (alimentos && Array.isArray(alimentos)) {
          for (const alimentoId of alimentos) {
            await RefeicaoAlimentos.create({
              id_refeicao: novaRefeicao.id_refeicao,
              id_alimento: alimentoId,
            });
          }
        }
      }
    }

    res.json({ message: 'Plano nutricional atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar plano nutricional:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getAtendimentos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;

    const atendimentos = await Atendimento.findAll({
      where: { id_nutricionista: userId },
      include: [
        {
          model: Cliente,
          as: 'cliente',
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ atendimentos });
  } catch (error) {
    console.error('Erro ao buscar atendimentos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const createAtendimento = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id_cliente, motivo, horarioPreferencial, observacoes } = req.body as any;
    const id_nutricionista = req.user!.id_usuario;

    const atendimento = await Atendimento.create({
      id_cliente,
      id_nutricionista,
      motivo,
      horarioPreferencial,
      observacoes,
    });

    res.status(201).json({ message: 'Atendimento criado com sucesso', atendimento });
  } catch (error) {
    console.error('Erro ao criar atendimento:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const cadastrarPaciente = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      nome,
      email,
      senha,
      telefone,
      idade,
      pesoAtual,
      altura,
      objetivo,
      restricoes,
    } = req.body as any;

    // Verificar se o email já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      res.status(400).json({ message: 'Email já cadastrado' });
      return;
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar usuário
    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      tipo_usuario: 'paciente',
      telefone: telefone || null,
    });

    // Criar perfil do cliente
    const cliente = await Cliente.create({
      id_cliente: usuario.id_usuario,
      idade,
      pesoAtual,
      altura,
      objetivo,
      restricoes: restricoes || null,
    });

    // Criar atendimento para associar o paciente ao nutricionista
    const atendimento = await Atendimento.create({
      id_cliente: cliente.id_cliente,
      id_nutricionista: req.user!.id_usuario,
      motivo: 'Primeira consulta',
      horarioPreferencial: 'A definir',
      observacoes: 'Paciente cadastrado pelo nutricionista',
    });

    res.status(201).json({
      message: 'Paciente cadastrado com sucesso e associado ao nutricionista',
      user: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario,
        telefone: usuario.telefone,
        cliente: {
          id_cliente: cliente.id_cliente,
          idade: cliente.idade,
          pesoAtual: cliente.pesoAtual,
          altura: cliente.altura,
          objetivo: cliente.objetivo,
          restricoes: cliente.restricoes,
        },
      },
    });
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getPlanosNutricionais = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const nutricionistaId = req.user!.id_usuario;
    console.log('🔍 Buscando planos para nutricionista:', nutricionistaId);

    // Primeiro, buscar os clientes do nutricionista
    const atendimentos = await Atendimento.findAll({
      where: { id_nutricionista: nutricionistaId },
      attributes: ['id_cliente'],
    });

    const clientIds = atendimentos.map(atendimento => atendimento.id_cliente);
    console.log('👥 IDs dos clientes:', clientIds);

    if (clientIds.length === 0) {
      console.log('📋 Nenhum cliente encontrado para o nutricionista');
      res.json({ planos: [] });
      return;
    }

    // Buscar planos dos clientes
    const planos = await PlanoNutricional.findAll({
      where: {
        id_cliente: clientIds,
      },
      include: [
        {
          model: Cliente,
          as: 'cliente',
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['nome', 'email'],
            },
          ],
        },
        {
          model: Refeicao,
          as: 'refeicoes',
        },
      ],
    });

    console.log('📋 Planos encontrados:', planos.length);
    res.json({ planos });
  } catch (error) {
    console.error('Erro ao buscar planos nutricionais:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const associarPlanoAoPaciente = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id_cliente, id_planoNutricional } = req.body as any;
    console.log('🔗 Associando plano ao paciente:', { id_cliente, id_planoNutricional });

    // Verificar se o cliente existe
    const cliente = await Cliente.findByPk(id_cliente);
    if (!cliente) {
      console.log('❌ Cliente não encontrado:', id_cliente);
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }

    // Verificar se o plano existe
    const plano = await PlanoNutricional.findByPk(id_planoNutricional);
    if (!plano) {
      console.log('❌ Plano não encontrado:', id_planoNutricional);
      res.status(404).json({ message: 'Plano nutricional não encontrado' });
      return;
    }

    // Verificar se o plano já está associado a outro cliente
    if (plano.id_cliente !== id_cliente) {
      console.log('❌ Plano já está associado a outro cliente');
      res.status(400).json({ message: 'Este plano já está associado a outro paciente' });
      return;
    }

    console.log('✅ Plano já está associado ao paciente correto');
    res.json({ message: 'Plano associado ao paciente com sucesso' });
  } catch (error) {
    console.error('Erro ao associar plano ao paciente:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getHistoricoRefeicoesPaciente = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id_cliente } = req.params as any;
    const nutricionistaId = req.user!.id_usuario;

    // Verificar se o cliente pertence ao nutricionista
    const atendimento = await Atendimento.findOne({
      where: { 
        id_cliente: parseInt(id_cliente),
        id_nutricionista: nutricionistaId 
      },
    });

    if (!atendimento) {
      res.status(403).json({ message: 'Acesso negado. Cliente não pertence a este nutricionista.' });
      return;
    }

    // Buscar registros de refeição do cliente
    const registrosRefeicao = await RegistroRefeicao.findAll({
      where: { id_cliente: parseInt(id_cliente) },
      include: [
        {
          model: Cliente,
          as: 'cliente',
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['nome', 'email'],
            },
          ],
        },
      ],
      order: [['data', 'DESC'], ['horario', 'ASC']],
    });

    res.json({ registrosRefeicao });
  } catch (error) {
    console.error('Erro ao buscar histórico de refeições:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getDashboardData = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const nutricionistaId = req.user!.id_usuario;

    // Buscar total de pacientes
    const totalPacientes = await Atendimento.count({
      where: { id_nutricionista: nutricionistaId },
      distinct: true,
      col: 'id_cliente',
    });

    // Buscar pacientes ativos (com plano nutricional)
    const pacientesAtivos = await PlanoNutricional.count({
      include: [
        {
          model: Cliente,
          as: 'cliente',
          include: [
            {
              model: Atendimento,
              as: 'atendimentos',
              where: { id_nutricionista: nutricionistaId },
            },
          ],
        },
      ],
    });

    // Buscar total de planos ativos
    const planosAtivos = await PlanoNutricional.count({
      include: [
        {
          model: Cliente,
          as: 'cliente',
          include: [
            {
              model: Atendimento,
              as: 'atendimentos',
              where: { id_nutricionista: nutricionistaId },
            },
          ],
        },
      ],
    });

    // Buscar pacientes recentes (últimos 5)
    const pacientesRecentes = await Cliente.findAll({
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nome', 'email'],
        },
        {
          model: PlanoNutricional,
          as: 'planoNutricional',
        },
        {
          model: Atendimento,
          as: 'atendimentos',
          where: { id_nutricionista: nutricionistaId },
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: 5,
    });

    // Buscar registros de refeição recentes (últimos 7 dias)
    const hoje = new Date();
    const umaSemanaAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);

    const registrosRecentes = await RegistroRefeicao.findAll({
      include: [
        {
          model: Cliente,
          as: 'cliente',
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['nome'],
            },
            {
              model: Atendimento,
              as: 'atendimentos',
              where: { id_nutricionista: nutricionistaId },
            },
          ],
        },
      ],
      where: {
        createdAt: {
          [Op.gte]: umaSemanaAtras,
        },
      },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    res.json({
      estatisticas: {
        totalPacientes,
        pacientesAtivos,
        planosAtivos,
        registrosRecentes: registrosRecentes.length,
      },
      pacientesRecentes,
      registrosRecentes,
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
