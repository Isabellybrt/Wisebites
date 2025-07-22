export class PlanoNutricional {
  id_planoNutricional?: number;
  id_cliente: number;
  dataCriacao: Date;

  constructor(id_cliente: number, dataCriacao: Date, id_planoNutricional?: number) {
    this.id_cliente = id_cliente;
    this.dataCriacao = dataCriacao;
    if (id_planoNutricional) this.id_planoNutricional = id_planoNutricional;
  }
}
