"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const PlanoNutricional_1 = __importDefault(require("./PlanoNutricional"));
class Refeicao extends sequelize_1.Model {
}
Refeicao.init({
    id_refeicao: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    horario: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: true,
    },
    descricao: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    porcoes: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    id_planoNutricional: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PlanoNutricional',
            key: 'id_planoNutricional',
        },
    },
}, {
    sequelize: database_1.default,
    tableName: 'Refeicao',
    timestamps: true,
});
Refeicao.belongsTo(PlanoNutricional_1.default, {
    foreignKey: 'id_planoNutricional',
    as: 'planoNutricional',
});
exports.default = Refeicao;
//# sourceMappingURL=Refeicao.js.map