import { Request } from 'express';

export interface User {
  id_usuario?: number;
  nome: string;
  email: string;
  senha: string;
  tipo_usuario: 'cliente' | 'nutricionista';
  telefone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  cliente?: Cliente;
  nutricionista?: Nutricionista;
}

export interface Nutricionista {
  id_nutricionista: number;
  especialidade?: string;
  user?: User;
}

export interface Cliente {
  id_cliente: number;
  idade?: number;
  pesoAtual?: number;
  altura?: number;
  restricoes?: string;
  objetivo?: string;
  user?: User;
}

export interface HistoricoAlimentar {
  id_historicoAlimentar?: number;
  id_cliente: number;
  cliente?: Cliente;
  alimentosExtras?: AlimentoExtra[];
}

export interface AlimentoExtra {
  id_alimentoExtra?: number;
  id_historicoAlimentar: number;
  descricao?: string;
  horario?: Date;
  quantidade?: string;
}

export interface PesoRegistro {
  id_pesoRegistro?: number;
  id_cliente: number;
  dataHora?: Date;
  peso: number;
  cliente?: Cliente;
}

export interface PlanoNutricional {
  id_planoNutricional?: number;
  id_cliente: number;
  dataCriacao?: Date;
  cliente?: Cliente;
  refeicoes?: Refeicao[];
}

export interface Refeicao {
  id_refeicao?: number;
  horario?: string;
  descricao?: string;
  porcoes?: string;
  id_planoNutricional: number;
  alimentos?: Alimento[];
}

export interface Alimento {
  id_alimento?: number;
  nome: string;
  calorias?: number;
}

export interface RefeicaoAlimentos {
  id_refeicao: number;
  id_alimento: number;
}

export interface Atendimento {
  id_atendimento?: number;
  id_cliente: number;
  id_nutricionista: number;
  motivo?: string;
  horarioPreferencial?: string;
  observacoes?: string;
  cliente?: Cliente;
  nutricionista?: Nutricionista;
}

export interface CaloriaEstimativa {
  id_caloriaEstimativa?: number;
  id_cliente: number;
  imagem?: Buffer;
  caloriasEstimadas?: number;
  cliente?: Cliente;
}

export interface AuthRequest extends Request {
  user?: {
    id_usuario: number;
    email: string;
    tipo_usuario: string;
  };
  file?: Express.Multer.File;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  tipo_usuario: 'cliente' | 'nutricionista';
  telefone?: string;
  // Campos específicos do cliente
  idade?: number;
  pesoAtual?: number;
  altura?: number;
  restricoes?: string;
  objetivo?: string;
  // Campos específicos do nutricionista
  especialidade?: string;
}
