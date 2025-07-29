import React from 'react';
import '../styles/Sidebar_Nutritionist.css';
import Dashboard from '../pages/Home_Nutritionist';
import { Link } from 'react-router-dom';



const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="top-section">
        <h2 className="logo">WiseBites</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">
                <span className="material-symbols-outlined">home</span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/">
                <span className="material-symbols-outlined">group</span>
                Pacientes
              </Link>
            </li>
            <li>
              <Link to="/">
                <span className="material-symbols-outlined">restaurant</span>
                Planos Alimentares
              </Link>
            </li>
            <li>
              <Link to="/plan_registration">
                <span className="material-symbols-outlined">note_add</span>
                Cadastrar Plano
              </Link>
            </li>
          </ul>
        </nav>

      </div>
      <div className="logout">
        <span className="material-symbols-outlined">logout</span>
        Sair
      </div>
    </aside>
  );
};

export default Sidebar;
