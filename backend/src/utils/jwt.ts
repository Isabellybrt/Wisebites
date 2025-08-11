import jwt from 'jsonwebtoken';

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
};
