import React, { useState, useEffect } from 'react';
import '../styles/Plan_Registration.css';
import Sidebar from '../components/Sidebar_Nutritionist';

interface OpcaoRefeicao {
  horario: string;
  descricao: string;
  porcoes: string;
}

interface Usuario {
  nome: string;
}

interface Cliente {
  id_cliente: number;
  usuario: Usuario;
}

type TipoRefeicao = 'cafeDaManha' | 'almoco' | 'lancheTarde' | 'jantar' | 'ceia';

const Plan_Registration: React.FC = () => {
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const [clienteNomeBusca, setClienteNomeBusca] = useState('');
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);

  const [plano, setPlano] = useState({
    dataCriacao: new Date().toISOString().split('T')[0],
    refeicoes: {
      cafeDaManha: [{ horario: '', descricao: '', porcoes: '' }],
      almoco: [{ horario: '', descricao: '', porcoes: '' }],
      lancheTarde: [{ horario: '', descricao: '', porcoes: '' }],
      jantar: [{ horario: '', descricao: '', porcoes: '' }],
      ceia: [{ horario: '', descricao: '', porcoes: '' }],
    } as Record<TipoRefeicao, OpcaoRefeicao[]>,
  });

  useEffect(() => {
    const buscarClientes = async () => {
      if (clienteNomeBusca.length < 2) {
        setClientesFiltrados([]);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/buscar-clientes?nome=${clienteNomeBusca}`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setClientesFiltrados(data);
        } else {
          setClientesFiltrados([]);
        }
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        setClientesFiltrados([]);
      }
    };

    buscarClientes();
  }, [clienteNomeBusca]);

  const selecionarCliente = (cliente: Cliente) => {
    setClienteNomeBusca(cliente.usuario.nome);
    setIdSelecionado(cliente.id_cliente);
    setClientesFiltrados([]);
  };

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
    if (novasOpcoes.length === 1) return;
    novasOpcoes.splice(index, 1);
    setPlano({
      ...plano,
      refeicoes: {
        ...plano.refeicoes,
        [tipo]: novasOpcoes,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (idSelecionado === null || isNaN(Number(idSelecionado))) {
      alert('Selecione um paciente válido.');
      return;
    }

    const payload = {
      id_cliente: Number(idSelecionado),
      dataCriacao: plano.dataCriacao,
      refeicoes: plano.refeicoes,
    };

    try {
      const response = await fetch('http://localhost:5000/api/plano-nutricional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Plano salvo com sucesso!');
        // Opcional: limpar formulário ou resetar estado aqui
      } else {
        alert('Erro ao salvar plano.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    }
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
            value={clienteNomeBusca}
            onChange={(e) => {
              setClienteNomeBusca(e.target.value);
              setIdSelecionado(null);
            }}
            placeholder="Digite o nome do paciente"
            required
            autoComplete="off"
          />
          {Array.isArray(clientesFiltrados) && clientesFiltrados.length > 0 && (
            <ul className="sugestoes">
              {clientesFiltrados.map((cliente) => (
                <li key={cliente.id_cliente} onClick={() => selecionarCliente(cliente)}>
                  {cliente.usuario.nome}
                </li>
              ))}
            </ul>
          )}
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
                      onChange={(e) => handleChange(refeicao, index, 'horario', e.target.value)}
                    />
                  </label>
                  <label>
                    Descrição:
                    <input
                      type="text"
                      placeholder="Ex: Pão com ovo e frutas"
                      value={opcao.descricao}
                      onChange={(e) => handleChange(refeicao, index, 'descricao', e.target.value)}
                    />
                  </label>
                  <label>
                    Porções:
                    <input
                      type="text"
                      placeholder="Ex: 1 fatia, 2 colheres"
                      value={opcao.porcoes}
                      onChange={(e) => handleChange(refeicao, index, 'porcoes', e.target.value)}
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
  