import { Router } from 'express';
import {
  getAllAlimentos,
  getAlimentoById,
  createAlimento,
  updateAlimento,
  deleteAlimento,
  searchAlimentos,
} from '../controllers/alimentoController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Rotas públicas para consulta
router.get('/', getAllAlimentos);
router.get('/search', searchAlimentos);
router.get('/:id_alimento', getAlimentoById);

// Rotas protegidas para administração (apenas nutricionistas podem criar/editar)
router.use(authMiddleware);
router.post('/', createAlimento);
router.put('/:id_alimento', updateAlimento);
router.delete('/:id_alimento', deleteAlimento);

export default router;
