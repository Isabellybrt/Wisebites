import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Cliente from './Cliente';

class CaloriaEstimativa extends Model {
  public id_caloriaEstimativa!: number;
  public id_cliente!: number;
  public imagem?: Buffer;
  public caloriasEstimadas?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CaloriaEstimativa.init(
  {
    id_caloriaEstimativa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cliente',
        key: 'id_cliente',
      },
    },
    imagem: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    caloriasEstimadas: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'CaloriaEstimativa',
    timestamps: true,
  }
);

// Relacionamento com Cliente
CaloriaEstimativa.belongsTo(Cliente, {
  foreignKey: 'id_cliente',
  as: 'cliente',
});

export default CaloriaEstimativa;
