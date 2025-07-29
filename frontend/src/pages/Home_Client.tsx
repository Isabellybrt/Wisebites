import React from 'react';
import '../styles/Home_Client.css';
import Sidebar from '../components/Sidebar_Client';
import SummaryCard from '../components/SummaryCard_Client';

const Home_Client: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h2>Olá, Isabelly!</h2>
            <p>Seu resumo nutricional de hoje</p>
          </div>
          <button className="register-button">+ Registrar Refeição</button>
        </header>

        <section className="progress-section">
          <h3>Progresso do dia</h3>
          <p>Seu desempenho de hoje no plano alimentar</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '75%' }}></div>
          </div>
          <div className="summary-grid">
            <SummaryCard icon="check_box" label="Alimentos adequados" value="25" />
            <SummaryCard icon="cancel" label="Alimentos inadequados" value="3" />
            <SummaryCard icon="check_circle" label="Refeições planejadas" value="4" />
            <SummaryCard icon="fact_check" label="Refeições registradas" value="1" />
        </div>
        </section>

        <section className="meal-section">
          <div className="meal-card">
            <h4>Próxima Refeição</h4>
            <p> 12:00 - 13:00</p>
            <ul>
              <li>Arroz integral (100g)</li>
              <li>Feijão (50g)</li>
              <li>Frango grelhado (100g)</li>
              <li>Salada verde (à vontade)</li>
            </ul>
          </div>
          <div className="meal-card">
            <h4>Próximas Refeições</h4>
            <ul>
              <li> Lanche da tarde — 15:00 - 15:30</li>
              <li> Jantar — 19:00 - 20:00</li>
              <li> Café da manhã — 07:00 - 08:00</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home_Client;