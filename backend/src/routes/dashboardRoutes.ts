import express from 'express';
import { getDashboardData } from '../controllers/dashboardController';

const router = express.Router();

router.get('/dashboard-nutricionista', getDashboardData);

export default router;
