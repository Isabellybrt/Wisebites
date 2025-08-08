"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Usuario_1 = __importDefault(require("./Usuario"));
class Cliente extends sequelize_1.Model {
}
Cliente.init({
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Usuario',
            key: 'id_usuario',
        },
    },
    idade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    pesoAtual: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    altura: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    restricoes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    objetivo: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    tableName: 'Cliente',
    timestamps: true,
});
Cliente.belongsTo(Usuario_1.default, {
    foreignKey: 'id_cliente',
    as: 'usuario',
});
exports.default = Cliente;
//# sourceMappingURL=Cliente.js.map