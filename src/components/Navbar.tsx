import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="circle" />
        <span>WiseBites</span>
      </div>
      <div className="nav-links">
        <button>Início</button>
        <button>Características</button>
        <button>Sobre</button>
        <button>Contato</button>
        <button>Entrar</button>
        <button className="register">Registrar</button>
      </div>
    </nav>
  );
};

export default Navbar;
