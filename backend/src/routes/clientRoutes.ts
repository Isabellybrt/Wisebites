import express from 'express';
import { buscarClientes } from '../controllers/clientController';

const router = express.Router();
router.get('/buscar-clientes', buscarClientes);
export default router;
