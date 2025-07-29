"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanoNutricional = void 0;
class PlanoNutricional {
    constructor(id_cliente, dataCriacao, id_planoNutricional) {
        this.id_cliente = id_cliente;
        this.dataCriacao = dataCriacao;
        if (id_planoNutricional)
            this.id_planoNutricional = id_planoNutricional;
    }
}
exports.PlanoNutricional = PlanoNutricional;
