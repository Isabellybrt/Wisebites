export class Refeicao {
  id_refeicao?: number;
  horario: string;
  descricao: string;
  porcoes: string;
  id_planoNutricional: number;

  constructor(
    horario: string,
    descricao: string,
    porcoes: string,
    id_planoNutricional: number,
    id_refeicao?: number
  ) {
    this.horario = horario;
    this.descricao = descricao;
    this.porcoes = porcoes;
    this.id_planoNutricional = id_planoNutricional;
    if (id_refeicao) this.id_refeicao = id_refeicao;
  }
}
