import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Refeicao from './Refeicao';
import Alimento from './Alimento';

class RefeicaoAlimentos extends Model {
  public id_refeicao!: number;
  public id_alimento!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RefeicaoAlimentos.init(
  {
    id_refeicao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Refeicao',
        key: 'id_refeicao',
      },
    },
    id_alimento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Alimento',
        key: 'id_alimento',
      },
    },
  },
  {
    sequelize,
    tableName: 'RefeicaoAlimentos',
    timestamps: true,
  }
);

// Relacionamentos
RefeicaoAlimentos.belongsTo(Refeicao, {
  foreignKey: 'id_refeicao',
  as: 'refeicao',
});

RefeicaoAlimentos.belongsTo(Alimento, {
  foreignKey: 'id_alimento',
  as: 'alimento',
});

export default RefeicaoAlimentos;
