import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Usuario } from './Usuario';

export class Nutricionista extends Model {}

Nutricionista.init({
  id_nutricionista: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Usuario, key: 'id_usuario' },
  },
  especialidade: { type: DataTypes.STRING(100) },
}, {
  sequelize,
  tableName: 'nutricionista',
  timestamps: false,
});
