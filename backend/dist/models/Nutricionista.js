"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nutricionista = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Usuario_1 = require("./Usuario");
class Nutricionista extends sequelize_1.Model {
}
exports.Nutricionista = Nutricionista;
Nutricionista.init({
    id_nutricionista: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: { model: Usuario_1.Usuario, key: 'id_usuario' },
    },
    especialidade: { type: sequelize_1.DataTypes.STRING(100) },
}, {
    sequelize: database_1.sequelize,
    tableName: 'nutricionista',
    timestamps: false,
});
