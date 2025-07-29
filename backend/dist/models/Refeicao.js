"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Refeicao = void 0;
class Refeicao {
    constructor(horario, descricao, porcoes, id_planoNutricional, id_refeicao) {
        this.horario = horario;
        this.descricao = descricao;
        this.porcoes = porcoes;
        this.id_planoNutricional = id_planoNutricional;
        if (id_refeicao)
            this.id_refeicao = id_refeicao;
    }
}
exports.Refeicao = Refeicao;
