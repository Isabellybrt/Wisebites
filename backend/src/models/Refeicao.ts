import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import PlanoNutricional from './PlanoNutricional';

class Refeicao extends Model {
  public id_refeicao!: number;
  public horario?: string;
  public descricao?: string;
  public porcoes?: string;
  public id_planoNutricional!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Refeicao.init(
  {
    id_refeicao: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    horario: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    porcoes: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    id_planoNutricional: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PlanoNutricional',
        key: 'id_planoNutricional',
      },
    },
  },
  {
    sequelize,
    tableName: 'Refeicao',
    timestamps: true,
  }
);

// Relacionamento com PlanoNutricional
Refeicao.belongsTo(PlanoNutricional, {
  foreignKey: 'id_planoNutricional',
  as: 'planoNutricional',
});

export default Refeicao;
