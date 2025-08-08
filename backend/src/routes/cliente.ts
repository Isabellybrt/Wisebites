import { Router } from 'express';
import {
  getClienteProfile,
  updateClienteProfile,
  addPesoRegistro,
  getPesoRegistros,
  addAlimentoExtra,
  getAlimentosExtras,
  uploadCaloriaEstimativa,
  getCaloriasEstimativas,
  registrarRefeicao,
  getRegistrosRefeicao,
  getDashboardData,
} from '../controllers/clienteController';
import { authMiddleware, requireCliente } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Todas as rotas requerem autenticação e perfil de cliente
router.use(authMiddleware);
router.use(requireCliente);

// Perfil do cliente
router.get('/profile', getClienteProfile);
router.put('/profile', updateClienteProfile);

// Dashboard
router.get('/dashboard', getDashboardData);

// Registros de peso
router.post('/peso', addPesoRegistro);
router.get('/peso', getPesoRegistros);

// Alimentos extras
router.post('/alimentos-extras', addAlimentoExtra);
router.get('/alimentos-extras', getAlimentosExtras);

// Estimativas de calorias
router.post('/calorias-estimativas', upload.single('imagem'), uploadCaloriaEstimativa);
router.get('/calorias-estimativas', getCaloriasEstimativas);

// Registros de refeição
router.post('/registrar-refeicao', registrarRefeicao);
router.get('/registros-refeicao', getRegistrosRefeicao);

export default router;
