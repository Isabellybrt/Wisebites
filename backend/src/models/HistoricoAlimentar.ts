import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Cliente from './Cliente';

class HistoricoAlimentar extends Model {
  public id_historicoAlimentar!: number;
  public id_cliente!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

HistoricoAlimentar.init(
  {
    id_historicoAlimentar: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Cliente',
        key: 'id_cliente',
      },
    },
  },
  {
    sequelize,
    tableName: 'HistoricoAlimentar',
    timestamps: true,
  }
);

// Relacionamento com Cliente
HistoricoAlimentar.belongsTo(Cliente, {
  foreignKey: 'id_cliente',
  as: 'cliente',
});

export default HistoricoAlimentar;
