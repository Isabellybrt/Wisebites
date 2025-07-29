import express, { Request, Response } from 'express';
import { criarPlanoNutricional } from '../controllers/planController';

const router = express.Router();

router.post('/plano-nutricional', (req: Request, res: Response) => {
  criarPlanoNutricional(req, res);
});

export default router;
