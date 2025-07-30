import React from 'react';
import Sidebar from '../components/Sidebar_Client';
import '../styles/Nutritional_Plan_Client.css';

const Nutritional_Plan_Client: React.FC = () => {
  const plano = {
    paciente: "João da Silva",
    data: "29/07/2025",
    refeicoes: [
      {
        tipo: "Café da Manhã",
        opcoes: [
          {
            horario: "07:30",
            descricao: "Pão com ovo, Frutas",
            porcoes: "1 fatia, 2 frutas"
          }
        ]
      },
      {
        tipo: "Almoço",
        opcoes: [
          {
            horario: "12:00",
            descricao: "Arroz, Feijão, Salada, Frango grelhado",
            porcoes: "3 colheres, 1 concha, 1 prato, 1 filé"
          }
        ]
      },
      {
        tipo: "Lanche da Tarde",
        opcoes: [
          {
            horario: "16:00",
            descricao: "Iogurte natural, Castanhas",
            porcoes: "1 pote, 10 unidades"
          }
        ]
      },
      {
        tipo: "Jantar",
        opcoes: [
          {
            horario: "19:30",
            descricao: "Sopa de legumes, Pão integral",
            porcoes: "1 prato, 2 fatias"
          }
        ]
      },
      {
        tipo: "Ceia",
        opcoes: [
          {
            horario: "21:30",
            descricao: "Chá de camomila, Biscoito integral",
            porcoes: "1 xícara, 3 unidades"
          }
        ]
      }
    ]
  };

  return (
    <div className="plano-paciente-container">
      <Sidebar />
      <main className="plano-paciente-content">
        <h1>Plano Nutricional</h1>
        <p><strong>Paciente:</strong> {plano.paciente}</p>
        <p><strong>Data de Criação:</strong> {plano.data}</p>

        {plano.refeicoes.map((refeicao, i) => (
          <div key={i} className="refeicao-bloco">
            <h2>
              {refeicao.tipo}
              <span className="material-symbols-outlined" style={{ verticalAlign: "middle", marginLeft: "6px", fontSize: "1.5rem" }}>
                restaurant_menu
              </span>
            </h2>
            {refeicao.opcoes.map((opcao, j) => {
              const itens = opcao.descricao.split(',').map(item => item.trim());
              const porcoes = opcao.porcoes.split(',').map(p => p.trim());
              const qtd = Math.min(itens.length, porcoes.length);

              return (
                <div key={j} className="opcao-card">
                  <h4>Opção {j + 1}</h4>
                  <p><strong>Horário:</strong> {opcao.horario}</p>

                  <p className="tag-label"><strong>Itens – Porções:</strong></p>
                  <div className="descricao-porcoes-tabela">
                    {Array.from({ length: qtd }).map((_, idx) => (
                      <span key={idx} className="tag">
                        {itens[idx]} – {porcoes[idx]}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Nutritional_Plan_Client;
