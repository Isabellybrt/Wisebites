import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ message: 'Token de acesso necessário' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as any;
    (req as AuthRequest).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

export const requireCliente = (req: Request, res: Response, next: NextFunction): void => {
  const authReq = req as AuthRequest;
  if (authReq.user?.tipo_usuario !== 'cliente' && authReq.user?.tipo_usuario !== 'paciente') {
    res.status(403).json({ message: 'Acesso negado. Apenas clientes podem acessar este recurso.' });
    return;
  }
  next();
};

export const requireNutricionista = (req: Request, res: Response, next: NextFunction): void => {
  const authReq = req as AuthRequest;
  if (authReq.user?.tipo_usuario !== 'nutricionista') {
    res.status(403).json({ message: 'Acesso negado. Apenas nutricionistas podem acessar este recurso.' });
    return;
  }
  next();
};
