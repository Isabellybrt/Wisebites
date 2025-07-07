import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Usuario extends Model {
  declare id_usuario: number;
  declare nome: string;
  declare email: string;
  declare senha: string;
  declare tipo_usuario: string;
  declare telefone?: string;
}

Usuario.init({
  id_usuario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  senha: { type: DataTypes.STRING(100), allowNull: false },
  tipo_usuario: { type: DataTypes.STRING(20), allowNull: false },
  telefone: { type: DataTypes.STRING(15), allowNull: true },
}, {
  sequelize,
  tableName: 'usuario',
  timestamps: false,
});
