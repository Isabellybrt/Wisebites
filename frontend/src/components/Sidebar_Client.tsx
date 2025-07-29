import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar_Client.css';

const Sidebar_Client: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="top-section">
        <h2 className="logo">WiseBites</h2>
        <nav>
          <ul>
            <li>
              <Link to="/home" className="sidebar-link">
                <span className="material-symbols-outlined">home</span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/nutritional_plan_client" className="sidebar-link">
                <span className="material-symbols-outlined">restaurant</span>
                Plano Alimentar
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

export default Sidebar_Client;
