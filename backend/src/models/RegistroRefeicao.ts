import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Cliente from './Cliente';

class RegistroRefeicao extends Model {
  public id_registroRefeicao!: number;
  public id_cliente!: number;
  public data!: Date;
  public tipoRefeicao!: string; // 'cafe_manha', 'lanche_manha', 'almoco', 'lanche_tarde', 'jantar', 'ceia'
  public descricao!: string;
  public horario!: string;
  public observacoes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RegistroRefeicao.init(
  {
    id_registroRefeicao: {
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
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tipoRefeicao: {
      type: DataTypes.ENUM('cafe_manha', 'lanche_manha', 'almoco', 'lanche_tarde', 'jantar', 'ceia'),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    horario: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'RegistroRefeicao',
    timestamps: true,
  }
);

// Relacionamento com Cliente
RegistroRefeicao.belongsTo(Cliente, {
  foreignKey: 'id_cliente',
  as: 'cliente',
});

export default RegistroRefeicao;
