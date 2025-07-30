import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="circle" />
        <span>WiseBites</span>
      </div>
      <div className="nav-links">
        <ScrollLink to="hero" smooth={true} duration={500}>
          <button>Início</button>
        </ScrollLink>
        <ScrollLink to="caracteristicas" smooth={true} duration={500} offset={-50}>
          <button>Características</button>
        </ScrollLink>
        <ScrollLink to="sobre" smooth={true} duration={500} offset={-50}>
          <button>Sobre</button>
        </ScrollLink>
        <ScrollLink to="contato" smooth={true} duration={500} offset={-50}>
          <button>Contato</button>
        </ScrollLink>
        <Link to="/login">
          <button>Entrar</button>
        </Link>
        <Link to="/registrar">
          <button className="register">Registrar</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
