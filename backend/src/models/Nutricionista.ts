import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './Usuario';

class Nutricionista extends Model {
  public id_nutricionista!: number;
  public especialidade?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Nutricionista.init(
  {
    id_nutricionista: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Usuario',
        key: 'id_usuario',
      },
    },
    especialidade: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Nutricionista',
    timestamps: true,
  }
);

// Relacionamento com Usuario
Nutricionista.belongsTo(Usuario, {
  foreignKey: 'id_nutricionista',
  as: 'usuario',
});

export default Nutricionista;
