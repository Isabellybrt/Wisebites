import React, { useState } from 'react';
import '../styles/Plan_Registration.css';
import Sidebar from '../components/Sidebar_Nutritionist';

interface OpcaoRefeicao {
  horario: string;
  descricao: string;
  porcoes: string;
}

type TipoRefeicao = 'cafeDaManha' | 'almoco' | 'lancheTarde' | 'jantar' | 'ceia';

const Plan_Registration: React.FC = () => {
   const [plano, setPlano] = useState({
    cliente: '',
    dataCriacao: new Date().toISOString().split('T')[0],
    refeicoes: {
      cafeDaManha: [{ horario: '', descricao: '', porcoes: '' }],
      almoco: [{ horario: '', descricao: '', porcoes: '' }],
      lancheTarde: [{ horario: '', descricao: '', porcoes: '' }],
      jantar: [{ horario: '', descricao: '', porcoes: '' }],
      ceia: [{ horario: '', descricao: '', porcoes: '' }],
    } as Record<TipoRefeicao, OpcaoRefeicao[]>,
  });

  const handleChange = (
    tipo: TipoRefeicao,
    index: number,
    campo: keyof OpcaoRefeicao,
    valor: string
  ) => {
    const novasOpcoes = [...plano.refeicoes[tipo]];
    novasOpcoes[index][campo] = valor;
    setPlano({
      ...plano,
      refeicoes: {
        ...plano.refeicoes,
        [tipo]: novasOpcoes,
      },
    });
  };

  const adicionarOpcao = (tipo: TipoRefeicao) => {
    setPlano({
      ...plano,
      refeicoes: {
        ...plano.refeicoes,
        [tipo]: [...plano.refeicoes[tipo], { horario: '', descricao: '', porcoes: '' }],
      },
    });
  };

  const removerOpcao = (tipo: TipoRefeicao, index: number) => {
    const novasOpcoes = [...plano.refeicoes[tipo]];
    if (novasOpcoes.length === 1) return; // Evita remover a última
    novasOpcoes.splice(index, 1);
    setPlano({
      ...plano,
      refeicoes: {
        ...plano.refeicoes,
        [tipo]: novasOpcoes,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Plano preenchido:', plano);
    alert('Plano preenchido no console!');
  };

  const labels: Record<TipoRefeicao, string> = {
    cafeDaManha: '☕ Café da Manhã',
    almoco: '🍽️ Almoço',
    lancheTarde: '🍎 Lanche da Tarde',
    jantar: '🌙 Jantar',
    ceia: '🥣 Ceia',
  };

  return (
    <div className="cadastro-container">
      <Sidebar />
      <h2>Cadastro de Plano Nutricional</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Paciente:
          <input
            type="text"
            value={plano.cliente}
            onChange={(e) => setPlano({ ...plano, cliente: e.target.value })}
            placeholder="Nome do paciente"
            required
          />
        </label>

        <label>
          Data de Criação:
          <input type="date" value={plano.dataCriacao} disabled />
        </label>

        {Object.keys(plano.refeicoes).map((tipo) => {
          const refeicao = tipo as TipoRefeicao;
          return (
            <div key={refeicao}>
              <h3>{labels[refeicao]}</h3>
              {plano.refeicoes[refeicao].map((opcao, index) => (
                <div key={index} className="refeicao-card">
                  <div className="refeicao-header">
                    <span>Opção {index + 1}</span>
                    {plano.refeicoes[refeicao].length > 1 && (
                      <button
                        type="button"
                        className="remover"
                        onClick={() => removerOpcao(refeicao, index)}
                      >
                        ❌ Remover
                      </button>
                    )}
                  </div>
                  <label>
                    Horário:
                    <input
                      type="time"
                      value={opcao.horario}
                      onChange={(e) =>
                        handleChange(refeicao, index, 'horario', e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Descrição:
                    <input
                      type="text"
                      placeholder="Ex: Pão com ovo e frutas"
                      value={opcao.descricao}
                      onChange={(e) =>
                        handleChange(refeicao, index, 'descricao', e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Porções:
                    <input
                      type="text"
                      placeholder="Ex: 1 fatia, 2 colheres"
                      value={opcao.porcoes}
                      onChange={(e) =>
                        handleChange(refeicao, index, 'porcoes', e.target.value)
                      }
                    />
                  </label>
                </div>
              ))}
              <button
                type="button"
                className="adicionar"
                onClick={() => adicionarOpcao(refeicao)}
              >
                + Adicionar opção
              </button>
            </div>
          );
        })}

        <button type="submit" className="salvar">
          Salvar Plano
        </button>
      </form>
    </div>
  );
};

export default Plan_Registration;
