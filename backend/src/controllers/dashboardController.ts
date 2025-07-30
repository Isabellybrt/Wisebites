import { Request, Response } from 'express';
import { Cliente } from '../models/Cliente';
import { Usuario } from '../models/Usuario';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // Total de pacientes
    const totalPacientes = await Cliente.count();

    // Pacientes mais recentes (últimos 3)
    const pacientesRecentes = await Cliente.findAll({
      include: [{ model: Usuario, as: 'usuario', attributes: ['nome'] }],
      order: [['id_cliente', 'DESC']],
      limit: 3
    });

    // Dados fictícios por enquanto
    const consultasHoje = 0;
    const planosAtivos = 0;

    res.json({
      totalPacientes,
      pacientesRecentes,
      consultasHoje,
      planosAtivos,
      pacientesAtivos: totalPacientes // você pode filtrar isso futuramente
    });
  } catch (error) {
    console.error('Erro no dashboard:', error);
    res.status(500).json({ erro: 'Erro ao carregar o dashboard' });
  }
};
