"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alimento = void 0;
class Alimento {
    constructor(nome, calorias, id_alimento) {
        this.nome = nome;
        this.calorias = calorias;
        if (id_alimento)
            this.id_alimento = id_alimento;
    }
}
exports.Alimento = Alimento;
