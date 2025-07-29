// src/models/PlanoNutricionalModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// 1. Definição dos atributos
interface PlanoNutricionalAttributes {
  id_planoNutricional: number;
  id_cliente: number;
  dataCriacao: Date;
}

// 2. Definição dos atributos opcionais (para criação)
interface PlanoNutricionalCreationAttributes extends Optional<PlanoNutricionalAttributes, 'id_planoNutricional'> {}

// 3. Classe do Model com tipos definidos
export class PlanoNutricionalModel
  extends Model<PlanoNutricionalAttributes, PlanoNutricionalCreationAttributes>
  implements PlanoNutricionalAttributes {
  public id_planoNutricional!: number;
  public id_cliente!: number;
  public dataCriacao!: Date;
}

// 4. Inicialização do Model
PlanoNutricionalModel.init(
  {
    id_planoNutricional: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dataCriacao: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },  
  {
    sequelize,
    tableName: 'plano_nutricional',
    timestamps: false,
  }
);
