import Usuario from './Usuario';
import Nutricionista from './Nutricionista';
import Cliente from './Cliente';
import HistoricoAlimentar from './HistoricoAlimentar';
import AlimentoExtra from './AlimentoExtra';
import PesoRegistro from './PesoRegistro';
import PlanoNutricional from './PlanoNutricional';
import Refeicao from './Refeicao';
import Alimento from './Alimento';
import RefeicaoAlimentos from './RefeicaoAlimentos';
import Atendimento from './Atendimento';
import CaloriaEstimativa from './CaloriaEstimativa';
import RegistroRefeicao from './RegistroRefeicao';

// Relacionamentos Usuario -> Nutricionista/Cliente
Usuario.hasOne(Nutricionista, {
  foreignKey: 'id_nutricionista',
  as: 'nutricionista',
});

Usuario.hasOne(Cliente, {
  foreignKey: 'id_cliente',
  as: 'cliente',
});

// Relacionamentos Cliente
Cliente.hasOne(HistoricoAlimentar, {
  foreignKey: 'id_cliente',
  as: 'historicoAlimentar',
});

Cliente.hasMany(PesoRegistro, {
  foreignKey: 'id_cliente',
  as: 'pesosRegistro',
});

Cliente.hasOne(PlanoNutricional, {
  foreignKey: 'id_cliente',
  as: 'planoNutricional',
});

Cliente.hasMany(Atendimento, {
  foreignKey: 'id_cliente',
  as: 'atendimentos',
});

Cliente.hasMany(CaloriaEstimativa, {
  foreignKey: 'id_cliente',
  as: 'caloriasEstimativas',
});

Cliente.hasMany(RegistroRefeicao, {
  foreignKey: 'id_cliente',
  as: 'registrosRefeicao',
});

// Relacionamentos Atendimento já estão definidos no modelo Atendimento.ts

// Relacionamentos HistoricoAlimentar
HistoricoAlimentar.hasMany(AlimentoExtra, {
  foreignKey: 'id_historicoAlimentar',
  as: 'alimentosExtras',
});

// Relacionamentos PlanoNutricional
PlanoNutricional.hasMany(Refeicao, {
  foreignKey: 'id_planoNutricional',
  as: 'refeicoes',
});

// Relacionamentos Refeicao
Refeicao.belongsToMany(Alimento, {
  through: RefeicaoAlimentos,
  foreignKey: 'id_refeicao',
  otherKey: 'id_alimento',
  as: 'alimentos',
});

Alimento.belongsToMany(Refeicao, {
  through: RefeicaoAlimentos,
  foreignKey: 'id_alimento',
  otherKey: 'id_refeicao',
  as: 'refeicoes',
});

// Relacionamentos Nutricionista
Nutricionista.hasMany(Atendimento, {
  foreignKey: 'id_nutricionista',
  as: 'atendimentos',
});

export {
  Usuario,
  Nutricionista,
  Cliente,
  HistoricoAlimentar,
  AlimentoExtra,
  PesoRegistro,
  PlanoNutricional,
  Refeicao,
  Alimento,
  RefeicaoAlimentos,
  Atendimento,
  CaloriaEstimativa,
  RegistroRefeicao,
};
