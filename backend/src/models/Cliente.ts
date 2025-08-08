import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './Usuario';

class Cliente extends Model {
  public id_cliente!: number;
  public idade?: number;
  public pesoAtual?: number;
  public altura?: number;
  public restricoes?: string;
  public objetivo?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cliente.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Usuario',
        key: 'id_usuario',
      },
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pesoAtual: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    restricoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    objetivo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Cliente',
    timestamps: true,
  }
);

// Relacionamento com Usuario
Cliente.belongsTo(Usuario, {
  foreignKey: 'id_cliente',
  as: 'usuario',
});

export default Cliente;
