import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Usuario extends Model {
  public id_usuario!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public tipo_usuario!: string;
  public telefone?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Usuario.init(
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tipo_usuario: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Usuario',
    timestamps: true,
  }
);

export default Usuario;
