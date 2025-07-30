"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefeicaoModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class RefeicaoModel extends sequelize_1.Model {
}
exports.RefeicaoModel = RefeicaoModel;
RefeicaoModel.init({
    id_refeicao: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    horario: sequelize_1.DataTypes.STRING,
    descricao: sequelize_1.DataTypes.STRING,
    porcoes: sequelize_1.DataTypes.STRING,
    id_planoNutricional: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'refeicao',
    timestamps: false,
});
