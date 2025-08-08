"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Refeicao_1 = __importDefault(require("./Refeicao"));
const Alimento_1 = __importDefault(require("./Alimento"));
class RefeicaoAlimentos extends sequelize_1.Model {
}
RefeicaoAlimentos.init({
    id_refeicao: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Refeicao',
            key: 'id_refeicao',
        },
    },
    id_alimento: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Alimento',
            key: 'id_alimento',
        },
    },
}, {
    sequelize: database_1.default,
    tableName: 'RefeicaoAlimentos',
    timestamps: true,
});
RefeicaoAlimentos.belongsTo(Refeicao_1.default, {
    foreignKey: 'id_refeicao',
    as: 'refeicao',
});
RefeicaoAlimentos.belongsTo(Alimento_1.default, {
    foreignKey: 'id_alimento',
    as: 'alimento',
});
exports.default = RefeicaoAlimentos;
//# sourceMappingURL=RefeicaoAlimentos.js.map