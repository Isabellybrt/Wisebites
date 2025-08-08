"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Usuario extends sequelize_1.Model {
}
Usuario.init({
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    senha: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    tipo_usuario: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    telefone: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    tableName: 'Usuario',
    timestamps: true,
});
exports.default = Usuario;
//# sourceMappingURL=Usuario.js.map