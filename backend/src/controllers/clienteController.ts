import { Request, Response } from 'express';
import { Cliente, PesoRegistro, HistoricoAlimentar, AlimentoExtra, PlanoNutricional, Refeicao, Alimento, CaloriaEstimativa, RegistroRefeicao, Usuario } from '../models';
import { AuthRequest } from '../types';
import { Op } from 'sequelize';

// Interface estendida para incluir relacionamentos
interface ClienteWithRelations extends Cliente {
  usuario?: Usuario;
  planoNutricional?: PlanoNutricional & {
    refeicoes?: Refeicao[];
  };
}

export const getClienteProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;
    
    const cliente = await Cliente.findOne({
      where: { id_cliente: userId },
      include: [
        {
          model: HistoricoAlimentar,
          as: 'historicoAlimentar',
          include: [
            {
              model: AlimentoExtra,
              as: 'alimentosExtras',
            },
          ],
        },
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
    console.error('Erro ao buscar perfil do cliente:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const updateClienteProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;
    const { idade, pesoAtual, altura, restricoes, objetivo } = req.body as any;

    const cliente = await Cliente.findOne({ where: { id_cliente: userId } });
    if (!cliente) {
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }

    await cliente.update({
      idade,
      pesoAtual,
      altura,
      restricoes,
      objetivo,
    });

    res.json({ message: 'Perfil atualizado com sucesso', cliente });
  } catch (error) {
    console.error('Erro ao atualizar perfil do cliente:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const addPesoRegistro = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;
    const { peso, dataHora } = req.body as any;

    const pesoRegistro = await PesoRegistro.create({
      id_cliente: userId,
      peso,
      dataHora: dataHora || new Date(),
    });

    res.status(201).json({ message: 'Peso registrado com sucesso', pesoRegistro });
  } catch (error) {
    console.error('Erro ao registrar peso:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getPesoRegistros = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;

    const pesosRegistro = await PesoRegistro.findAll({
      where: { id_cliente: userId },
      order: [['dataHora', 'DESC']],
    });

    res.json({ pesosRegistro });
  } catch (error) {
    console.error('Erro ao buscar registros de peso:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const addAlimentoExtra = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;
    const { descricao, horario, quantidade } = req.body as any;

    // Buscar ou criar histórico alimentar
    let historicoAlimentar = await HistoricoAlimentar.findOne({
      where: { id_cliente: userId },
    });

    if (!historicoAlimentar) {
      historicoAlimentar = await HistoricoAlimentar.create({
        id_cliente: userId,
      });
    }

    const alimentoExtra = await AlimentoExtra.create({
      id_historicoAlimentar: historicoAlimentar.id_historicoAlimentar,
      descricao,
      horario: horario || new Date(),
      quantidade,
    });

    res.status(201).json({ message: 'Alimento extra registrado com sucesso', alimentoExtra });
  } catch (error) {
    console.error('Erro ao registrar alimento extra:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getAlimentosExtras = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;

    const historicoAlimentar = await HistoricoAlimentar.findOne({
      where: { id_cliente: userId },
      include: [
        {
          model: AlimentoExtra,
          as: 'alimentosExtras',
          order: [['horario', 'DESC']],
        },
      ],
    });

    res.json({ alimentosExtras: (historicoAlimentar as any)?.alimentosExtras || [] });
  } catch (error) {
    console.error('Erro ao buscar alimentos extras:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const uploadCaloriaEstimativa = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;
    const { caloriasEstimadas } = req.body as any;
    const imagem = req.file?.buffer;

    const caloriaEstimativa = await CaloriaEstimativa.create({
      id_cliente: userId,
      imagem,
      caloriasEstimadas,
    });

    res.status(201).json({ message: 'Estimativa de calorias registrada com sucesso', caloriaEstimativa });
  } catch (error) {
    console.error('Erro ao registrar estimativa de calorias:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getCaloriasEstimativas = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;

    const caloriasEstimativas = await CaloriaEstimativa.findAll({
      where: { id_cliente: userId },
      order: [['createdAt', 'DESC']],
    });

    res.json({ caloriasEstimativas });
  } catch (error) {
    console.error('Erro ao buscar estimativas de calorias:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const registrarRefeicao = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;
    const { data, tipoRefeicao, descricao, horario, observacoes } = req.body as any;

    // Validar dados obrigatórios
    if (!data || !tipoRefeicao || !descricao || !horario) {
      res.status(400).json({ message: 'Data, tipo de refeição, descrição e horário são obrigatórios' });
      return;
    }

    // Criar registro de refeição
    const registroRefeicao = await RegistroRefeicao.create({
      id_cliente: userId,
      data,
      tipoRefeicao,
      descricao,
      horario,
      observacoes,
    });

    res.status(201).json({ 
      message: 'Refeição registrada com sucesso', 
      registroRefeicao 
    });
  } catch (error) {
    console.error('Erro ao registrar refeição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getRegistrosRefeicao = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;
    const { data } = req.query as any;

    let whereClause: any = { id_cliente: userId };
    
    // Se uma data específica foi fornecida, filtrar por ela
    if (data) {
      whereClause.data = data;
    }

    const registrosRefeicao = await RegistroRefeicao.findAll({
      where: whereClause,
      order: [['data', 'DESC'], ['horario', 'ASC']],
    });

    res.json({ registrosRefeicao });
  } catch (error) {
    console.error('Erro ao buscar registros de refeição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getDashboardData = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id_usuario;
    const hoje = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Buscar dados do cliente
    const cliente = await Cliente.findOne({
      where: { id_cliente: userId },
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nome'],
        },
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
    }) as ClienteWithRelations | null;

    // Buscar registros de refeição de hoje
    const registrosHoje = await RegistroRefeicao.findAll({
      where: { 
        id_cliente: userId,
        data: hoje,
      },
      order: [['horario', 'ASC']],
    });

    // Buscar registros dos últimos 7 dias
    const umaSemanaAtras = new Date();
    umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7);

    const registrosSemana = await RegistroRefeicao.findAll({
      where: { 
        id_cliente: userId,
        createdAt: {
          [Op.gte]: umaSemanaAtras,
        },
      },
      order: [['data', 'DESC'], ['horario', 'ASC']],
    });

    // Calcular estatísticas
    const totalRefeicoesPlano = cliente?.planoNutricional?.refeicoes?.length || 0;
    const refeicoesRegistradasHoje = registrosHoje.length;
    const adesaoDiaria = totalRefeicoesPlano > 0 ? Math.round((refeicoesRegistradasHoje / totalRefeicoesPlano) * 100) : 0;

    // Buscar próximo horário de refeição
    const agora = new Date();
    const horaAtual = agora.getHours() * 60 + agora.getMinutes(); // em minutos

    let proximaRefeicao = null;
    if (cliente?.planoNutricional?.refeicoes) {
      for (const refeicao of cliente.planoNutricional.refeicoes) {
        if (refeicao.horario) {
          const [horas, minutos] = refeicao.horario.split(':').map(Number);
          const horarioRefeicao = horas * 60 + minutos;
          
          if (horarioRefeicao > horaAtual) {
            proximaRefeicao = refeicao;
            break;
          }
        }
      }
    }

    res.json({
      cliente: {
        nome: cliente?.usuario?.nome || 'Paciente',
        planoNutricional: cliente?.planoNutricional,
      },
      estatisticas: {
        adesaoDiaria,
        refeicoesPlanejadas: totalRefeicoesPlano,
        refeicoesRegistradas: refeicoesRegistradasHoje,
        registrosSemana: registrosSemana.length,
      },
      registrosHoje,
      proximaRefeicao,
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
