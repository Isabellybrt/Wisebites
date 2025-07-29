import dotenv from 'dotenv';
import express from 'express';
import { sequelize } from './config/database';
import userRoutes from './routes/userRoutes';
import planRoutes from './routes/planRoutes';
import clientRoutes from './routes/clientRoutes'
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', planRoutes); 
app.use('/api', clientRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
