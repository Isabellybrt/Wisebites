import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="circle" />
        <span>WiseBites</span>
      </div>
      <div className="nav-links">
        <Link to="/"><button>Início</button></Link>
        <button>Características</button>
        <button>Sobre</button>
        <button>Contato</button>
        <button>Entrar</button>
        <Link to="/registrar">
          <button className="register">Registrar</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
