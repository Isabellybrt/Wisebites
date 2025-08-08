"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Cliente_1 = __importDefault(require("./Cliente"));
class PlanoNutricional extends sequelize_1.Model {
}
PlanoNutricional.init({
    id_planoNutricional: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'Cliente',
            key: 'id_cliente',
        },
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    descricao: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    dataCriacao: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    tableName: 'PlanoNutricional',
    timestamps: true,
});
PlanoNutricional.belongsTo(Cliente_1.default, {
    foreignKey: 'id_cliente',
    as: 'cliente',
});
exports.default = PlanoNutricional;
//# sourceMappingURL=PlanoNutricional.js.map