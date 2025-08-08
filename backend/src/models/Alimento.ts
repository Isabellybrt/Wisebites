import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Alimento extends Model {
  public id_alimento!: number;
  public nome!: string;
  public calorias?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Alimento.init(
  {
    id_alimento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    calorias: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Alimento',
    timestamps: true,
  }
);

export default Alimento;
