import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Cliente from './Cliente';
import Nutricionista from './Nutricionista';

class Atendimento extends Model {
  public id_atendimento!: number;
  public id_cliente!: number;
  public id_nutricionista!: number;
  public motivo?: string;
  public horarioPreferencial?: string;
  public observacoes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Atendimento.init(
  {
    id_atendimento: {
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
    id_nutricionista: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Nutricionista',
        key: 'id_nutricionista',
      },
    },
    motivo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    horarioPreferencial: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Atendimento',
    timestamps: true,
  }
);

// Relacionamentos
Atendimento.belongsTo(Cliente, {
  foreignKey: 'id_cliente',
  as: 'cliente',
});

Atendimento.belongsTo(Nutricionista, {
  foreignKey: 'id_nutricionista',
  as: 'nutricionista',
});

export default Atendimento;
