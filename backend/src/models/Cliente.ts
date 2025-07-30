import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Usuario } from './Usuario';
import { Nutricionista } from './Nutricionista';

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
  id_nutricionista: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'nutricionista',
    key: 'id_nutricionista',
  }
}
}, {
  sequelize,
  tableName: 'cliente',
  timestamps: false,
});


Cliente.belongsTo(Usuario, { foreignKey: 'id_cliente', as: 'usuario' });
Cliente.belongsTo(Nutricionista, { foreignKey: 'id_nutricionista', as: 'nutricionista' });
Nutricionista.hasMany(Cliente, { foreignKey: 'id_nutricionista', as: 'clientes' });
