import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar_Nutritionist';
import '../styles/Home_Nutritionist.css';
import axios from 'axios';

interface Paciente {
  usuario: { nome: string };
  objetivo: string;
}

interface DashboardData {
  totalPacientes: number;
  pacientesAtivos: number;
  consultasHoje: number;
  planosAtivos: number;
  pacientesRecentes: Paciente[];
}

const Dashboard: React.FC = () => {
  const [totalPacientes, setTotalPacientes] = useState(0);
  const [pacientesAtivos, setPacientesAtivos] = useState(0);
  const [consultasHoje, setConsultasHoje] = useState(0);
  const [planosAtivos, setPlanosAtivos] = useState(0);
  const [pacientesRecentes, setPacientesRecentes] = useState<Paciente[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get<DashboardData>('http://localhost:5000/api/dashboard-nutricionista');
        setTotalPacientes(res.data.totalPacientes || 0);
        setPacientesAtivos(res.data.pacientesAtivos || 0);
        setConsultasHoje(res.data.consultasHoje || 0);
        setPlanosAtivos(res.data.planosAtivos || 0);
        setPacientesRecentes(res.data.pacientesRecentes || []);
      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <h1>Dashboard do Nutricionista</h1>

        <section className="stats">
          <div className="card">
            <h4>Total de Pacientes</h4>
            <p>{totalPacientes}</p>
          </div>
          <div className="card">
            <h4>Pacientes ativos</h4>
            <p>{pacientesAtivos}</p>
          </div>
          <div className="card">
            <h4>Consultas hoje</h4>
            <p>{consultasHoje}</p>
          </div>
          <div className="card">
            <h4>Planos ativos</h4>
            <p>{planosAtivos}</p>
          </div>
        </section>

        <section className="panels">
          <div className="panel">
            <h3>Próximas Consultas</h3>
            <ul>
              <li><span>Sem consultas cadastradas</span></li>
            </ul>
          </div>

          <div className="panel">
            <h3>Pacientes Recentes</h3>
            <ul>
              {pacientesRecentes.map((paciente, index) => (
                <li key={index}>
                  <span><span className="material-symbols-outlined">account_circle</span> {paciente.usuario.nome}</span><br />
                  <small>{paciente.objetivo}</small>
                </li>
              ))}
              {pacientesRecentes.length === 0 && <li>Nenhum paciente encontrado</li>}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
