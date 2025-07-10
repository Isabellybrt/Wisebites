import React from 'react';
import '../styles/Sidebar_Nutritionist.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
  <div className="top-section">
    <h2 className="logo">WiseBites</h2>
    <nav>
      <ul>
        <li>
              <span className="material-symbols-outlined">home</span>
              Dashboard
            </li>
            <li>
              <span className="material-symbols-outlined">group</span>
              Pacientes
            </li>
            <li>
              <span className="material-symbols-outlined">restaurant</span>
              Planos Alimentares
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
