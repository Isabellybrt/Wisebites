"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanoNutricionalModel = void 0;
// src/models/PlanoNutricionalModel.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
// 3. Classe do Model com tipos definidos
class PlanoNutricionalModel extends sequelize_1.Model {
}
exports.PlanoNutricionalModel = PlanoNutricionalModel;
// 4. Inicialização do Model
PlanoNutricionalModel.init({
    id_planoNutricional: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    dataCriacao: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'plano_nutricional',
    timestamps: false,
});
