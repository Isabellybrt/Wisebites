import React from 'react';
import Sidebar from '../components/Sidebar_Nutritionist';
import '../styles/Home_Nutritionist.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <h1>Dashboard do Nutricionista</h1>

        <section className="stats">
          <div className="card">
            <h4>Total de Pacientes</h4>
            <p>25</p>
          </div>
          <div className="card">
            <h4>Pacientes ativos</h4>
            <p>18</p>
          </div>
          <div className="card">
            <h4>Consultas hoje</h4>
            <p>3</p>
          </div>
          <div className="card">
            <h4>Planos ativos</h4>
            <p>20</p>
          </div>
        </section>

        <section className="panels">
          <div className="panel">
            <h3>Próximas Consultas</h3>
            <ul>
                <li>
                    <span><span className="material-symbols-outlined">account_circle</span> Maria Isabelly</span><br />
                    <small>09/05/2023 às 10:00</small>
                </li>
                <li>
                    <span><span className="material-symbols-outlined">account_circle</span> Maria Isabelly</span><br />
                    <small>09/05/2023 às 10:00</small>
                </li>
                <li>
                    <span><span className="material-symbols-outlined">account_circle</span> Maria Isabelly</span><br />
                    <small>09/05/2023 às 10:00</small>
                </li>
                </ul>
          </div>

          <div className="panel">
            <h3>Pacientes Recentes</h3>
            <ul>
                <li>
                    <span><span className="material-symbols-outlined">account_circle</span> Maria Isabelly</span><br />
                    <small>Emagrecimento</small>
                </li>
                <li>
                    <span><span className="material-symbols-outlined">account_circle</span> Maria Isabelly</span><br />
                    <small>Hipertrofia</small>
                </li>
                <li>
                    <span><span className="material-symbols-outlined">account_circle</span> Maria Isabelly</span><br />
                    <small>Reeducação Alimentar</small>
                </li>
                </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
