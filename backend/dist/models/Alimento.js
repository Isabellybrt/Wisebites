"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Alimento extends sequelize_1.Model {
}
Alimento.init({
    id_alimento: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false,
    },
    calorias: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    tableName: 'Alimento',
    timestamps: true,
});
exports.default = Alimento;
//# sourceMappingURL=Alimento.js.map