import { Router } from 'express';
import {
  getNutricionistaProfile,
  updateNutricionistaProfile,
  getClientes,
  getClienteById,
  createPlanoNutricional,
  updatePlanoNutricional,
  getPlanosNutricionais,
  associarPlanoAoPaciente,
  getHistoricoRefeicoesPaciente,
  getDashboardData,
  getAtendimentos,
  createAtendimento,
  cadastrarPaciente,
} from '../controllers/nutricionistaController';
import { authMiddleware, requireNutricionista } from '../middleware/auth';

const router = Router();

// Todas as rotas requerem autenticação e perfil de nutricionista
router.use(authMiddleware);
router.use(requireNutricionista);

// Perfil do nutricionista
router.get('/profile', getNutricionistaProfile);
router.put('/profile', updateNutricionistaProfile);

// Dashboard
router.get('/dashboard', getDashboardData);

// Gerenciamento de clientes
router.get('/clientes', getClientes);
router.get('/clientes/:id_cliente', getClienteById);
router.get('/clientes/:id_cliente/historico-refeicoes', getHistoricoRefeicoesPaciente);
router.post('/cadastrar-paciente', cadastrarPaciente);

// Planos nutricionais
router.get('/planos-nutricionais', getPlanosNutricionais);
router.post('/planos-nutricionais', createPlanoNutricional);
router.put('/planos-nutricionais/:id_planoNutricional', updatePlanoNutricional);
router.post('/associar-plano', associarPlanoAoPaciente);

// Atendimentos
router.get('/atendimentos', getAtendimentos);
router.post('/atendimentos', createAtendimento);

export default router;
