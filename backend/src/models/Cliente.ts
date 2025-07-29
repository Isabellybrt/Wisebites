import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Usuario } from './Usuario';

export class Cliente extends Model {}

Cliente.init({
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Usuario,
      key: 'id_usuario'
    }
  },
  idade: { type: DataTypes.INTEGER },
  peso_atual: { type: DataTypes.FLOAT },
  altura: { type: DataTypes.FLOAT },
  restricoes: { type: DataTypes.TEXT },
  objetivo: { type: DataTypes.TEXT },
}, {
  sequelize,
  tableName: 'cliente',
  timestamps: false,
});


Cliente.belongsTo(Usuario, { foreignKey: 'id_cliente', as: 'usuario' });
