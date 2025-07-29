import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class RefeicaoModel extends Model {}

RefeicaoModel.init({
  id_refeicao: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  horario: DataTypes.STRING,
  descricao: DataTypes.STRING,
  porcoes: DataTypes.STRING,
  id_planoNutricional: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'refeicao',
  timestamps: false,
});
