import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

// Importar configurações
import sequelize from './config/database';

// Importar modelos para sincronizar
import './models';

// Importar rotas
import authRoutes from './routes/auth';
import clienteRoutes from './routes/cliente';
import nutricionistaRoutes from './routes/nutricionista';
import alimentosRoutes from './routes/alimentos';

// Configurar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
}));

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/nutricionista', nutricionistaRoutes);
app.use('/api/alimentos', alimentosRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Middleware de tratamento de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.error('Erro não tratado:', err);
  
  if (err.name === 'SequelizeValidationError') {
    res.status(400).json({
      message: 'Erro de validação',
      errors: err.errors.map((e: any) => ({
        field: e.path,
        message: e.message,
      })),
    });
    return;
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      message: 'Dados duplicados',
      errors: err.errors.map((e: any) => ({
        field: e.path,
        message: e.message,
      })),
    });
    return;
  }

  res.status(500).json({
    message: 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
});

// Rota para endpoints não encontrados
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

// Função para inicializar o servidor
const startServer = async () => {
  try {
    // Sincronizar banco de dados
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincronizar modelos (criar tabelas se não existirem)
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados com o banco de dados.');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar o servidor:', error);
    process.exit(1);
  }
};

// Tratamento de sinais para graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Recebido SIGINT. Encerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Recebido SIGTERM. Encerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

// Iniciar servidor
startServer();
