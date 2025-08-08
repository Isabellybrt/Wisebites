import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import HistoricoAlimentar from './HistoricoAlimentar';

class AlimentoExtra extends Model {
  public id_alimentoExtra!: number;
  public id_historicoAlimentar!: number;
  public descricao?: string;
  public horario?: Date;
  public quantidade?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AlimentoExtra.init(
  {
    id_alimentoExtra: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_historicoAlimentar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HistoricoAlimentar',
        key: 'id_historicoAlimentar',
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    horario: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    quantidade: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'AlimentoExtra',
    timestamps: true,
  }
);

// Relacionamento com HistoricoAlimentar
AlimentoExtra.belongsTo(HistoricoAlimentar, {
  foreignKey: 'id_historicoAlimentar',
  as: 'historicoAlimentar',
});

export default AlimentoExtra;
