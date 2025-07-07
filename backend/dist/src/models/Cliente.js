"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Usuario_1 = require("./Usuario");
class Cliente extends sequelize_1.Model {
}
exports.Cliente = Cliente;
Cliente.init({
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: { model: Usuario_1.Usuario, key: 'id_usuario' },
    },
    idade: { type: sequelize_1.DataTypes.INTEGER },
    pesoAtual: { type: sequelize_1.DataTypes.FLOAT },
    altura: { type: sequelize_1.DataTypes.FLOAT },
    restricoes: { type: sequelize_1.DataTypes.TEXT },
    objetivo: { type: sequelize_1.DataTypes.TEXT },
}, {
    sequelize: database_1.sequelize,
    tableName: 'clientes',
    timestamps: false,
});
