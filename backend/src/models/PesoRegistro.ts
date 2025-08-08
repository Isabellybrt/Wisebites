import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Cliente from './Cliente';

class PesoRegistro extends Model {
  public id_pesoRegistro!: number;
  public id_cliente!: number;
  public dataHora?: Date;
  public peso!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PesoRegistro.init(
  {
    id_pesoRegistro: {
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
    dataHora: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'PesoRegistro',
    timestamps: true,
  }
);

// Relacionamento com Cliente
PesoRegistro.belongsTo(Cliente, {
  foreignKey: 'id_cliente',
  as: 'cliente',
});

export default PesoRegistro;
