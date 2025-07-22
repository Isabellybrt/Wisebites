export class Alimento {
  id_alimento?: number;
  nome: string;
  calorias: number;

  constructor(nome: string, calorias: number, id_alimento?: number) {
    this.nome = nome;
    this.calorias = calorias;
    if (id_alimento) this.id_alimento = id_alimento;
  }
}
