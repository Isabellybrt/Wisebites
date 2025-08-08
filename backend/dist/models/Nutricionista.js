"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Usuario_1 = __importDefault(require("./Usuario"));
class Nutricionista extends sequelize_1.Model {
}
Nutricionista.init({
    id_nutricionista: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Usuario',
            key: 'id_usuario',
        },
    },
    especialidade: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    tableName: 'Nutricionista',
    timestamps: true,
});
Nutricionista.belongsTo(Usuario_1.default, {
    foreignKey: 'id_nutricionista',
    as: 'usuario',
});
exports.default = Nutricionista;
//# sourceMappingURL=Nutricionista.js.map